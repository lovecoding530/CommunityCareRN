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
import Utils from "../components/utils";
import API from '../components/Api'
import { strings, localePre } from '@i18n';

export default class QuickSurvey extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            isCheckedAgreement: false,
            questions: [],
            surveyName: 'Main Survey',
            checked: true,
        }
    }

    async componentDidMount() {
        this.setState({loaderVisible: true})
        const questions = await API.getQuestionsBySurveyName(this.state.surveyName)
        for (var question of questions) {
            question.checkedIndexes=[]
        }
        this.setState({questions, loaderVisible: false})
    }

    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    onSkip() {
        const {navigate, goBack} = this.props.navigation
        Alert.alert(
            strings('Are you sure?'),
            strings('Are you sure to skip the survey?'),
            [
                {text: strings('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: strings('Yes'), onPress: async () => {
                    navigate("SkipSurveyStack")
                }},
            ],
            { cancelable: false }
        )
    }

    onFinish(){
        Alert.alert(
            strings('Are you sure?'),
            strings('Are you sure to finish the survey?'),
            [
                {text: strings('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: strings('Yes'), onPress: () => { this.finishSurvey() }},
            ],
            { cancelable: false }
        )
    }

    async finishSurvey() {
        this.setState({loaderVisible: true})
        const response = await API.postSurveyAnswer(this.state.questions)
        this.setState({loaderVisible: false})
        console.log(response)
        setTimeout(() => {
            if(response.Message == null){
                if(response == "No Tests Needed"){
                    Alert.alert(
                        strings('Survey is completed'),
                        `${response}`,
                        [
                            {text: strings('OK'), onPress: () => {
                                const {navigate} = this.props.navigation
                                navigate('HomeStack')
                            }},
                        ],
                        { cancelable: false }
                    )
                }else{
                    Alert.alert(
                        strings('Survey is completed'),
                        `${strings('Recommended test is :')}\n${response}`,
                        [
                            {text: strings('Cancel'), onPress: () => {
                                const {navigate} = this.props.navigation
                                navigate("SkipSurveyStack")
                            }, style: 'cancel'},
                            {text: strings('OK'), onPress: () => {
                                const {navigate} = this.props.navigation
                                navigate('ManualLabTest', {recommendTest: response})
                            }},
                        ],
                        { cancelable: false }
                    )    
                }
            }else{
                alert(response.Message)
            }
        }, 500);
    }

    onChangedSurveyAnswers(questionIndex, checkedIndexes){
        var questions = Utils.copy(this.state.questions)
        questions[questionIndex].checkedIndexes = checkedIndexes
        this.setState({questions})
    }

    renderQuestionItem({item, index}) {
        var title = item[`${localePre}title`]
        var choices = []
        var many = item.qType == 2
        for (let index = 1; index <= 12; index++) {
            var key = `choice${index}${localePre}`
            var value = item[key]
            if (value == '') break
            choices.push(value)
        }
        var checkedIndexes = item.checkedIndexes ? item.checkedIndexes : []

        return (
            <Card>
                <CardItem>
                    <Body>
                        <MyText center style={styles.question}>{title}</MyText>
                        <View style={styles.question_divider}/>
                        <ManyChoices many={many} questionIndex={index} data={choices} checkedIndexes={checkedIndexes} onChanged={this.onChangedSurveyAnswers.bind(this)}/>
                    </Body>
                </CardItem>
            </Card>
        )
    }
            
    render() {
        return (
        <Container>
            <Loader loading={this.state.loaderVisible}/>
            <Content contentContainerStyle={styles.container}>
                <MyText medium bold center style={styles.surveyTitle}>{strings(this.state.surveyName)}</MyText>
                <FlatList
                    data={this.state.questions}
                    renderItem = {this.renderQuestionItem.bind(this)}
                    keyExtractor = {(item, index) => index.toString()}
                />
                <Row style={styles.buttonBar}>
                    <Button bordered danger onPress={this.onSkip.bind(this)}><Text>{strings('Skip')}</Text></Button>
                    <Button primary onPress={this.onFinish.bind(this)}><Text>{strings('Finish')}</Text></Button>
                </Row>
            </Content>
        </Container>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: Colors.backgroundPrimary,
    },
    surveyTitle: {
        marginVertical: 18,
    },

    form: {
        marginTop: 24,
    },

    checkboxBody: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonBar: {
        padding: 24,
        justifyContent: 'space-between'
    },

    question: {
        width: '100%'
    },

    question_divider: {
        width: '50%',
        height: 0.5,
        marginVertical: 8,
        alignSelf: 'center',
        backgroundColor: Colors.Navy
    }

});
  