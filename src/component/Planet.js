import React from "react";
import {Image, StyleSheet, View} from "react-native";

const rndInt = Math.floor(Math.random() * 4)
const planets = {0: require("./../../assets/img/planet-01.png"), 1: require("./../../assets/img/planet-08.png"), 2: require("./../../assets/img/planet-12.png"), 3: require("./../../assets/img/planet-13.png")}

const Planet = (props) => {
    const {position, radius} = props;
    return (
        <Image source={planets[rndInt]} style={[styles.planet, {
            left: (position.x - radius),
            top: (position.y - radius),
            borderRadius: radius * 2,
            width: radius * 2,
            height: radius * 2,
        }]}/>
    );
};

const styles = StyleSheet.create({
    planet: {
        borderColor: "#CCC",
        borderWidth: 4,
        backgroundColor: "pink",
        position: "absolute"
    }
});

export {Planet};
