import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './Setting_css';

const Setting = props => {
  const {navigation} = props;
  const dataMenu = [
    {
      name: 'Đăng xuất',
      img: require('../../assets/logout.png'),
    },
    {
      name: 'Cập nhật phần mềm',
      img: require('../../assets/updated.png'),
    },
    {
      name: 'Cấu hình sự kiện',
      img: require('../../assets/settings.png'),
    },
  ];

  const selectMenuItem = index => {
    switch (index) {
      case 0:
        navigation.navigate('Login');
        break;
      case 1:
        null;
        break;
      default:
        null;
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View >
        <View style={{width: '100%', height: 90, alignItems: 'center'}}>
          <Image
            style={{width: 90, height: '100%'}}
            source={{
              uri:
                'https://cdn-icons-png.flaticon.com/128/5226/5226070.png' ||
                require('../../assets/user.png'),
            }}></Image>
        </View>
        <View>
          <View style={styles.containerInfor}>
            <Text style={{marginTop: 5,color:'black',fontSize:12,fontWeight:'500'}}>
              Phiên Bản : {process.env.VERSION}
            </Text>
          </View>
        </View>
        <View>
          {dataMenu.map((menu, index) => (
            <TouchableOpacity
              onPress={() => selectMenuItem(index)}
              style={styles.containerMenu}
              key={index}>
              <Text>{menu.name}</Text>
              <Image style={{width: 40, height: 40}} source={menu.img}></Image>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Setting;
