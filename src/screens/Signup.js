import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  PermissionsAndroid
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, ListItem, Body, CheckBox, Row} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader } from "../components";
import API from '../components/Api'
import { strings } from '@i18n';

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            isCheckedAgreement: false,
            email: '',
            password: '',
            confirmPassword: '',
            location: null,
        }
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Location Service Permission',
                    'message': 'The location service required to sign up.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                console.log(location)
                this.setState({ location });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
         )
    }

    onAgreement() {
        const {navigate} = this.props.navigation
        navigate('Agreement', {callback: (agree) => {
            this.setState({isCheckedAgreement: agree})
        }})
    }
    
    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    async onSignup() {
        if(!this.state.isCheckedAgreement){
            alert('Please accept the agreement')
            return
        }
        if(this.state.email == ''){
            alert('Please enter email')
            return
        }
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

        this.setState({loaderVisible: true})
        let res = await API.signup(this.state.email, this.state.password, 'NoProvided', this.state.location.coords.latitude, this.state.location.coords.longitude, 1)
        this.setState({loaderVisible: false})
        console.log(res)
        setTimeout(() => {
            if(res == 'True') {
                alert('Successfully signed up')
            }else{
                alert('Failed to signed up')            
            }                
        }, 500);
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText mediumLarge bold center>{strings('Sign up')}</MyText>
                <Form style={styles.form}>
                    <Item floatingLabel last>
                        <Label>{strings('Email')}</Label>
                        <Input autoCapitalize='none' autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>{strings('Password')}</Label>
                        <Input secureTextEntry={true} value={this.state.password} onChangeText={text=>this.setState({password: text})}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>{strings('Confirm Password')}</Label>
                        <Input secureTextEntry={true} value={this.state.confirmPassword} onChangeText={text=>this.setState({confirmPassword: text})}/>
                    </Item>
                </Form>
                <ListItem>
                    <CheckBox checked={this.state.isCheckedAgreement} onPress={()=>this.setState({isCheckedAgreement: !this.state.isCheckedAgreement})}/>
                    <Body style={styles.checkboxBody}>
                        <Text style={{marginRight: 0}}>{strings('I accept the')}</Text>
                        <Button transparent color={Colors.Navy} onPress={this.onAgreement.bind(this)}><Text>{strings('Agreement')}</Text></Button>
                    </Body>
                </ListItem>
                <Button block primary onPress={this.onSignup.bind(this)}><Text>{strings('Sign up')}</Text></Button>
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
        marginTop: 24,
    },

    checkboxBody: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
