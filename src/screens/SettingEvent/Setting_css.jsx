import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    containerMenu:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        marginTop:10,
        height:60,
        alignItems:'center',
        borderRadius:5,
        padding:10
    },
    txtInforUser:{
        textAlign:'center',
        marginTop:10
    },
    containerInfor:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    container:{
        width:'100%',
        height:'100%',
        padding:10
    }
})

export default styles