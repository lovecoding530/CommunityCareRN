import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Text, Footer, List, ListItem, Body, CheckBox, Card, CardItem, Row, Right, Left, Radio,} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader, ManyChoices } from "../components";
import { Dropdown } from 'react-native-material-dropdown';
import Utils from "../components/utils";
import API from '../components/Api';
import moment from 'moment';
import { strings, localePre } from '@i18n';

export default class StaffOrders extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            orders: [],
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const orders = await API.getAllStaffOrders()
        console.log(orders)
        this.setState({orders, loaderVisible: false})
    }

    onView(order){
        const {navigate} = this.props.navigation
        navigate('LabTestDetail', {order})
    }
    
    renderItem({item, index}) {
        var dateStr = item.orderDate
        var formatted = moment(dateStr).format("YYYY-MM-DD")
        return (
            <TouchableOpacity 
                style={{paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#ddd'}}
                onPress={this.onView.bind(this, item)}>
                <MyText medium style={{flex: 1}}>{formatted}</MyText>
            </TouchableOpacity>
        )
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText medium bold center style={{marginVertical: 16,}}>{strings('All Orders')}</MyText>
                <FlatList
                    data={this.state.orders}
                    renderItem = {this.renderItem.bind(this)}
                    keyExtractor = {(item, index) => index.toString()}
                />
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundPrimary,
        flex: 1,
    },
});
  