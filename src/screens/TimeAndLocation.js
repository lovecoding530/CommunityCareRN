import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, Textarea, Row} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText } from "../components";
import DatePicker from 'react-native-datepicker'
import MapView from 'react-native-maps';

export default class TimeAndLocation extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            time: new Date(),
        }
    }
    
    componentDidMount() {
    }

    onAccept() {
        const {goBack, state: {params}} = this.props.navigation
    }

    goBack() {
        const {goBack, state: {params}} = this.props.navigation
        goBack()
    }

    render() {
        return (
        <Container>
            <Content contentContainerStyle={styles.container}>
                <View style={{flexDirection: 'row', marginVertical: 8,}}>
                    <DatePicker
                        style={{flex: 1, marginEnd: 4}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY - MM - DD"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
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
                        format="HH : mm"
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
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{flex: 1}}
                />
                <Button block primary onPress={this.onAccept.bind(this)}><Text>Confirm and Schedual Pick up</Text></Button>
                <Button block transparent danger onPress={this.goBack.bind(this)}><Text>Cancel</Text></Button>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    form: {
        marginVertical: 24,
    },

    textArea: {
        textAlign: 'center',
        height: responsiveHeight(60)
    }
});
  