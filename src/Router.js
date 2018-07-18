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
import StaffMenu from "./StaffMenu";

import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Agreement from "./screens/Agreement";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";

import QuickSurvey from "./screens/QuickSurvey";
import PaymentMethod from "./screens/PaymentMethod";
import TimeAndLocation from "./screens/TimeAndLocation";

import ManualLabTest from "./screens/ManualLabTest";

import SurveyHistory from "./screens/SurveyHistory";
import SurveyDetail from "./screens/SurveyDetail";

import LabTestHistory from "./screens/LabTestHistory"
import LabTestDetail from "./screens/LabTestDetail"

import StaffOrders from "./screens/StaffOrders"

import ContactUs from "./screens/ContactUs";

import Home from "./screens/Home";

const headerStyle = { 
    backgroundColor: '#fff', 
    height: 44, 
    paddingHorizontal: 8,
}

const HeaderTitle = () => {
    return (
        <Image 
            source={Images.logo} 
            style={{width: 40, height: 40, resizeMode: 'contain', flex: 1}}
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

const EmptyIcon = ({ navigate }) => {
    return (
        <View style={{width: 32, height: 32}}/>
    );
}

const BackIcon = ({ navigate, goBack }) => {
    return (
        <TouchableOpacity
            onPress={() => goBack()}
        >
            <Icon name="chevron-left" size={24} color={Colors.Navy}/>
        </TouchableOpacity>
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
    QuickSurvey: { screen: QuickSurvey, },
    ManualLabTest: { screen: ManualLabTest, },
    PaymentMethod: { screen: PaymentMethod, },
    TimeAndLocation: { screen: TimeAndLocation, },
}, {
    navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitle/>,
        headerStyle: headerStyle,
        headerLeft: <MenuIcon {...navigation} />,
        headerRight: <EmptyIcon/>
    }),
});

export const SkipSurveyStack = StackNavigator({
    ManualLabTest: { screen: ManualLabTest, },
    PaymentMethod: { screen: PaymentMethod, },
    TimeAndLocation: { screen: TimeAndLocation, },
}, {
    navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitle/>,
        headerStyle: headerStyle,
        headerLeft: <MenuIcon {...navigation} />,
        headerRight: <EmptyIcon/>
    }),
});

export const SurveyHistoryStack = StackNavigator({
    SurveyHistory: { 
        screen: SurveyHistory, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
    SurveyDetail: { 
        screen: SurveyDetail, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <BackIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const LabTestHistoryStack = StackNavigator({
    LabTestHistory: { 
        screen: LabTestHistory, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
    LabTestDetail: { 
        screen: LabTestDetail, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <BackIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
    TimeAndLocation: {
        screen: TimeAndLocation, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <BackIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const ContactUsStack = StackNavigator({
    ContactUs: { 
        screen: ContactUs, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const HomeStack = StackNavigator({
    Home: { 
        screen: Home, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const DrawerStack = DrawerNavigator(
    {
        HomeStack: {screen: HomeStack},
        QuickSurveyStack: { screen: QuickSurveyStack },
        SkipSurveyStack: { screen: SkipSurveyStack },
        SurveyHistoryStack: { screen: SurveyHistoryStack },
        ContactUsStack: { screen: ContactUsStack },
        LabTestHistoryStack: { screen: LabTestHistoryStack },
    },
    {
        drawerWidth: width * 2 / 3,
        drawerPosition: 'left',
        contentComponent: props => <Menu {...props} />
    }
);

export const StaffOrdersStack = StackNavigator({
    StaffOrders: { 
        screen: StaffOrders, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
    LabTestDetail: { 
        screen: LabTestDetail, 
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerLeft: <BackIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const StaffDrawerStack = DrawerNavigator(
    {
        StaffOrdersStack: { screen: StaffOrdersStack },
    },
    {
        drawerWidth: width * 2 / 3,
        drawerPosition: 'left',
        contentComponent: props => <StaffMenu {...props} />
    }
);

export const PrimaryNav = StackNavigator({
    SplashScreen: { screen: Splash },
    LoginStack: { screen: LoginStack }, 
    DrawerStack: { screen: DrawerStack }, 
    StaffDrawerStack: { screen: StaffDrawerStack },
}, {
    headerMode: 'none',
})