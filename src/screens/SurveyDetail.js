import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image,
  FlatList,
  Alert,
} from 'react-native';

import { Container, Content, Button, Form, Item, Label, Text, Footer, List, ListItem, Body, CheckBox, Card, CardItem, Row, Right, Left, Radio,} from 'native-base';
import {Images, Colors} from '../theme'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MyText, Loader, ManyChoices } from "../components";
import Utils from "../components/utils";
import API from '../components/Api'
import Icon from 'react-native-vector-icons/FontAwesome';
import { strings, localePre } from '@i18n';

export default class SurveyDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaderVisible: false,
            questionAnswers: [],
        }
    }

    async componentDidMount() {
        const {state: {params}} = this.props.navigation
        this.setState({loaderVisible: true})
        const answers = await API.getSurveyAnswer(params.enrollID)
        console.log(answers)
        var questionAnswers = {}
        for (const answer of answers) {
            var qID = answer.qID
            var answerNo = answer.answerNo
            var question = answer.Question
            if(questionAnswers[qID] == null){
                questionAnswers[qID] = {
                    qID: qID,
                    answers: [answerNo],
                    question: question,
                }
            }else{
                questionAnswers[qID].answers.push(answerNo)
            }
        }
        console.log(questionAnswers)
        this.setState({questionAnswers: Object.values(questionAnswers), loaderVisible: false})
    }

    goBack() {
        const {goBack} = this.props.navigation
        goBack()
    }

    renderQuestionItem({item, index}) {
        var title = item.question[`${localePre}title`]

        var renderAnswers = []
        for (let index = 1; index <= 12; index++) {
            var key = `choice${index}${localePre}`
            var value = item.question[key]
            if (value == '') break

            renderAnswers.push(
                <View key={key} style={styles.answer_wrapper}>
                    <MyText style={{flex: 1}}>{value}</MyText>
                    {item.answers.includes(index-1) &&
                        <Icon name={'check'} color={Colors.Navy}/>
                    }
                </View>
            )
        }

        return (
            <Card>
                <CardItem>
                    <Body>
                        <MyText center style={styles.question}>{title}</MyText>
                        <View style={styles.question_divider}/>
                        {renderAnswers}
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
                <FlatList
                    data={this.state.questionAnswers}
                    renderItem = {this.renderQuestionItem.bind(this)}
                    keyExtractor = {(item, index) => index.toString()}
                />
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
    },

    answer_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
    }
});
  