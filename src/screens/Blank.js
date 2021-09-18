import * as React from 'react';
import {Text, View, Image} from "react-native";

export const Blank = () => {

    return (
        <View>
            <Text>Welcome to Gravity Simulation!</Text>
            <Text>Let's learn some physics together. </Text>
            <Image source={require('./../../assets/img/planet-13.png')} />
        </View>
    );
};
