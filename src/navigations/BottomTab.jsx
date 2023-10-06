import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '../screens/Dashboard/Dashboard';
import ListEvent from '../screens/ListEvents/ListEvent';
import Setting from '../screens/SettingEvent/Setting';

const BottomTab = () => {
    const Tab = createBottomTabNavigator();
    
    const screens = [
        // {
        //     name: 'Dashboard',
        //     component: Dashboard,
        //     options: {
        //         tabBarIcon: ({ color, size }) => (
        //             <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={size} />
        //         ),
        //     },
        // },
        {
            name: 'Sự Kiện',
            component: ListEvent,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
                ),
            },
        },
        {
            name: 'Cấu hình',
            component: Setting,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
                ),
            },
        },

    ];

    return (
        <Tab.Navigator 
         initialRouteName='Dashboard'
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#009EFF', 
            
        }}
        >
            {screens.map((screen) => (
                <Tab.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Tab.Navigator>
    )
}

export default BottomTab