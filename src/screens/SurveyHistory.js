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

export default class SurveyHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            surveys: [],
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const surveys = await API.getAllClientSurvey()
        this.setState({surveys, loaderVisible: false})
    }

    async onDelete(enrollID, index) {
        this.setState({loaderVisible: true})
        const res = await API.deleteSurveyEnrollment(enrollID)
        console.log(res)
        this.setState({loaderVisible: false})
        setTimeout(() => {
            if(res == true){
                alert('Successfully deleted the survey history')
                var surveys = Utils.copy(this.state.surveys)
                surveys.splice(index, 1)
                this.setState({surveys})
            }else{
                alert('failed to delete the survey history')
            } 
        }, 500);
    }

    onView(enrollID){
        const {navigate} = this.props.navigation
        navigate('SurveyDetail', {enrollID})
    }

    renderItem({item, index}) {
        var dateStr = item.create_date
        var formatted = moment(dateStr).format("YYYY-MM-DD")
        return (
            <TouchableOpacity 
                style={{paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#ddd'}}
                onPress={this.onView.bind(this, item.enrollID)}>
                <MyText medium style={{flex: 1}}>{formatted}</MyText>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.onView.bind(this, item.enrollID)}>
                        <Image source={Images.view} style={{width: 24, height: 24, marginHorizontal: 4, tintColor: '#666'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onDelete.bind(this, item.enrollID, index)}>
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
                <MyText medium bold center style={{marginVertical: 16,}}>{strings('History of Your Surveys')}</MyText>
                <FlatList
                    data={this.state.surveys}
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
        flexGrow: 1,
    },

});
  