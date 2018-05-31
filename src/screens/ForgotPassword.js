import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader } from "../components";
import API from '../components/Api'
import { strings } from '@i18n';

export default class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            email: '',
        }
    }

    componentDidMount() {
    }

    async onResetPassword() {
        if(this.state.email == ''){
            alert('Please enter email')
            return
        }

        this.setState({loaderVisible: true})
        let res = await API.sendVerification(this.state.email)
        this.setState({loaderVisible: false})
        setTimeout(() => {
            if(res == 'True') {
                alert('We just sent a verification code')
                const {navigate} = this.props.navigation
                navigate('ResetPassword', {email: this.state.email})
            }else{
                alert('Failed to signed up')            
            }                
        }, 500);
    }

    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText mediumLarge bold center>{strings('Forgot Password')}</MyText>
                <Form style={styles.form}>
                    <Item floatingLabel last>
                        <Label>{strings('Email')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                    </Item>
                </Form>
                <Button block primary onPress={this.onResetPassword.bind(this)}><Text>{strings('Reset Password')}</Text></Button>
                <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to log in</Text></Button>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginVertical: 24,
    }
});
  