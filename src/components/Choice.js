/**
 * @providesModule @choice
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import {Colors, Images} from '../theme';
import MyText from './Text'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Choice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var icon
        if(this.props.many){
            icon = (this.props.checked) ? Images.checkon :  Images.checkoff
        }else{
            icon = (this.props.checked) ? Images.radioon : Images.radiooff         
        }

        return (
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.onPress(this.props.index)}}>
                <MyText style={styles.text}>{this.props.text}</MyText>     
                <Image source={icon} style={styles.icon}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
    },

    icon: {
        width: 16,
        height: 16,
        tintColor: Colors.Navy
    },

    text: {
        flex: 1,
    },
});