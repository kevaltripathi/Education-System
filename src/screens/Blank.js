import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";

export const Blank = () => {

    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>Welcome to Gravity Simulation!</Text>
            <Text style = {styles.body}>Let's learn some physics together. </Text>
            <Image style = {styles.img} source={require('./../../assets/img/planet-13.png')} />
            <Image style = {styles.img2} source={require('./../../assets/img/socials.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#3D0007',
        margin:20,
        alignSelf:'center',
    },
    body: {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#F89500',
        marginBottom: 50,
        alignSelf:'center',
    },
    container: {
        backgroundColor: "#FCE788",
        alignContent:'center',
        flex: 1,
    },
    img: {
        alignSelf:'center',
        margin: 20,
        width: '40%',
        height: '25%',
    },
    img2: {
        alignSelf:'center',
        margin: 20,
    }
});