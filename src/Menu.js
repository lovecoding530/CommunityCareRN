import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image} from 'react-native';
import {Colors, Images} from './theme';
import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, List, ListItem} from 'native-base';

export default class Menu extends Component {
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
                        <ListItem onPress={()=>{console.log("quick survey")}}>
                            <Text>Quick Survey</Text>
                        </ListItem>
                        <ListItem onPress={()=>{console.log("skip survey")}}>
                            <Text>Skip Survey</Text>
                        </ListItem>
                        <ListItem onPress={()=>{console.log("History of Your Surveys")}}>
                            <Text>History of Your Surveys</Text>
                        </ListItem>
                        <ListItem onPress={()=>{console.log("History of Your Lab Tests")}}>
                            <Text>History of Your Lab Tests</Text>
                        </ListItem>
                        <ListItem onPress={()=>{console.log("Contact Us")}}>
                            <Text>Contact Us</Text>
                        </ListItem>
                        <ListItem onPress={()=>{console.log("Log out")}}>
                            <Text>Log out</Text>
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