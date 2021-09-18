import React, {useState} from "react";
import {StyleSheet, Dimensions, View, Text, SafeAreaView} from "react-native";
import { GameLoop } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

const centerX = WIDTH / 2 - RADIUS;
const centerY = HEIGHT / 2 - RADIUS;

const G = 6.67e-11;
let centerMass = 5.9e24;
const metres_per_px = 384400000 / 60; // pixels

const App = () => {
    const [position, setPosition] = useState({
        x: centerX - 60,
        y: centerY,
        velocity: [0, -0.4],
        mass: 7.3e22,
    });
    const distance = Math.sqrt((centerX-position.x) ** 2 + (centerY-position.y) ** 2);
    const direction = Math.atan2(position.x - centerX, position.y - centerY);

    const updateHandler = ({ touches, screen, layout, time }) => {
        let move = touches.find(x => x.type === "move");
        if (move) {
            setPosition({
                x: position.x + move.delta.pageX,
                y: position.y + move.delta.pageY,
                velocity: position.velocity,
                mass: position.mass,
            });
        }
        else {
            let force = -G * position.mass * centerMass / (distance * metres_per_px) ** 2;
            let accel = force / position.mass;
            let velocity = [
                position.velocity[0] + accel * Math.sin(direction),
                position.velocity[1] + accel * Math.cos(direction),
            ];
            setPosition({
                x: position.x + velocity[0],
                y: position.y + velocity[1],
                velocity: velocity,
                mass: position.mass
            });
        }
    };

    return (
        <GameLoop style={styles.container} onUpdate={updateHandler}>
            <SafeAreaView>
                <Text></Text>
                <Text></Text>
                <Text>The Distance between the planets is: {Math.round(distance)}</Text>
                <Text>velocity: {position.velocity}</Text>
            </SafeAreaView>

            <View style={[styles.player, { left: centerX, top: centerY, backgroundColor: "green" }]} />

            <View style={[styles.player, { left: position.x, top: position.y, backgroundColor: "pink" }]} />
        </GameLoop>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    player: {
        position: "absolute",
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS * 2
    }
});

export default App;
