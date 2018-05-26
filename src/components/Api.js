/**
 * @providesModule @api
 */

import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';
import AppData from './AppData'

const API_ROOT = "http://webservice.saudicommunitycare.com/api"

async function getJSON(url){
    try {
        let response = await fetch(url)
        let json = await response.json()
        return json
    } catch (error) {
        console.error(error)
        return null
    }
}

async function postJSON(url, json) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        });
        let responseJson = await response.json() 
        return responseJson
    } catch (error) {
        console.log("error", error)
    }
}

async function login(email, password){
    const LoginUrl = `${API_ROOT}/client/query?username=${email}&password=${password}`
    return await getJSON(LoginUrl)
}

async function signup(email, password, notes, lat, long, gender){
    const SignupUrl = `${API_ROOT}/client?UserName=${email}&Password=${password}&Notes=${notes}&Lat=${lat}&Long=${long}&Gender=${gender}`
    return await postJSON(SignupUrl, null)
}

async function sendVerification(email){
    const SendVerificationUrl = `${API_ROOT}/client/query?username=${email}`
    return await postJSON(SendVerificationUrl, null)
}

async function updatePassword(email, password, verifcationCode){
    const updatePasswordUrl = `${API_ROOT}/client/query?UserName=${email}&Password=${password}&VerifcationCode=${verifcationCode}`
    console.log(updatePasswordUrl)
    return await postJSON(updatePasswordUrl, null)
}

async function getQuestionsBySurveyName(surveyName){
    const GetSurveyUrl = `${API_ROOT}/Survey/query?SurveyName=${surveyName}`
    return await getJSON(GetSurveyUrl)
}

async function postSurveyAnswer(questions){
    var surveyId = questions[0].surveyID
    var user = await AppData.getItem('login_user')
    var answers = []
    for (const question of questions) {
        var qId = question.qID
        var questionAnswers = question.checkedIndexes.map(checkedIndex=>`${qId} ${checkedIndex}`)
        answers.push(...questionAnswers)
    }
    var answersStr = answers.join(',')

    const GetSurveysUrl = `${API_ROOT}/Survey?UserID=${user.clientID}&SurveyID=${surveyId}&SurveyAnswers=${answersStr}`
    return await postJSON(GetSurveysUrl, null)
}

async function createOrderBySurveyRecomendation(date, time, coordinate, paymentMethod, recommendation) {
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/CreateOrderBySurveyRecomendation?UserID=${user.clientID}&OrderDate=${date} ${time}:00.000&Longitude=${coordinate.longitude}&Latitude=${coordinate.latitude}&paymentType=${paymentMethod}&Recommendation=no%20recommendation&SurveyRecomendation=${recommendation}`
    console.log('createOrderBySurveyRecomendation', url)
    return await postJSON(url, null)
}

async function getBloodTests(){
    var getBloodTestUrl = `${API_ROOT}/BloodTest?GetBloodTests`
    return await getJSON(getBloodTestUrl)
}

export default { 
    getJSON, 
    postJSON, 
    login, 
    signup,
    sendVerification,
    updatePassword,
    getQuestionsBySurveyName, 
    postSurveyAnswer,
    createOrderBySurveyRecomendation,
    getBloodTests,
}