import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, ListItem, Body, CheckBox, Row} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader } from "../components";
import API from '../components/Api'
import { strings } from '@i18n';

export default class ResetPassword extends Component {
    constructor(props){
        super(props)
        const {state: {params}} = props.navigation
        this.state = {
            loaderVisible: false,
            email: params.email,
            password: '',
            confirmPassword: '',
            verificationCode: '',
        }
    }

    componentDidMount() {
    }

    async onUpdate() {
        if(this.state.password == ''){
            alert('Please enter password')
            return
        }
        if(this.state.confirmPassword == ''){
            alert('Please confirm password')
            return
        }
        if(this.state.password != this.state.confirmPassword){
            alert('Please enter password correctly')
            return            
        }
        if(this.state.verificationCode == ''){
            alert('Please enter verification code')
            return            
        }

        this.setState({loaderVisible: true})
        let res = await API.updatePassword(this.state.email, this.state.password, this.state.verificationCode)
        this.setState({loaderVisible: false})
        console.log(res)
        setTimeout(() => {
            if(res == '-1') {
                alert('User Name don’t exist')
            }else if(res == '-2') {
                alert('No verification Code exist')
            }else if(res == '-3') {
                alert('Key not match')
            }else if(res == '-4') {
                alert('Time frame Consumed')
            }else if(res == '-5') {
                alert('General error')
            }else{
                alert('Successfully updated password')            
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
                <MyText mediumLarge bold center>{strings('Reset Password')}</MyText>
                <Form style={styles.form}>
                    <Item floatingLabel last>
                        <Label>{strings('Password')}</Label>
                        <Input secureTextEntry={true} value={this.state.password} onChangeText={text=>this.setState({password: text})}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>{strings('Confirm Password')}</Label>
                        <Input secureTextEntry={true} value={this.state.confirmPassword} onChangeText={text=>this.setState({confirmPassword: text})}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>{strings('Verification Code')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} value={this.state.verificationCode} onChangeText={text=>this.setState({verificationCode: text})}/>
                    </Item>
                </Form>
                <Button block primary onPress={this.onUpdate.bind(this)}><Text>{strings('Reset Password')}</Text></Button>
                <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to forgot password</Text></Button>
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
    },

    checkboxBody: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
  