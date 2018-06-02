import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image, Alert} from 'react-native';
import {Colors, Images} from './theme';
import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, List, ListItem} from 'native-base';
import { strings } from '@i18n';
import { NavigationActions } from 'react-navigation';
import AppData from './components/AppData';

export default class Menu extends Component {
    goto(key){
        console.log("goto ", key)
        this.props.navigation.navigate(key)
    }
    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.logo}>
                        <Image 
                            source={Images.logo} 
                            style={{width: 120, height: 120, resizeMode: 'contain'}}
                        />
                    </View>
                    <List>
                        <ListItem onPress={()=>{this.goto('StaffOrders')}}>
                            <Text>{strings("All Orders")}</Text>
                        </ListItem>
                        <ListItem onPress={()=>{
                            Alert.alert(
                                strings('Are you sure?'),
                                strings('Are you sure to log out?'),
                                [
                                    {text: strings('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: strings('Yes'), onPress: async () => {
                                        const resetAction = NavigationActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'LoginStack' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                        AppData.setItem('login_user', null)                                                    
                                    }},
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text>{strings("Log out")}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },

    logoText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})