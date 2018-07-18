import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  Alert
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer,Textarea} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader } from "../components";
import API from '../components/Api'
import AppData from '../components/AppData'
import { strings } from '@i18n';

export default class ContactUs extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            contactInfo: {},
            message: '',
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const contactInfo = await API.getContactInfo()
        console.log(contactInfo)
        this.setState({contactInfo, loaderVisible: false})
    }

    async onMessage(){
        if(this.state.message == ''){
            alert('Please enter message.')
            return
        }
        this.setState({loaderVisible: true})
        const res = await API.sendContactMessage(this.state.message)
        console.log(res)
        this.setState({loaderVisible: false})

        if(res == true){
            setTimeout(() => {
                Alert.alert(
                    strings('Contact Us'),
                    'Successfully sent the message',
                    [
                        {text: strings('OK'), onPress: () => {
                            const {navigate} = this.props.navigation
                            navigate('HomeStack')
                        }},
                    ],
                    { cancelable: false }
                )   
            }, 500);    
        }
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <View style={styles.infoItem}>
                    <Image source={Images.website} style={styles.infoIcon}/>
                    <MyText style={styles.infoText}>{this.state.contactInfo.WebSite}</MyText>
                </View>
                <View style={styles.infoItem}>
                    <Image source={Images.email} style={styles.infoIcon}/>
                    <MyText style={styles.infoText}>{this.state.contactInfo.Email}</MyText>
                </View>
                <View style={styles.infoItem}>
                    <Image source={Images.phone} style={styles.infoIcon}/>
                    <MyText style={styles.infoText}>{this.state.contactInfo.MobileNo}</MyText>
                </View>
                <View style={styles.infoItem}>
                    <Image source={Images.address} style={styles.infoIcon}/>
                    <MyText style={styles.infoText}>{this.state.contactInfo.Address}</MyText>
                </View>
                <View style={styles.infoItem}>
                    <Image source={Images.message} style={[styles.infoIcon, {alignSelf: 'flex-start'}]}/>
                    <Form style={styles.form}>
                        <Textarea rowSpan={5} bordered placeholder="" onChangeText={message => this.setState({message})}/>
                        <Button block primary style={{marginVertical: 8}} onPress={this.onMessage.bind(this)}><Text>{strings('Send')}</Text></Button>
                    </Form>
                </View>
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

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },

    infoIcon: {
        width: 22,
        height: 22,
        margin: 8,
    },

    infoText: {
        fontSize: 20,
    },

    form: {
        flex: 1,
    }, 
});
