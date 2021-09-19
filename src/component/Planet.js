import React from "react";
import {Image, StyleSheet, View} from "react-native";

const RADIUS = 20;

const Planet = (props) => {
    const {position} = props;
    return (
        <Image source={require('./../../assets/img/planet-08.png')} style={[styles.planet, {left: (position.x - RADIUS), top: (position.y - RADIUS)}]}/>
    );
};

const styles = StyleSheet.create({
    planet: {
        borderColor: "#CCC",
        borderWidth: 4,
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "pink",
        position: "absolute"
    }
});

export {Planet};
