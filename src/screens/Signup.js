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
export default class Signup extends Component {
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
            <MyText mediumLarge bold center>Sign Up </MyText>
            <Form style={styles.form}>
                <Item floatingLabel last>
                    <Label>Username</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Label>Confirm Password</Label>
                    <Input />
                </Item>
            </Form>
            <ListItem>
                <CheckBox checked={this.state.isCheckedAgreement} onPress={()=>this.setState({isCheckedAgreement: !this.state.isCheckedAgreement})}/>
                <Body style={styles.checkboxBody}>
                    <Text style={{marginRight: 0}}>I accept the </Text>
                    <Button transparent color={Colors.Navy} onPress={this.onAgreement.bind(this)}><Text>Agreement</Text></Button>
                </Body>
            </ListItem>
            <Button block primary><Text>Sign Up</Text></Button>
            <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to log in</Text></Button>
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
        marginTop: 24,
    },

    checkboxBody: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
  