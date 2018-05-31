import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, Textarea} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText } from "../components";
import { Dropdown } from 'react-native-material-dropdown';
import { strings, localePre } from '@i18n';

export default class PaymentMethod extends Component {
    constructor(props){
        super(props)
        this.state = {
            paymentMethod: -1,
        }
    }
    
    componentDidMount() {
    }

    onConfirm() {
        if(this.state.paymentMethod == -1) {
            alert(strings('Please select a payment method'))
            return
        }
        const {navigate, state: {params}} = this.props.navigation
        navigate('TimeAndLocation', {
            recommendTest: params.recommendTest, 
            labTestIDs: params.labTestIDs, 
            paymentMethod: this.state.paymentMethod
        })
    }

    onCancel() {
        const {goBack, state: {params}} = this.props.navigation
        goBack()
    }

    render() {
        let data = [
            { value: 'Cash', }, 
            { value: 'Visa', }, 
            { value: 'Paypal', }
        ];
        return (
        <Container>
            <Content contentContainerStyle={styles.container}>
                <Dropdown label={strings('Payment Method')} data={data} dropdownPosition={0} onChangeText={(value, index, data)=>{this.setState({paymentMethod: index})}}/>
                <Button block primary onPress={this.onConfirm.bind(this)}><Text>{strings('Confirm and schedual pick up')}</Text></Button>
                <Button block transparent danger onPress={this.onCancel.bind(this)}><Text>{strings('Cancel')}</Text></Button>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: Colors.backgroundPrimary,
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
  