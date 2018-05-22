/**
 * @providesModule router
 */

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';

const { width } = Dimensions.get('window');

import {Colors, FontSizes, Images} from './theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from './components';
import Menu from "./Menu";
import Splash from "./screens/Splash";
import OnBoarding from "./screens/OnBoarding";
import Home from "./screens/Home";
import {DSIntro, ActivityList, Activity, UpNext, Complete} from "./screens/DiscussionStarter";
import {CDIntro, CDSingleView, CDListView, CDSummary} from "./screens/CardGame";
import {ResourceList, ResourceDetail} from "./screens/Resources";
import {UserGuidesList,UserGuidesDetail} from "./screens/UserGuides";
import {GetHelpList, GetHelpDetail} from "./screens/GetHelp";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

var drawerNavigator = null

const headerStyle = { 
    backgroundColor: Colors.Navy, 
    height: responsiveHeight(6), 
    paddingHorizontal: responsiveHeight(1)
}

const HeaderTitle = () => {
    return (
        <Image 
            source={Images.icon_dying_to_talk} 
            style={{width: responsiveHeight(7), height: responsiveHeight(5), tintColor: '#fff'}}
        />
    );
}

const Footer = () => {
    return (
        <View style={{
            height: responsiveHeight(7), 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: responsiveWidth(2),
            backgroundColor: Colors.Navy}}>
            <Image 
                source={Images.logo_footer} 
                resizeMode={"contain"}
                style={{width: responsiveHeight(16), height: responsiveHeight(5), tintColor: '#fff'}}
            />
            <Text light right>logo footer logo footer {"\n"} logo footer</Text>
        </View>
    );
}

const MenuIcon = ({ navigate }) => {
    return (
        <Icon.Button 
            name="bars" 
            size={FontSizes.medium}
            style={{height: responsiveHeight(4.5), paddingHorizontal: 10,}}
            backgroundColor={'#0000'} 
            onPress={() => drawerNavigator.navigate('DrawerOpen')}>
            <Text light bold>MENU</Text>
        </Icon.Button>
    );
}

const HomeIcon = ({ navigate, goBack }) => {
    return (
        <Icon.Button 
            name="home" 
            size={FontSizes.medium}
            style={{height: responsiveHeight(4.5), paddingHorizontal: 10,}}
            backgroundColor={'#0000'} 
            onPress={() => goBack()}>
            <Text light>HOME</Text>
        </Icon.Button>
    );
}

export const DiscussionStarterStack = StackNavigator({
    DSIntro: {screen: DSIntro},
    ActivityList: {screen: ActivityList},
    Activity: {screen: Activity},
    UpNext: {screen: UpNext},
    Complete: {screen: Complete},
}, {
    headerMode: 'none',
});

export const CardGameStack = StackNavigator({
    CDIntro: {screen: CDIntro},
    CDSingleView: {screen: CDSingleView},
    CDListView: {screen: CDListView},
    CDSummary: {screen: CDSummary},
}, {
    headerMode: 'none',
});

export const ResourcesStack = StackNavigator({
    ResourceList: {screen: ResourceList},
    ResourceDetail: {screen: ResourceDetail},
}, {
    headerMode: 'none',
});

export const UserGuidesStack = StackNavigator({
    UserGuidesList: {screen: UserGuidesList},
    UserGuidesDetail: {screen: UserGuidesDetail},
}, {
    headerMode: 'none',
});

export const GetHelpStack = StackNavigator({
    GetHelpList: {screen: GetHelpList},
    GetHelpDetail: {screen: GetHelpDetail},
}, {
    headerMode: 'none',
});

export const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
        }),
    },
    DiscussionStarter: {
        screen: DiscussionStarterStack,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
            headerLeft: <HomeIcon {...navigation} />,
        }),
    },
    CardGame: {
        screen: CardGameStack,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
            headerLeft: <HomeIcon {...navigation} />,
        }),
    },
    Resources: {
        screen: ResourcesStack,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
            headerLeft: <HomeIcon {...navigation} />,
        }),
    },
    UserGuides: {
        screen: UserGuidesStack,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
            headerLeft: <HomeIcon {...navigation} />,
        }),
    },
    GetHelp: {
        screen: GetHelpStack,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <HeaderTitle/>,
            headerStyle: headerStyle,
            headerRight: <MenuIcon {...navigation} />,
            headerLeft: <HomeIcon {...navigation} />,
        }),
    },
});

const HomeStackWithFooter = ({navigation, screenProps}) => {
    drawerNavigator = navigation
    return (
        <View style={{flex: 1}}>
            <HomeStack />
            <Footer/>
        </View>
    );
}

export const DrawerStack = DrawerNavigator(
    {
        homeStack: {
            screen: HomeStackWithFooter,
        }
    },
    {
        drawerWidth: width / 2.5,
        drawerPosition: 'right',
        contentComponent: props => <Menu {...props} />
    }
);

const DrawerStackWithFooter = () => {
    return (
        <View style={{flex: 1}}>
            <DrawerStack/>
            <Footer/>
        </View>
    );
}

export const PrimaryNav = StackNavigator({
    SplashScreen: { screen: Splash },
    OnBoardingScreen: { screen: OnBoarding },
    DrawerStack: { screen: DrawerStack },
    
}, {
    headerMode: 'none',
})