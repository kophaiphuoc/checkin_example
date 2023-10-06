import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    Vimgicon2:{
        position:'absolute',
        zIndex:1,
        left:10,
        top:50    
    },
    Vimgicon:{
        position:'absolute',
        zIndex:1,
        right:10,
        top:10,
        width:50,
        height:50,
        paddingLeft:3,
        paddingBottom:3,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'    
    },
    imgicon:{
        width:40,
        height:40,
        
    },
    loading:{
        position: 'absolute',
        marginTop:100,
        zIndex:3,
        marginLeft:150
    },
    img:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },
    imgV:{
        width:'100%',
        height:'100%',
    },
    container:{
        width:'100%',
        height:'100%',
        position: 'relative',
        alignItems:'center'
    }
})


export default styles