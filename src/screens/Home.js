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
    state = {
    }

    componentDidMount() {
    }

    goto(key){
        console.log("goto ", key)
        this.props.navigation.navigate(key)
    }

    render() {
        return (
        <Container>
            <Content contentContainerStyle={styles.container}>
                <Button block bordered dark style={styles.button} onPress={()=>{this.goto('QuickSurveyStack')}}>
                    <Text>{strings('Quick Survey')}</Text>
                </Button>
                <Button block bordered dark style={styles.button} onPress={()=>{this.goto('SkipSurveyStack')}}>
                    <Text>{strings('Manual Lab Test')}</Text>
                </Button>
                <Button block bordered dark style={styles.button} onPress={()=>{this.goto('SurveyHistoryStack')}}>
                    <Text>{strings('History of Your Surveys')}</Text>
                </Button>
                <Button block bordered dark style={styles.button} onPress={()=>{this.goto('LabTestHistoryStack')}}>
                    <Text>{strings('History of Your Lab Tests')}</Text>
                </Button>
                <Button block bordered dark style={styles.button} onPress={()=>{this.goto('ContactUsStack')}}>
                    <Text>{strings('Contact Us')}</Text>
                </Button>
            </Content>
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

    button: {
        marginVertical: 8,
    }
});
