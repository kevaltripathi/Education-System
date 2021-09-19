import React from "react";
import {StyleSheet, View} from "react-native";

const RADIUS = 20;

const Planet = (props) => {
    return (
        <View style={[styles.planet, {
            left: props.x - props.radius / 2,
            top: props.y - props.radius / 2,
            backgroundColor: props.backgroundColor,
            width: props.radius * 2,
            height: props.radius * 2,
            borderRadius: props.radius * 2,
        }]}/>
    );
}

const styles = StyleSheet.create({
    planet: {
        position: "absolute",
    },
});

export {Planet};
