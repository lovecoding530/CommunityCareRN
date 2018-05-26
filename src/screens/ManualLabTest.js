import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  FlatList,
  Alert,
} from 'react-native';

import { Container, Content, Button, Icon, Form, Item, Label, Text, Footer, List, ListItem, Body, CheckBox, Card, CardItem, Row, Right, Left, Radio,} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader, ManyChoices } from "../components";
import { Dropdown } from 'react-native-material-dropdown';
import Utils from "../components/utils";
import API from '../components/Api'

export default class ManualLabTest extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            bloodTests: [],
            dropdownValues: [],
            selectedLabTestIndex: -1,
            selectedLabTests: [],
        }
    }

    async componentDidMount() {
        var localePre = 'e'
        this.setState({loaderVisible: true})
        const bloodTests = await API.getBloodTests()
        var dropdownValues = bloodTests.map((test) => {
            var item = {value:test[`${localePre}name`]}
            console.log(item)
            return item
        })
        console.log(bloodTests)
        console.log(dropdownValues)
        this.setState({bloodTests, dropdownValues, loaderVisible: false})
    }

    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    onSkip() {
        Alert.alert(
            'Are you sure?',
            'Are you sure to skip the survey?',
            [
                {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'YES', onPress: async () => {
                }},
            ],
            { cancelable: false }
        )
    }

    onFinish(){
        Alert.alert(
            'Are you sure?',
            'Are you sure to finish the survey?',
            [
                {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => { this.finishSurvey() }},
            ],
            { cancelable: false }
        )
    }

    async finishSurvey() {
        this.setState({loaderVisible: true})
        const response = await API.postSurveyAnswer(this.state.questions)
        this.setState({loaderVisible: false})

        setTimeout(() => {
            Alert.alert(
                'Survey is completed',
                `Recommended test is :\n${response}`,
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {
                        const {navigate} = this.props.navigation
                        navigate('PaymentMethod', {recommendTest: response})
                    }},
                ],
                { cancelable: false }
            )
        }, 500);
    }

    onChangedSurveyAnswers(questionIndex, checkedIndexes){
        var questions = Utils.copy(this.state.questions)
        questions[questionIndex].checkedIndexes = checkedIndexes
        this.setState({questions})
    }

    renderLabTestItem({item, index}) {
        var localePre = 'e'

        return (
            <Card>
                <CardItem>
                    <Body>
                        <MyText center style={styles.question}>{item[`${localePre}name`]}</MyText>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    onAdd() {
        var selectedLabTests = this.state.selectedLabTests
        selectedLabTests.push(this.state.bloodTests[this.state.selectedLabTestIndex])
        this.setState({
            selectedLabTests,
        })
    }

    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <View style={styles.dropdownWrapper}>
                    <Dropdown 
                        label='Lab Test' 
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
                />
                <Row style={styles.buttonBar}>
                    <Button bordered danger onPress={this.onSkip.bind(this)}><Text>   Skip   </Text></Button>
                    <Button primary onPress={this.onFinish.bind(this)}><Text>   Finish   </Text></Button>
                </Row>
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
        padding: 24,
        justifyContent: 'space-between'
    },

});
  