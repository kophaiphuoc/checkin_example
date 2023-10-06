import {Text, View, Switch, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import styles from './Eviroment_css';

const Eviroment = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const APP_KEY_TESTING = process.env.APP_KEY_TESTING.slice(-3);
  const APP_KEY_PRODUCTION = process.env.APP_KEY_PRODUCTION.slice(-3);
  const HIDE_KEY = '***************************';

  return (
    <View style={styles.container}>
      <View style={styles.containerEviroment}>
        <Text style={styles.txtEviroment}>Change Eviroment</Text>
      </View>

      <View style={styles.containerSwitch}>
        <Text style={{color: 'black'}}>
          {isEnabled == true ? 'Eviroment Event' : 'Eviroment Default'}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          marginTop: 20,
          padding: 10,
          borderColor: '#474747',
        }}>
        <View style={styles.containerDomainKey}>
          <Text>URL_HOST : </Text>
          <TextInput style={styles.txtDomainKey}>
            {isEnabled == true
              ? `${process.env.API_BASEURL_TESTING}`
              : `${process.env.API_BASEURL_PRODUCTION}`}
          </TextInput>
        </View>

        <View style={styles.containerDomainKey}>
          <Text>APP_KEY : </Text>
          <TextInput style={styles.txtDomainKey}>
            {isEnabled == true
              ? `${HIDE_KEY}${APP_KEY_TESTING}`
              : `${HIDE_KEY}${APP_KEY_PRODUCTION}`}
          </TextInput>
        </View>
      </View>

      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text style={{color:'black',fontWeight:'500'}}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Eviroment;
