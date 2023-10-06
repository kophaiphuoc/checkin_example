import { Text, View, ActivityIndicator,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { CameraScreen } from 'react-native-camera-kit';
import { Toast, Provider } from '@ant-design/react-native';
// import delay from 'delay'

import ListApi from '../../services/ListApi'
import styles from './Camera_css';

const Camera = (props) => {
  const { navigation, route: { params: { code } } } = props
  const [loading, setLoading] = useState(false);
  const [checkbarcode, setcheckbarcode] = useState(true);

  const showToasSucssec = () => {
    Toast.info(
      {
        content: <View style={{ width: 200, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'green', fontWeight: '400', fontSize: 20 }}>Checkin thành công</Text>
        </View>
      },
      1.3,
    )
  };
  const showToastFail = () => {
    Toast.info(
      {
        content: <View style={{ width: 200, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red', fontWeight: '400', fontSize: 20 }}>Checkin thất bại</Text>
        </View>
      },
      1.3,
    )
  };

  const NextScreen = () => {
    navigation.goBack()
}

  const PostCheckin = async (qrcode) => {
    setcheckbarcode(false)
    setLoading(true);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const DateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const data = {
      "event_code": code,
      "qrcode": qrcode,
      "scan_time": DateTime
    }
    await ListApi.POST_CHECKIN(data).then(async (result) => {
      if (result == 2) {
        showToastFail()
        console.log('checkin failed');
        setLoading(false)
        setcheckbarcode(true)
      } else {
        showToasSucssec()
        setLoading(false)
        setcheckbarcode(true)
        console.log(result.data.data.checkin_count)
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.loading} >
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          null
        )}
      </View>

      <View style={styles.Vimgicon}>
        <TouchableOpacity onPress={() => NextScreen()}>
          <Image style={styles.imgicon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10238/10238776.png' }}></Image>
        </TouchableOpacity>
      </View>
      <Provider>
        <CameraScreen
          scanBarcode={checkbarcode}
          onReadCode={(event) => PostCheckin(event.nativeEvent.codeStringValue)}
          showFrame={true}
          laserColor={true}
          frameColor='blue'
        // surfaceColor='black' 
        />
      </Provider>

    </View>
  )
}

export default Camera