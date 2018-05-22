/**
 * @providesModule @api
 */

import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';

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

async function login(email, password){
    const LoginUrl = `${API_ROOT}/client/query?username=${email}&password=${password}`
    console.log(LoginUrl)
    return await getJSON(LoginUrl)
}

export default {getJSON, login}