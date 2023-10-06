import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, BackHandler,Image } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Card, WingBlank, Provider, Modal } from '@ant-design/react-native'
import KeyEvent from 'react-native-keyevent';

import styles from './ListEvent_css';
import ListApi from '../../services/ListApi';

const ListEvent = (props) => {

  const { navigation } = props;

  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const NextScreens = (code) => {
    navigation.navigate('Checkin', { code: code })
  }

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent) => {
      if (keyEvent.keyCode == 4) {
        onButtonClick()
      } else {
        return null
      }
    });
  }, []);

  onButtonClick = () => {
    Modal.alert('Thoát', 'bạn có muốn thoát app', [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'OK', onPress: () => Goback() },
    ])
  }


  const Goback = () => {
    BackHandler.exitApp();
  }


  const YourComponent = (data) => {
    const id = 'mã sự kiện :' + data.data.id
    const code = data.data.code
    const name = data.data.name
    const description = data.data.description
    const place = data.data.place
    const event_date = data.data.event_date

    return (
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => NextScreens(code)}>
        <View>
          <WingBlank size="sm">
            <Card>
              <Card.Header
                title={code}
                thumbStyle={{ width: 30, height: 30 }}
                thumb="https://cdn-icons-png.flaticon.com/128/3656/3656845.png"
                extra={name}
                styles={{ headerContent: styles.cardtitle, headerExtra: styles.cartextra }}
              />
              <Card.Body>
                <View style={{ height: 42 }}>
                  <Text style={{ marginLeft: 14, color: 'black', fontSize: 12 }}>{description ? description : 'Đang cập nhật'}</Text>
                </View>
              </Card.Body>
              <Card.Footer
                content={place ? place : 'Đang cập nhật'}
                extra={event_date ? event_date : 'Đang cập nhật'}
                styles={{ footerContent: styles.footerconten, footerExtra: styles.footerextra }}
              />
            </Card>
          </WingBlank>
        </View>
        
      </TouchableOpacity>
    );

  };

  useFocusEffect(
    useCallback(() => {
      ListApi.LIST_EVENT('').then((result) => {
        if (result == 2) {
          console.log('get data failed')
          setLoading(false)
        } else {
          setData(result.data.data)
          setLoading(false)
        }
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <Provider>
        <View style={styles.Vtitle}>
          <Image source={require('../../assets/list.png')}></Image>
          <Text style={styles.txttile}>DANH SÁCH SỰ KIỆN</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          null
        )}

        <View style={styles.listItem}>
          <FlatList
            data={Data}
            renderItem={({ item }) => <YourComponent data={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Provider>
    </View>
  )
}

export default ListEvent
