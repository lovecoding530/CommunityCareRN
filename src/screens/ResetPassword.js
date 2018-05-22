import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, ListItem, Body, CheckBox, Row} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText } from "../components";

export default class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
        isCheckedAgreement: false,
    }
  }

  componentDidMount() {
  }

  onAgreement() {
      const {navigate} = this.props.navigation
      navigate('Agreement')
  }
  
  goBack() {
    const {goBack} = this.props.navigation
    goBack()
  }

  render() {
    return (
    <Container>
        <Content contentContainerStyle={styles.container}>
            <MyText mediumLarge bold center>Reset Password</MyText>
            <Form style={styles.form}>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Label>Confirm Password</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Label>Pin Number</Label>
                    <Input />
                </Item>
            </Form>
            <Button block primary><Text>Reset Password</Text></Button>
            <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to forgot password</Text></Button>
        </Content>
    </Container>
    );
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: responsiveHeight(10)
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    form: {
        marginVertical: 24,
    },

    checkboxBody: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
  