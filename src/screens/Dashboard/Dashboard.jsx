import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Dashboard_css';

const Dashboard = () => {
  const dataMenu = [
    {
      img: require('../../assets/barcode-scan.png'),
      title: 'Checkin Sự Kiện',
      description:
        'Sử dụng để lưu dữ liệu từ máy chủ về máy PDA để scan khi offline',
    },
    {
      img: require('../../assets/synchronize.png'),
      title: 'Đồng Bộ Thông Tin Sự Kiện',
      description:
        'Sử dụng để lưu dữ liệu từ máy chủ về máy PDA để scan khi offline',
    },
    {
      img: require('../../assets/synchronize.png'),
      title: 'Động Bộ Danh Sách Khách Hàng',
      description:
        'Sử dụng để lưu dữ liệu từ máy chủ về máy PDA để scan khi offline',
    },
  ];
  return (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.02}}
        end={{x: 0.0, y: 0.4}}
        colors={['#0eb6d3', '#ffffff']}
        style={styles.container}>
          <View>
            <Text style={{width:'100%',textAlign:'center',fontSize:16,fontWeight:'500',color:'white'}}>
              Thông tin sự kiện
            </Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:"space-evenly",marginTop:10,flexWrap:'wrap'}}>
            <Text style={{fontSize:14,fontWeight:'700',color:'black'}}>
              Sự Kiện Vietbuild
            </Text>
            <Text style={{fontSize:14,fontWeight:'400',color:'black'}}>
              Code :VIETBUILD228910VIETBUILD228910
            </Text>
            </View>
          </View>
        <View>
          {dataMenu.map((menu, index) => (
            <TouchableOpacity style={styles.containerMenu} key={index}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems:'center',
                  backgroundColor:'#e2e2e2'
                }}>
                <View style={{width: 50, height: 50,alignItems:'center',justifyContent:'center'}}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: '70%',
                      height: '70%',
                    }}
                    source={menu.img}></Image>
                </View>
                <View style={{width:'80%'}}>
                  <Text style={{textAlign:'center',fontWeight:'500',color:'black'}}>{menu.title}</Text>
                </View>
              </View>
              <View>
                <Text style={{textAlign:'left',fontWeight:'400',color:'black',padding:10,fontSize:12}}>{menu.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Dashboard;
