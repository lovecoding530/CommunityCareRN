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

import QuickSurvey from "./screens/QuickSurvey";
import PaymentMethod from "./screens/PaymentMethod";
import TimeAndLocation from "./screens/TimeAndLocation";


const headerStyle = { 
    backgroundColor: '#fff', 
    height: 44, 
    paddingHorizontal: 8,
}

const HeaderTitle = () => {
    return (
        <Image 
            source={Images.logo} 
            style={{width: 40, height: 40, resizeMode: 'contain'}}
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
        <TouchableOpacity
            onPress={() => navigate('DrawerOpen')}
        >
            <Icon name="bars" size={32}/>
        </TouchableOpacity>
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
    navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitle/>,
        headerStyle: headerStyle,
        headerLeft: null,
    }),
});

export const QuickSurveyStack = StackNavigator({
    QuickSurvey: {
        screen: QuickSurvey,
    },
    PaymentMethod: {
        screen: PaymentMethod,
    },
    TimeAndLocation: {
        screen: TimeAndLocation,
    },
}, {
    navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitle/>,
        headerStyle: headerStyle,
        headerLeft: <MenuIcon {...navigation} />,
    }),
});

export const DrawerStack = DrawerNavigator(
    {
        QuickSurveyStack: { screen: QuickSurveyStack }
    },
    {
        drawerWidth: width * 3 / 5,
        drawerPosition: 'left',
        contentComponent: props => <Menu {...props} />
    }
);

export const PrimaryNav = StackNavigator({
    SplashScreen: { screen: Splash },
    LoginStack: { screen: LoginStack }, 
    DrawerStack: { screen: DrawerStack }, 
}, {
    headerMode: 'none',
})