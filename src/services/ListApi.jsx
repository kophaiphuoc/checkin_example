import Axios from "../configs/Axios"
import Url from "../configs/Url"

const ListApi = {
    CHECK_LOGIN: async (data) => {
        try {
            const urlLogin = Url.LOGIN_URL
            const checkLogin = await Axios('POST', urlLogin, data)
           if(checkLogin == 2){
            return 2
           }else{
            return checkLogin
           }
        } catch (error) {
            console.log(error)
            return 2
        }
    },
    LIST_EVENT: async (data) => {
        try {
            const urlLogin = Url.LIST_EVENT
            const listevent = await Axios('GET', urlLogin, data)
            return listevent
        } catch (error) {
            console.log(error)
            return 2
        }
    },
    DETAIL_EVENT: async (code,data) => {
        try {
            const urlLogin = Url.DETAIL_EVENT
            const detail_event = await Axios('GET', urlLogin+code, data)
            return detail_event
        } catch (error) {
            console.log(error)
            return 2
        }
    },
    GET_TABLE: async (id,data) => {
        try {
            const urlLogin = Url.CHECK_TABLE
            const table = await Axios('GET', urlLogin+id, data)
            return table
        } catch (error) {
            console.log(error)
            return 2
        }
    },
    POST_CHECKIN: async (data) => {
        console.log(data)
        try {
            const urlLogin = Url.CHECKIN
            const checkLogin = await Axios('POST', urlLogin, data)
           if(checkLogin == 2){
            return 2
           }else{
            return checkLogin
           }
        } catch (error) {
            return 2
        }
    },
    GET_README: async (url,data) => {
        try {
            console.log(url,data)
            const readme = await Axios('GET', url,data)
            return readme
        } catch (error) {
            console.log(error)
            return 2
        }
    }
    
}

export default ListApi