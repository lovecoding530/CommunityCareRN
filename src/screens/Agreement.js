import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer, Textarea} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText } from "../components";
export default class Agreement extends Component {
    
    componentDidMount() {
    }

    onAccept() {
        const {goBack, state: {params}} = this.props.navigation
        params.callback(true)
        goBack()
    }

    goBack() {
        const {goBack, state: {params}} = this.props.navigation
        params.callback(false)
        goBack()
    }

    render() {
        return (
        <Container>
            <Content contentContainerStyle={styles.container}>
                <MyText mediumLarge bold center>Agreement</MyText>
                <Form style={styles.form}>
                    <Textarea editable={false} bordered placeholder="Textarea" value={
                            `This is a sample only, and contains terms and conditions of use that are the most common requirements\nfor this type of agreement. It is recommended that each School District review the User Agreement template with their legal counsel so that it may be adjusted and tailored to reflect the particular needs and unique qualities of the District’s own rental facilities and grounds. This sample agreement is designed to cover casual rentals where the risk to the school district (the “District”) and individuals renting and attending (the “User”) is minimal. It is not intended for use when exclusive access (ex: daycare in school) arrangements are being made, or where the purpose of the rental is for an activity that carries a higher degree of risk. If you are unsure whether or not the User agreement is appropriate for your particular circumstances, contact your Schools Protection Program risk consultant . Most users of school facilities can be classified as one of the following types: Commercial Users - Individuals, partnerships, corporations, or other businesses set up for commercial or profit purposes, using the facilities with the intention of making a profit (e.g. promoter presenting concert in School District theatre). Non-Profit Users - Individuals, organizations, associations, cultural or religious groups, educational, youth or service groups, or sports organizations set up for non-profit activities using the facilities for fund-raising events (e.g. Big Brothers and Big Sisters holding a fund-raising auction). Community Users - Individuals, organizations, associations, societies, or other groups resident in the community using the facilities for any casual and/or informal community activities (e.g. community soccer tournament)? When the User is a commercial or non-profit user the representative must be authorized to enter into the rental agreement on behalf of the entity as by signing the agreement the entity is tbeing legally bound to the terms and conditions. When the User is a community user, the individual renting the facility will be personally responsible for the rental? Insurance requirements may be waived for community users? The areas that the User is being authorized to use and the activities that they are authorized to undertake must be clearly described in the Agreement. Be sure to include any common areas\nthat the User will have access to, such as lobbies, washrooms, etc. ? Make sure that the User understand the terms of the rental agreement and has ample time to\nreview and ask any questions, before signing. ? It is recommended that each facility within the District have a written set of User Regulations (the “Regulations”) that form part of the User Agreement and are attached as a schedule to the\nUser Agreement itself.`
                        }
                    style={styles.textArea}/>
                </Form>
                <Button block primary onPress={this.onAccept.bind(this)}><Text>Accept</Text></Button>
                <Button block transparent danger onPress={this.goBack.bind(this)}><Text>{"< "}Back to sign up</Text></Button>
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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    form: {
        marginVertical: 24,
    },

    textArea: {
        textAlign: 'center',
        height: responsiveHeight(60)
    }
});
  