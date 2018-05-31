import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  Alert,
  FlatList,
  TouchableOpacity
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
        const {order} = this.props.navigation.state.params
        this.state = {
            loaderVisible: false,
            orderID: order.orderID,
            date: moment(order.orderDate).format("YYYY-MM-DD HH:mm"),
            coordinate: {
                latitude: order.latitude,
                longitude: order.longitude,
            },
            region: {
                latitude: order.latitude,
                longitude: order.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            paymentMethod: order.paymentType,
            orderItems: order.orderItems,
        }
    }
    
    componentDidMount() {
    }

    renderLabTestItem({item, index}) {
        var bloodTest = item.Blood_Test
        return (
            <Card>
                <CardItem>
                    <Body style={styles.cardItem}>
                        <MyText medium style={{flex: 1}}>{bloodTest[`${localePre}name`]}</MyText>
                        <View style={styles.priceView}>
                            <Image source={Images.dollar} style={styles.dollarIcon}/>
                            <MyText light style={styles.priceText}>{bloodTest.Price}</MyText>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        )
    }
    
    renderListFooter() {
        var totalPrice = 0
        for (const orderItem of this.state.orderItems) {
            var bloodTest = orderItem.Blood_Test
            totalPrice += bloodTest.Price
        }
        if (this.state.orderItems.length > 0){
            return (
                <View style={{flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16, alignItems: 'center'}}>
                    <MyText right medium style={{flex: 1, marginHorizontal: 8,}}>{strings('Total:')} </MyText>
                    <View style={styles.priceView}>
                        <Image source={Images.dollar} style={styles.dollarIcon}/>
                        <MyText light style={styles.priceText}>{totalPrice}</MyText>
                    </View>
                </View>
            )
        }else{
            return (            
                <View></View>
            )
        }
    }

    render() {
        let paymentMethods = ['Cash', 'Visa', 'Paypal']
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <View style={styles.orderView}>
                    <MyText style={{marginBottom: 8}}>{strings('Order ID')}: {this.state.orderID}</MyText>
                    <MyText>{strings('Order Time')}: {this.state.date}</MyText>
                </View>
                <View style={styles.mapWrapper}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.region}
                        region={this.state.region}
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
                <MyText medium style={{marginVertical: 16,}}>{strings('Payment Method')}: {paymentMethods[this.state.paymentMethod]}</MyText>
                <FlatList
                    data={this.state.orderItems}
                    renderItem = {this.renderLabTestItem.bind(this)}
                    keyExtractor = {(item, index) => index.toString()}
                    ListFooterComponent = {this.renderListFooter.bind(this)}
                />
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: Colors.backgroundPrimary,
    },

    orderView: {
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
        padding: 8,
        marginVertical: 8 
    },
    
    mapView: {
        flex: 1,
    },
    
    mapWrapper: {
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        elevation: 3,
        padding: 2, 
    },

    cardItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    priceView: {
        flexDirection: 'row',
        backgroundColor: Colors.Green,
        borderRadius: 4,
        padding: 4,
        alignItems: 'center',
    },

    dollarIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff'
    },

    priceText: {
        fontSize: 16,
    }
});
  