import { Text, View, Image, TouchableOpacity, ActivityIndicator,Linking} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { InputItem, Checkbox } from '@ant-design/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListApi from '../../services/ListApi';
import { Provider, Modal } from '@ant-design/react-native';
import {VERSION,URL_UPGRADE,SUPPLIER,FOLDER} from "@env"
import styles from './Login_css'

const Login = (props) => {
    const { navigation } = props;

    const [name, setname] = useState('')
    const [pass, setpass] = useState('')
    const [saveAccount, setSaveAccount] = useState(false)


    const [loading, setLoading] = useState(false);

    const checkLogin = () => {
        setLoading(true)
        const data = {
            "username": name,
            "password": pass,
        }
        ListApi.CHECK_LOGIN(data).then(async (result) => {
            if (result == 2) {
                console.log('Login failed')
                setLoading(false)
            } else {
                setLoading(false)
                const token = result.data.data.access_token
                storeData(token)
                navigation.navigate('ListEvent')
            }
        })
    }


    // save token 
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (e) {
            console.log(e)
        }
    }

    // save token 
    const checkSaveAccount = async (e) => {
        try {
            if (e.target.checked == false) {
                const value = {
                    "username": '',
                    "password": '',
                    "checked": false
                }
                const convetValue = JSON.stringify(value)
                setSaveAccount(e.target.checked)
                await AsyncStorage.setItem('account', convetValue)
            } else {
                const value = {
                    "username": name,
                    "password": pass,
                    "checked": true
                }
                const convetValue = JSON.stringify(value)
                setSaveAccount(e.target.checked)
                await AsyncStorage.setItem('account', convetValue)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const UpdateVersion = (newVersion,nameApp) => {
        Modal.alert(
            <View>
                <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3756/3756730.png' }}></Image>
            </View>,
            <View style={{alignItems:'center',}}>
                <Text style={{ width: '100%',height:'33%', fontSize: 14, textAlign: 'center' }}>
                    Version hiện tại: {VERSION} 
                </Text>
                <Text style={{ width:'100%',height:'33%', fontSize: 14, textAlign: 'center' }}>
                    Version mới: {newVersion} 
                </Text>
                <Text style={{ width:'100%',height:'33%', fontSize: 14, textAlign: 'center' }}>
                    Bạn có muốn update không ? 
                </Text>
            </View>,
            [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                { text: 'OK', onPress: () => okupdate(nameApp) },
            ])
    }

    const NoUpdateVersion = () => {
        Modal.alert(
            <View>
                <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/716/716225.png' }}></Image>
            </View>,
            <Text style={{ width: '100%', fontSize: 14 }}>
                hiện tại chưa có phiên bản mới !!!
            </Text>,
            [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                { text: 'OK', onPress: () => console.log('ok') },
            ],
        );
    };

    const Upgrade = () => {
        const upgradeUrl = `${URL_UPGRADE}/${SUPPLIER}/${FOLDER}`
        const urlReadMe = `${upgradeUrl}/README.txt`
        ListApi.GET_README(urlReadMe,'').then(async(result)=>{
            if(result == 2){
                console.log(result)
            }else{
                // const versionSplit = await result.data
                const data = result.data
                const nameApp = data.name;
                const version = data.VERSION;
                if (VERSION != version) {
                    UpdateVersion(version,nameApp)
                } else {
                    NoUpdateVersion()
                }
            } 
        })
    }

    const okupdate =(newApp) =>{
        const dowloadUrl = `${URL_UPGRADE}/${SUPPLIER}/${FOLDER}/${newApp}`
        console.log(dowloadUrl)
        Linking.openURL(dowloadUrl);
    }

    useEffect(() => {
        const getAccount = async () => {
            const account = await AsyncStorage.getItem('account');
            const accountParse = JSON.parse(account)
            setname(accountParse.username)
            setpass(accountParse.password)
            setSaveAccount(accountParse.checked)
        };
        getAccount();
    }, []);


    return (
        <View style={styles.container}>
            {/* start Logo */}
            <View style={styles.Vlogo}>
                <Image style={styles.imglogo} source={require('../../assets/logo_checkin.png')}></Image>
            </View>
            {/* end Logo */}

            {/* start text wellcome */}
            {/* <View style={styles.Vtext}>
                <Text style={styles.txtWellcome}>Well Come Back</Text>
            </View> */}
            {/* end text wellcome */}

            <View style={styles.loadding}>
                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    null
                )}
            </View>

            {/* Start input login */}
            <View style={styles.VinputLogin}>
                <InputItem
                    style={styles.inputLogin}
                    type="text"
                    labelNumber='2'
                    value={name}
                    onChangeText={(name) => { setname(name) }}
                    placeholder="User Name">
                    <Image style={styles.imgIcon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1738/1738691.png' }}></Image>
                </InputItem>

                <InputItem
                    style={styles.inputLogin}
                    type="password"
                    labelNumber='2'
                    value={pass}
                    onChangeText={(pass) => { setpass(pass) }}
                    placeholder="Pass Word">
                    <Image style={styles.imgIcon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3177/3177401.png' }}></Image>
                </InputItem>

                <Checkbox
                    style={styles.checkboxLogin}
                    checked={saveAccount}
                    onChange={(e) => { checkSaveAccount(e) }}>
                    {'Remember Account'}
                </Checkbox>
            </View>
            {/* end input login */}

            {/* start button login */}
            <View style={styles.Vbtnlogin}>
                <TouchableOpacity style={styles.btnlogin} onPress={() => checkLogin()}>
                    <Text style={styles.txtLogin}>Login</Text>
                </TouchableOpacity>
            </View>
            {/* end button login */}

            {/* start register text account */}
            <View style={styles.Vregister}>
                <Text style={styles.txtLogin1}>Don’t have an account ?</Text>
                <Text style={styles.txtLogin2}>Register Here</Text>
            </View>
            {/* end register text account */}
            <View style={styles.Vversion}>
                <TouchableOpacity onPress={() => Upgrade()}>
                    <Text style={styles.Txtversion}>Update Version</Text>
                </TouchableOpacity>
                <Text>Version : {VERSION}</Text>
            </View>
            <Provider></Provider>
        </View>
    )
}

export default Login