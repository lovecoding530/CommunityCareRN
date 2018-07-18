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
import API from '../components/Api'
import { strings, localePre } from '@i18n';

export default class ManualLabTest extends Component {
    constructor(props){
        super(props)
        const {state: {params}} = this.props.navigation
        this.state = {
            recommendTest: params ? params.recommendTest : null,        
            loaderVisible: false,
            bloodTests: [],
            dropdownValues: [],
            selectedLabTestIndex: -1,
            selectedLabTests: [],
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const bloodTests = await API.getBloodTests()
        var dropdownValues = bloodTests.map((test) => {
            var item = {value:test[`${localePre}name`]}
            return item
        })
        let selectedLabTests = []
        if(this.state.recommendTest){
            let labTestIDStr = await API.getTestItemsByRecomendation(this.state.recommendTest)
            let labTestIDs = labTestIDStr.split(',')
            for (const testId of labTestIDs) {
                let testIndex = bloodTests.findIndex((test)=>test.btID == testId)
                if(testIndex >= 0) selectedLabTests.push(testIndex)
            }
        }
        this.setState({bloodTests, dropdownValues, selectedLabTests, loaderVisible: false})
    }

    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    onSurvey() {
        const {navigate, goBack} = this.props.navigation
        if(this.state.recommendTest){
            goBack()
        }else{
            navigate('QuickSurveyStack')
        }
    }

    onProceed(){
        const {navigate} = this.props.navigation
        var selectedLabTestIDs = this.state.selectedLabTests.map(testIndex => this.state.bloodTests[testIndex].btID)
        navigate('PaymentMethod', {labTestIDs: selectedLabTestIDs})
    }

    onAdd() {
        if (this.state.selectedLabTestIndex == -1) {
            alert(strings('Select a Lab Test'))
            return
        }
        if (this.state.selectedLabTests.includes(this.state.selectedLabTestIndex)){
            alert(strings('Aleady added'))
            return
        }
        var selectedLabTests = Utils.copy(this.state.selectedLabTests)
        selectedLabTests.push(this.state.selectedLabTestIndex)
        this.setState({
            selectedLabTests,
        })
    }

    onDelete(index) {
        var selectedLabTests = Utils.copy(this.state.selectedLabTests)
        selectedLabTests.splice(index, 1)
        this.setState({selectedLabTests})
    }

    renderLabTestItem({item, index}) {
        var bloodTest = this.state.bloodTests[item]
        return (
            <Card>
                <CardItem>
                    <Body style={styles.cardItem}>
                        <MyText medium style={{flex: 1}}>{bloodTest[`${localePre}name`]}</MyText>
                        <View style={styles.priceView}>
                            <Image source={Images.dollar} style={styles.dollarIcon}/>
                            <MyText light style={styles.priceText}>{bloodTest.Price}</MyText>
                        </View>
                        <TouchableOpacity onPress={this.onDelete.bind(this, index)}>
                            <Image source={Images.delete} style={{width: 24, height: 24, tintColor: '#ff0000'}}/>
                        </TouchableOpacity>
                    </Body>
                </CardItem>
            </Card>
        )
    }
    
    renderListFooter() {
        var totalPrice = 0
        for (const testIndex of this.state.selectedLabTests) {
            var bloodTest = this.state.bloodTests[testIndex]
            totalPrice += bloodTest.Price
        }
        if (this.state.selectedLabTests.length > 0){
            console.log(totalPrice)
            return (
                <View style={{flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 36, alignItems: 'center'}}>
                    <MyText right medium style={{flex: 1}}>{strings('Total:')} </MyText>
                    <View style={styles.priceView}>
                        <Image source={Images.dollar} style={styles.dollarIcon}/>
                        <MyText light style={styles.priceText}>{totalPrice}</MyText>
                    </View>
                </View>
            )
        }else{
            return (            
                <View></View>
            )
        }
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <View style={styles.dropdownWrapper}>
                    <Dropdown 
                        label={strings('Select a Lab Test')}
                        data={this.state.dropdownValues} 
                        dropdownPosition={0} 
                        itemCount={5} 
                        onChangeText={(value, index, data)=>{this.setState({selectedLabTestIndex: index})}}
                        containerStyle={{flex: 1}}/>
                    <Button style={styles.addIcon} onPress={this.onAdd.bind(this)}>
                        <Icon name='md-add' />
                    </Button>
                </View>
                <FlatList
                    data={this.state.selectedLabTests}
                    renderItem = {this.renderLabTestItem.bind(this)}
                    keyExtractor = {(item, index) => index.toString()}
                    ListFooterComponent = {this.renderListFooter.bind(this)}
                    ListEmptyComponent = {<MyText center medium style={{marginVertical: 8,}}>{strings('No selected lab tests')}</MyText>}
                />
                <View style={styles.buttonBar}>
                    <Button bordered danger onPress={this.onSurvey.bind(this)}><Text>{strings('Quick Survey')}</Text></Button>
                    <Button primary onPress={this.onProceed.bind(this)}><Text>{strings('Proceed')}</Text></Button>
                </View>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: Colors.backgroundPrimary,
        flex: 1,
    },

    dropdownWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 56,
    },

    addIcon: {
        position: 'absolute',
        right: 0,
        bottom: 8,
    },

    buttonBar: {
        flexDirection: 'row',
        paddingTop: 24,
        justifyContent: 'space-between'
    },

    cardItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    priceView: {
        flexDirection: 'row',
        backgroundColor: Colors.Green,
        borderRadius: 4,
        padding: 4,
        alignItems: 'center',
        marginHorizontal: 8,
    },

    dollarIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff'
    },

    priceText: {
        fontSize: 16,
    }
});
  