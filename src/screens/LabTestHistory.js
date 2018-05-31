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

export default class LabTestHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            orders: [],
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const orders = await API.getAllUserOrders()
        console.log(orders)
        this.setState({orders, loaderVisible: false})
    }

    async onDelete(orderID, index) {
        Alert.alert(
            'Are you sure?',
            'Are you sure to delete the order?',
            [
                {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'YES', onPress: async () => {
                    this.setState({loaderVisible: true})
                    const res = await API.deleteOrder(orderID)
                    console.log(res)
                    this.setState({loaderVisible: false})
                    setTimeout(() => {
                        if(res == true){
                            alert('Successfully deleted your order')
                            var orders = Utils.copy(this.state.orders)
                            orders.splice(index, 1)
                            this.setState({orders})
                        }else{
                            alert('failed to delete the order')
                        } 
                    }, 500);
                }},
            ],
            { cancelable: false }
        )
    }

    onView(order){
        const {navigate} = this.props.navigation
        navigate('LabTestDetail', {order})
    }
    
    onEdit(order){
        const {navigate} = this.props.navigation
        navigate('TimeAndLocation', {order, callback: async (updated)=>{
            if(updated){
                const orders = await API.getAllUserOrders()
                this.setState({orders})
            }
        }})
    }

    renderItem({item, index}) {
        var dateStr = item.orderDate
        var formatted = moment(dateStr).format("YYYY-MM-DD")
        return (
            <TouchableOpacity 
                style={{paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#ddd'}}
                onPress={this.onView.bind(this, item)}>
                <MyText medium style={{flex: 1}}>{formatted}</MyText>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.onEdit.bind(this, item)}>
                        <Image source={Images.edit} style={{width: 24, height: 24, marginHorizontal: 4, tintColor: '#666'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onDelete.bind(this, item.orderID, index)}>
                        <Image source={Images.delete} style={{width: 24, height: 24, marginHorizontal: 4, tintColor: '#666'}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText medium bold center style={{marginVertical: 16,}}>{strings('History of Your Lab Tests')}</MyText>
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
  