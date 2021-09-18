import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Blank} from '../screens/Blank';
import {Simulation} from "../screens/Simulation";

const Drawer = createDrawerNavigator();

export const RootNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Blank" component={Blank}/>
            <Drawer.Screen name="Simulation" component={Simulation}/>
        </Drawer.Navigator>
    </NavigationContainer>
);
