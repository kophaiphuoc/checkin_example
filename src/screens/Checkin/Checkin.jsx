import { Text, View, ActivityIndicator, Image, TouchableOpacity, AppState, Dimensions } from 'react-native'
import React, { useEffect, useState ,useRef} from 'react'
import Clipboard from '@react-native-clipboard/clipboard';
import { Provider, Modal } from '@ant-design/react-native';

import ListApi from '../../services/ListApi'
import styles from './Checkin_css'

const Checkin = (props) => {
    const { navigation, route: { params: { code } } } = props
    const { width, height } = Dimensions.get('window');

    const [Data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [table, settable] = useState('');
    const [img, setImg] = useState('');
    const [appState, setAppState] = useState(AppState.currentState);


    // const [img, setimg] = useState('https://img.icons8.com/external-flat-icons-inmotus-design/256/external-Loading-ui-flat-icons-inmotus-design-15.png');

    useEffect(() => {
        ListApi.DETAIL_EVENT(code, '').then((result) => {
            if (result == 2) {
                console.log('get data failed')
                setLoading(false)
            } else {
                setLoading(false)
                const img = result.data?.data?.images?.mobile_background
                setImg(img)
            }
        });
    }, [])

    // const showToasSucssec = (count, name, table) => {
    //     setTimeout(() => {
    //         return (
    //             <View style={{ width: 280, height: 150, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
    //                 <Text style={{ fontWeight: '400', fontSize: 20, color: 'white' }}>
    //                     {name}
    //                 </Text>
    //                 <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>
    //                     Số Bàn :
    //                     <Text style={{ color: 'red', fontSize: 20, fontWeight: '500' }}> {table}</Text>
    //                 </Text>
    //                 <Text style={{ color: 'red', fontSize: 24, fontWeight: '500', textAlign: 'center', paddingRight: 8 }}>
    //                     {count > 1 ? 'Đã checkin' : 'Checkin thành công'}
    //                 </Text>
    //             </View>
    //         )
    //     }, 5000)
    // }
    // const showToastFail = () => {
    //     Toast.info({
    //         content: (
    //             <View
    //                 style={{
    //                     width: 200,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     height: 60
    //                 }}>
    //                 <Text style={{ color: 'red', fontWeight: '400', fontSize: 20 }}>
    //                     Xin hãy kiểm tra lại QR
    //                 </Text>
    //             </View>
    //         ),
    //         duration: 5,
    //     });

    // };


    onButtonClick = () => {
        Modal.alert('Thoát', 'bạn có muốn thoát khỏi màn hình', [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'OK', onPress: () => Goback() },
        ])
    }

    const timeoutIdRef = useRef(null);

    const handleButtonPress = () => {
      setShowToast(true);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setShowToast(false);
        timeoutIdRef.current = null;
      }, 10000);
    };
    
    useEffect(() => {
      return () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }, []);

    let timeoutId2 = null; // Khai báo biến để lưu trữ ID của hàm setTimeout

    const handleButtonPress2 = () => {

        if (!showToast2) {
            setShowToast2(true);
            if (timeoutId2) {
                clearTimeout(timeoutId2); // Xóa bỏ timeout cũ nếu có
            }
            timeoutId2 = setTimeout(() => {
                setShowToast2(false);
                timeoutId2 = null;
            }, 2000); // Hiển thị trong 5 giây
        }
    };

    const NextScreen = () => {
        navigation.navigate('Camera', { code: code })
    }

    const Goback = () => {

        navigation.goBack()
    }

    const PostCheckin = async (qrcode) => {
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
        setLoading(true)
        await ListApi.POST_CHECKIN(data).then(async (result) => {
            if (result == 2) {
                setName('')
                console.log('checkin failed');
                setLoading(false)
                handleButtonPress()
            } else {
                const count = result.data.data.checkin_count
                const name = result.data.data.name
                console.log(count,name)
                setName(name)
                setCount(count)
                // showToasSucssec(count, name, table)
                handleButtonPress()
                // await ListApi.GET_TABLE(qrcode, '').then(async (result) => {
                //     const table = result.data.data.custom_fields.tables
                //     console.log(table)
                //     // showToasSucssec(count, name, table)
                //     setName(name)
                //     setCount(count)
                //     settable(table)
                //     handleButtonPress()
                // })
                setLoading(false)

            }
        });
    }


    // useEffect(() => {
    //     const handleAppStateChange = (nextAppState) => {
    //         if (nextAppState === 'active') {
    //             // Ứng dụng đang chạy
    //             console.log(nextAppState)
    //         } else if (nextAppState === 'background') {
    //             Clipboard.removeAllListeners()
    //             console.log(nextAppState)
    //             // Ứng dụng đang ở nền
    //         } else if (nextAppState === 'inactive') {
    //             Clipboard.removeAllListeners()
    //             console.log(nextAppState)
    //             // Ứng dụng đang chuyển đổi giữa các trạng thái khác nhau
    //         }
    //         setAppState(nextAppState);
    //     };

    //     const subrice = AppState.addEventListener('change', handleAppStateChange);
    //     return () => {
    //         subrice.remove()
    //     };
    // }, []);

    Clipboard.removeAllListeners()
    const listener = async () => {
        const clipboardContent = await Clipboard.getString();
        PostCheckin(clipboardContent)
    }
    Clipboard.addListener(listener);

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
                <TouchableOpacity onPress={() => null}>
                    {/* <Image style={styles.imgicon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9592/9592226.png' }}></Image> */}
                    <View style={{ width: 1, height: 1, backgroundColor: 'transparent' }}></View>
                </TouchableOpacity>
            </View>

            <View style={styles.Vimgicon}>
                <TouchableOpacity onPress={() => null}>
                    {/* <Image style={styles.imgicon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9592/9592226.png' }}></Image> */}
                    <View style={{ width: 1, height: 1, backgroundColor: 'transparent' }}></View>
                </TouchableOpacity>
            </View>

            <View style={styles.Vimgicon2}>
                <TouchableOpacity onPress={() => onButtonClick()}>
                    <Image style={styles.imgicon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10238/10238776.png' }}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.imgV}>
                <Image style={styles.img} source={{uri: img == '' || img == false ? 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/hinh-nen-dang-tai-troll-cho-iphone_093255387.jpg' : img}} />
            </View>

            {/* đang fix khúc này */}
            {showToast ? <View style={{
                width: '80%',
                alignItems: 'center',
                height:'25%',
                justifyContent: 'center',
                backgroundColor: 'white',
                backgroundColor: 'white',
                borderRadius: 8,
                position: 'absolute',
                top: '70%',
                zIndex: 3,
            }}>
                <View>
                    <Text>{name.length > 0 ?
                        <View>
                            <Text style={{ color: 'black',fontSize:20,fontWeight:'500',textAlign:'center' }}>{name}</Text>
                            {/* <Text style={{ color: 'black',fontSize:20,fontWeight:'500',textAlign:'center' }}>Số Bàn :  
                                <Text style={{ color: 'red',fontSize:20,fontWeight:'500' }}> {table}</Text>
                            </Text> */}
                            <Text style={{ color: 'red' ,textAlign:'center',fontSize:18,fontWeight:'500',}}>{count > 1 ? 'Đã checkin' : 'Checkin thành công'}</Text>
                        </View>
                        :
                        <View>
                            <Text style={{ color: 'red', textAlign: 'center',fontSize:18,fontWeight:'400' }}>Xin hãy kiểm tra lại QR</Text>
                            <Text style={{  color: 'red', textAlign: 'center',fontSize:20,fontWeight:'500'}}>Không tìm thấy</Text>
                        </View>
                    }</Text>
                </View>
            </View> : null}
            {/* khúc này */}

            {showToast2 ? <View
                style={{
                    width: 280,
                    height: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    position: 'absolute', zIndex: 3, backgroundColor: 'white', left: 75, top: '70%', borderRadius: 8
                }}>
                <Text style={{ color: 'red', fontWeight: '400', fontSize: 20 }}>
                    Xin hãy kiểm tra lại QR
                </Text>
                <Text style={{ color: 'red', fontWeight: '500', fontSize: 20 }}>Không tìm thấy</Text>
            </View> : null}
            <Provider></Provider>

        </View>
    )
}

export default Checkin
