import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function Axios(method, url,data) {
    console.log(method, url, data);
   const token = await AsyncStorage.getItem('token')
    const options = {
        method: method,
        url: url,
        headers: {
            'App-Key': 'vauuihJjRALKiHptswdSApOkppRR++OxnaVdbi1PksA',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'PDA',
            'Authorization': `Bearer ${token}`,
        },
        data
    };
    try {
        const response = await axios.request(options);
        return response
    } catch (error) {
        console.log(error.request);
        return 2

    }
}

export default Axios