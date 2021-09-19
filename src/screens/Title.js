import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";

export const Title = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to Gravity Simulation!</Text>
            <Text style={styles.body}>Let's learn some physics together.</Text>
            <Text style={styles.body}>Press the Earth to begin.</Text>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Simulation')}>
                <Image style={styles.img} source={require('./../../assets/img/planet-13.png')}/>
            </TouchableWithoutFeedback>
            <Image style={styles.img2} source={require('./../../assets/img/socials.png')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCE788",
        alignContent: 'center',
        flex: 1
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3D0007',
        margin: 40,
        alignSelf: 'center',
        textAlign: 'center'
    },
    body: {
        fontSize: 20,
        color: '#F89500',
        alignSelf: 'center'
    },
    img: {
        alignSelf: 'center',
        marginTop: 60,
        width: '50%',
        height: '28%'
    },
    img2: {
        alignSelf: 'center',
        marginTop: 40
    }
});
