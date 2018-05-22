/**
 * @providesModule router
 */

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

const { width } = Dimensions.get('window');

import {Colors, Images} from './theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from "./Menu";

import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Agreement from "./screens/Agreement";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";

const headerStyle = { 
    backgroundColor: Colors.Navy, 
    height: 64, 
    paddingHorizontal: 8,
}

const HeaderTitle = () => {
    return (
        <Image 
            source={Images.logo} 
            style={{width: 40, height: 40}}
        />
    );
}

const Footer = () => {
    return (
        <View style={{
            height: 44, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: Colors.Navy}}>
            <Text light right>logo footer logo footer {"\n"} logo footer</Text>
        </View>
    );
}

const MenuIcon = ({ navigate }) => {
    return (
        <View/>
    );
}

const HomeIcon = ({ navigate, goBack }) => {
    return (
        <View/>
    );
}

export const LoginStack = StackNavigator({
    Login: {screen: Login},
    Signup: {screen: Signup},
    Agreement: {screen: Agreement},
    ForgotPassword: {screen: ForgotPassword},
    ResetPassword: {screen: ResetPassword},
}, {
    headerMode: 'none',
});

export const PrimaryNav = StackNavigator({
    SplashScreen: { screen: Splash },
    LoginStack: { screen: LoginStack },    
}, {
    headerMode: 'none',
})