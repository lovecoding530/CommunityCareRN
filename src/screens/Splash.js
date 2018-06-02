import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AppData from '../components/AppData'

export default class Splash extends Component {
  
    async componentDidMount() {
        const {navigate} = this.props.navigation
        var user = await AppData.getItem('login_user')
        setTimeout(() => {
            if(user == null)
                navigate('LoginStack')
            else{
                if (user.clientID != null){
                    navigate('DrawerStack')
                }else{
                    navigate('StaffDrawerStack')                    
                }
            }
        }, 2000);
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <Image source={Images.logo_title} style={styles.logo_title}/>
                </Content>
            </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    logo: {
        width: responsiveWidth(50),
        height: responsiveWidth(50),
        resizeMode: 'contain',
    },
    logo_title: {
        width: responsiveWidth(80),
        height: responsiveWidth(14),
        resizeMode: 'contain',
    },
});
  