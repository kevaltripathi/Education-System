import React from "react";
import {Image, StyleSheet, View} from "react-native";

const RADIUS = 20;
const rndInt = Math.floor(Math.random() * 4)
const planets = {0: require("./../../assets/img/planet-01.png"), 1: require("./../../assets/img/planet-08.png"), 2: require("./../../assets/img/planet-12.png"), 3: require("./../../assets/img/planet-13.png")}

const Planet = (props) => {
    const {position} = props;
    return (
        <Image source={planets[rndInt]} style={[styles.planet, {left: (position.x - RADIUS), top: (position.y - RADIUS)}]}/>
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
