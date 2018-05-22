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

export default class Login extends Component {
  constructor(props){
      super(props)
      this.state = {
          loaderVisible: false,
          email: '',
          password: '',
      }
  }
    
  componentDidMount() {
  }

  async onLogin() {
    let res = await API.login(this.state.email, this.state.password)
    alert(JSON.stringify(res))
  }
  
  onSignup() {
    const {navigate} = this.props.navigation
    navigate('Signup')
  }

  onForgotPassword() {
    const {navigate} = this.props.navigation
    navigate('ForgotPassword')
  }

  render() {
    return (
    <Container>
        <Loader loading={this.state.loaderVisible}/>
        <Content contentContainerStyle={styles.container}>
            <MyText mediumLarge bold center>Log in </MyText>
            <Form style={styles.form}>
                <Item floatingLabel last>
                    <Label>Username</Label>
                    <Input autoCapitalize='none' autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} value={this.state.password} onChangeText={text=>this.setState({password: text})}/>
                </Item>
            </Form>
            <Button block primary onPress={this.onLogin.bind(this)}><Text>Sign In</Text></Button>
            <Button block transparent danger onPress={this.onForgotPassword.bind(this)}><Text>Forgot Password</Text></Button>
        </Content>
        <Footer>
            <Button block transparent danger onPress={this.onSignup.bind(this)}><MyText medium>Don't you have acount?</MyText><Text>Sign up</Text></Button>        
        </Footer>
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
    }
});
  