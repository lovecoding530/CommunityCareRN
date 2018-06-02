import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  Alert
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, Textarea, Row, Card, CardItem, Body} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader } from "../components";
import DatePicker from 'react-native-datepicker'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Utils from '../components/utils'
import Api from '../components/Api';
import moment from 'moment'
import { strings, localePre } from '@i18n';

export default class TimeAndLocation extends Component {
    constructor(props){
        super(props)
        const {state: {params}} = this.props.navigation
        const editingOrder = params.order
        if(editingOrder == null){
            this.state = {
                editingOrder,
                loaderVisible: false,
                date: moment().format("YYYY-MM-DD"),
                time: moment().format("HH:mm"),
                coordinate: null,
                region: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            }    
        }else{
            this.state = {
                editingOrder,
                loaderVisible: false,
                date: moment(editingOrder.orderDate).format("YYYY-MM-DD"),
                time: moment(editingOrder.orderDate).format("HH:mm"),
                coordinate: {
                    latitude: editingOrder.latitude,
                    longitude: editingOrder.longitude
                },
                region: {
                    latitude: editingOrder.latitude,
                    longitude: editingOrder.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            }
        }
    }
    
    componentDidMount() {
        if(this.state.editingOrder == null){
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    console.log(location)
    
                    var coordinate = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }
    
                    var region = Utils.copy(this.state.region)
    
                    region.latitude = coordinate.latitude
                    region.longitude = coordinate.longitude
                    this.setState({
                        coordinate: coordinate,
                        region: region,
                    })
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        }
    }

    async onConfirm() {
        if(this.state.editingOrder == null){
            const {navigate, state: {params}} = this.props.navigation
            this.setState({loaderVisible: true})
            var res 
            if(params.recommendTest != null){
                res = await Api.createOrderBySurveyRecomendation(
                    this.state.date, this.state.time, 
                    this.state.coordinate, 
                    params.paymentMethod, 
                    params.recommendTest)
            }else{
                res = await Api.createOrderByItems(
                    this.state.date, this.state.time, 
                    this.state.coordinate, 
                    params.paymentMethod, 
                    params.labTestIDs)
            }
            console.log('createOrderByItems', res)
            this.setState({loaderVisible: false})
            
            setTimeout(() => {
                if(res == true){
                    Alert.alert(
                        strings('Thank you for your select Community Health Care'),
                        strings('You will receive the order confirmation on your email'),
                        [
                            {text: strings('OK')},
                        ],
                        { cancelable: false }
                    )    
                }else{
                    alert('Failed to order')
                }
            }, 500);
        }else{
            const {goBack, state: {params}} = this.props.navigation
            this.setState({loaderVisible: true})
            let res = await Api.updateOrder(this.state.editingOrder.orderID, this.state.date, this.state.time, this.state.coordinate)
            console.log('updateOrder', res)
            this.setState({loaderVisible: false})

            setTimeout(() => {
                if(res == true){
                    alert('Successfully updated the order') 
                    params.callback(true)
                }else{
                    alert('Failed to delete the order')     
                    params.callback(false)
                }
            }, 500);
        }
    }

    goBack() {
        const {goBack, state: {params}} = this.props.navigation
        goBack()
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <View style={{flexDirection: 'row', marginVertical: 8,}}>
                    <DatePicker
                        style={{flex: 1, marginEnd: 4}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={Images.calendar}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                width: 24,
                                height: 24,
                            },
                            dateInput: {
                                alignItems: 'flex-start',
                                padding: 8,
                            },
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <DatePicker
                        style={{flex: 1, marginStart: 4}}
                        date={this.state.time}
                        mode="time"
                        placeholder="select date"
                        format="HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={Images.clock}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                width: 24,
                                height: 24,
                            },
                            dateInput: {
                                alignItems: 'flex-start',
                                padding: 8,
                            },
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(time) => {this.setState({time: time})}}
                    />

                </View>
                <View style={styles.mapWrapper}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.region}
                        region={this.state.region}
                        onPress={(e) => {
                            var coordinate = e.nativeEvent.coordinate

                            var region = Utils.copy(this.state.region)
                            region.latitude = coordinate.latitude
                            region.longitude = coordinate.longitude
                            this.setState({
                                coordinate: coordinate,
                                region: region,
                            })

                        }}
                        style={styles.mapView}
                    >
                        {this.state.coordinate != null &&
                            <Marker
                                coordinate={this.state.coordinate}
                                title={"Selected Location"}
                                description={"Selected Location"}
                            />
                        }
                    </MapView>
                </View>
                <View style={styles.buttonBar}>
                    <Button bordered danger onPress={this.goBack.bind(this)}><Text>{strings('Cancel')}</Text></Button>
                    <Button primary onPress={this.onConfirm.bind(this)}><Text>{strings('Confirm')}</Text></Button>
                </View>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: Colors.backgroundPrimary,
    },

    buttonBar: {
        flexDirection: 'row',
        paddingVertical: 8,
        marginVertical: 8,
        justifyContent: 'space-between'
    },

    mapView: {
        flex: 1,
    },
    
    mapWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        elevation: 3,
        padding: 2, 
    }
});
  