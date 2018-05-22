import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';

async function getItem(key){
    const valueStr = await AsyncStorage.getItem(key)
    try {
        return JSON.parse(valueStr)        
    } catch (error) {
        return valueStr
    }
}

async function setItem(key, value){
    await AsyncStorage.setItem(key, JSON.stringify(value))            
}

export default {getItem, setItem}