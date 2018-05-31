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
import { MyText, Loader } from "../components";
import { strings, localePre } from '@i18n';
import Api from '../components/Api';

export default class Agreement extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            agreement: {},
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const agreement = await Api.getAgreement()
        console.log(agreement)
        this.setState({agreement, loaderVisible: false})
    }

    onAccept() {
        const {goBack, state: {params}} = this.props.navigation
        params.callback(true)
        goBack()
    }

    goBack() {
        const {goBack, state: {params}} = this.props.navigation
        params.callback(false)
        goBack()
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText mediumLarge bold center>{strings('Agreement')}</MyText>
                <Text style={styles.agreementText}>
                    {this.state.agreement[`${localePre}agreement`]}
                </Text>
                <Button block primary onPress={this.onAccept.bind(this)}><Text>{strings('Accept')}</Text></Button>
                <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to sign up</Text></Button>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 24,
      paddingTop: responsiveHeight(5),
      backgroundColor: Colors.backgroundPrimary,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    form: {
        flexGrow: 1,
        marginVertical: 24,
    },

    agreementText: {
        textAlign: 'center',
        marginVertical: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.Navy,
        borderRadius: 2,
    }
});
  