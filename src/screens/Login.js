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
import AppData from '../components/AppData'
import { strings } from '@i18n';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            email: '',
            password: '',
        }
    }

    componentDidMount() {
    }

    async onLogin() {
        this.setState({loaderVisible: true})
        let res = await API.login(this.state.email, this.state.password)
        this.setState({loaderVisible: false})
        console.log('login res', res)

        setTimeout(async () => {
            if(res != null) {
                await AppData.setItem('login_user', res)
                const {navigate} = this.props.navigation
                if(res.clientID != null){
                    navigate('DrawerStack')
                }else{
                    navigate('StaffDrawerStack')                    
                }
            }else{
                alert("Email or password is not correct")            
            }
        }, 500);
    }
    
    onSignup() {
        const {navigate} = this.props.navigation
        navigate('Signup')
    }

    onForgotPassword() {
        const {navigate} = this.props.navigation
        navigate('ForgotPassword')
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText mediumLarge bold center>{strings('Sign in')} </MyText>
                <Form style={styles.form}>
                    <Item floatingLabel last>
                        <Label>{strings('Email')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>{strings('Password')}</Label>
                        <Input secureTextEntry={true} value={this.state.password} onChangeText={text=>this.setState({password: text})}/>
                    </Item>
                </Form>
                <Button block primary onPress={this.onLogin.bind(this)}><Text>{strings('Sign in')}</Text></Button>
                <Button block transparent danger onPress={this.onForgotPassword.bind(this)}><Text>{strings('Forgot Password')}</Text></Button>
            </Content>
            <Footer style={styles.footer}>
                <Button block transparent danger onPress={this.onSignup.bind(this)}><MyText medium>{strings("Don't you have acount?")}</MyText><Text>{strings('Sign up')}</Text></Button>
            </Footer>
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
        marginVertical: 24,
    }, 

    footer: {
        backgroundColor: '#fff0',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
