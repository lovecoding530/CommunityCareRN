import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import Spinner from "react-native-spinkit";
import {Colors} from '@theme';
import Text from "./Text";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { strings } from '@i18n';

const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Spinner isVisible={loading} size={responsiveWidth(10)} type='Circle'/>
                    <Text medium>{strings('Please wait')}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundModal,
    },

    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: responsiveWidth(27),
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    }
});

export default Loader;