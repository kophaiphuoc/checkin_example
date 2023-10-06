import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'

import Login from './src/screens/Login/Login';
import ListEvent from './src/screens/ListEvents/ListEvent';
import Checkin from './src/screens/Checkin/Checkin';
import Camera from './src/screens/Camera/Camera';

const Stack = createNativeStackNavigator();
const App = () => {
  return (

    <NavigationContainer>
      <StatusBar barStyle="dark-content" hidden={true} />

      <Stack.Navigator initialRouteName='Login'>

        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />

        <Stack.Screen name="ListEvent" component={ListEvent} options={{
          headerShown: false
        }} />

        <Stack.Screen name="Checkin" component={Checkin} options={{
          headerShown: false
        }} />

        <Stack.Screen name="Camera" component={Camera} options={{
          headerShown: false
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})