import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListApi from '../../services/ListApi';


const Splash = (props) => {
    const { navigation } = props;

    useEffect(() => {
        setTimeout(() => {
            const checktoken = async () => {
                const token = await AsyncStorage.getItem('token');
                // const accountParse = JSON.parse(account)

                await ListApi.LIST_EVENT('').then(async(results) => {
                    try {
                        if (results == 2) {
                            navigation.navigate("Login")
                        } else {
                            if (token == null || token == '') {
                                navigation.navigate("Login")
                            } else {
                                navigation.navigate("ListEvent") 
                            }
                        }
                    } catch (error) {
                        navigation.navigate("Login")
                    }
                })
            }
            checktoken()
        }, 2000);
    }, []);
    return (
        <View style={styles.container}>
            <Image style={styles.imglogo} source={require('../../assets/logo.png')}></Image>
            <ActivityIndicator color="white"
                size="large"></ActivityIndicator>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    imglogo: {
        resizeMode: 'contain',
        width: 300
    },
    container: {
        display: 'flex',
        backgroundColor: '#1aacef',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})