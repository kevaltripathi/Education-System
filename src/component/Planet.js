import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Svg, Defs, Line, Path, G} from "react-native-svg";

const rndInt = Math.floor(Math.random() * 4)
const planets = {0: require("./../../assets/img/planet-01.png"), 1: require("./../../assets/img/planet-08.png"), 2: require("./../../assets/img/planet-12.png"), 3: require("./../../assets/img/planet-13.png")}

const Planet = (props) => {
    const {position, velocity, radius, editing} = props;
    const arrow_tip = {x: position.x + velocity.x * 100, y: position.y + velocity.y * 100};
    elements = [
            <Image key="0" source={planets[rndInt]} style={[styles.planet, {
                left: (position.x - radius),
                top: (position.y - radius),
                borderRadius: radius * 2,
                borderColor: editing ? "#26c6da" : "#ccc",
                width: radius * 2,
                height: radius * 2,
            }]}/>
    ]
    if (editing) {
        elements.push(
            <Svg
                key="1"
                height="1000"
                width="1000"
            >
                <G
                    rotation={(Math.atan2(arrow_tip.y - position.y, arrow_tip.x - position.x) * 180 / Math.PI)-135}
                    origin={`${arrow_tip.x}, ${arrow_tip.y}`}
                >
                    <Path d={`M ${arrow_tip.x+8} ${arrow_tip.y+8} L ${arrow_tip.x-10} ${arrow_tip.y+10} L ${arrow_tip.x-8} ${arrow_tip.y-8} z`} fill="#fff" stroke="#fff" />
                </G>

                <Line
                    x1={position.x}
                    y1={position.y}
                    x2={arrow_tip.x}
                    y2={arrow_tip.y}
                    stroke="#fff"
                    strokeWidth="10"
                />
            </Svg>
        );
    }
    return elements;
};

const styles = StyleSheet.create({
    planet: {
        borderWidth: 4,
        position: "absolute"
    }
});

export {Planet};
