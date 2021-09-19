import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Title} from '../screens/Title';
import {Simulation} from "../screens/Simulation";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();

export const RootNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Title" component={Title}/>
            <Stack.Screen name="Simulation" component={Simulation}/>
        </Stack.Navigator>
        <StatusBar hidden />
    </NavigationContainer>
);
