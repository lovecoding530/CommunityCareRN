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

async function createOrderByItems(date, time, coordinate, paymentMethod, labTestIDs) {
    var orderItems = labTestIDs.join(',')
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/CreateOrderByItems?UserID=${user.clientID}&OrderDate=${date} ${time}:00.000&Longitude=${coordinate.longitude}&Latitude=${coordinate.latitude}&paymentType=${paymentMethod}&Recommendation=no%20recommendation&OrderItems=${orderItems}`
    console.log('createOrderByItems', url)
    return await postJSON(url, null)
}

async function getBloodTests(){
    var getBloodTestUrl = `${API_ROOT}/BloodTest?GetBloodTests`
    return await getJSON(getBloodTestUrl)
}

async function getAllClientSurvey(){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Survey/GetAllClientSurvey?UserID=${user.clientID}`
    return await getJSON(url)
}

async function getSurveyAnswer(enrollID){
    var url = `${API_ROOT}/Survey/GetSurveyAnswer?EnrollID=${enrollID}`
    return await getJSON(url)
}

async function deleteSurveyEnrollment(enrollID){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Survey/DeleteSurveyEnrollment?EnrollmentID=${enrollID}&DeletedBy=${user.clientID}`
    return await postJSON(url, null)
}

async function getAllUserOrders(){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/GetAllUserOrders?UserID=${user.clientID}`
    return await getJSON(url)
}

async function deleteOrder(orderID){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/DeleteOrder?OrderID=${orderID}&UserID=${user.clientID}`
    return await postJSON(url, null)
}

async function updateOrder(orderID, date, time, coordinate){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/UpdateOrderDate?OrderID=${orderID}&OrderDate=${date} ${time}:00.000&Longitude=${coordinate.longitude}&Latitude=${coordinate.latitude}&UserID=${user.clientID}`
    return await postJSON(url, null)
}

async function getContactInfo(){
    var url = `${API_ROOT}/Info/GetContactInfo`
    return await getJSON(url)
}

async function sendContactMessage(message){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Info/query?UserID=${user.clientID}&Message=${message}`
    console.log(url)
    return await postJSON(url, null)
}

async function getAgreement(){
    var url = `${API_ROOT}/Agreement/GetAgreement`
    return await getJSON(url)
}

async function getAllStaffOrders(){
    var user = await AppData.getItem('login_user')
    var url = `${API_ROOT}/Order/GetAllStaffOrders?StaffID=${user.staffID}`
    return await getJSON(url)
}

async function getTestItemsByRecomendation(surveyRecomendation){
    var url = `${API_ROOT}/Order/GetTestItemsByRecomendation?SurveyRecomendation=${surveyRecomendation}`
    return await getJSON(url)
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
    createOrderByItems,
    getBloodTests,
    getAllClientSurvey,
    getSurveyAnswer,
    deleteSurveyEnrollment,
    getAllUserOrders,
    deleteOrder,
    updateOrder,
    getContactInfo,
    sendContactMessage,
    getAgreement,
    getAllStaffOrders,
    getTestItemsByRecomendation
}