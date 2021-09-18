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

const time_multiplier = 10;

const Simulation = () => {
    const [state, setState] = useState({
        x_offset: 0,
        y_offset: 0,
        objects: [
            {
                x: centerX - 60,
                y: centerY,
                mass: 7.3e22,
                velocity: [0, -0.4 * time_multiplier],
            },
            {
                x: centerX,
                y: centerY,
                mass: 5.9e24,
                velocity: [0, 0.0 * time_multiplier],
            }
        ]
    });

    const updateHandler = ({ touches, screen, layout, time }) => {
        let move = touches.find(x => x.type === "move");
        let x_offset = 0;
        let y_offset = 0;
        if (move) {
            x_offset = move.delta.pageX,
                y_offset = move.delta.pageY;
        }

        let new_objects = state.objects.map(object => {
            x = object.x;
            y = object.y;
            velocity = object.velocity;
            for (object2 of state.objects) {
                if (object2 !== object) {
                    let distance = Math.sqrt((object2.x-object.x) ** 2 + (object2.y-object.y) ** 2);
                    let direction = Math.atan2(object.x - object2.x, object.y - object2.y);
                    let force = -G * object.mass * object2.mass / (distance * metres_per_px) ** 2;
                    let accel = force / object.mass * time_multiplier ** 2;
                    velocity = [
                        velocity[0] + accel * Math.sin(direction),
                        velocity[1] + accel * Math.cos(direction),
                    ];
                }
            }
            return {
                x: x_offset + object.x + velocity[0],
                y: y_offset + object.y + velocity[1],
                velocity: velocity,
                mass: object.mass
            };
        });
        setState({
            x_offset: x_offset,
            y_offset: y_offset,
            objects: new_objects,
        });
    };

    return (
        <GameLoop style={styles.container} onUpdate={updateHandler}>
            <SafeAreaView>
                <Text></Text>
                <Text></Text>
                <Text>The Distance between the planets is: {Math.round(Math.sqrt((state.objects[0].x-state.objects[1].x) ** 2 + (state.objects[0].y-state.objects[1].y) ** 2))}</Text>
                <Text>velocity0: {state.objects[0].velocity}</Text>
                <Text>velocity1: {state.objects[1].velocity}</Text>
            </SafeAreaView>

            <View style={[styles.player, { left: state.objects[1].x, top: state.objects[1].y, backgroundColor: "green" }]} />

            <View style={[styles.player, { left: state.objects[0].x, top: state.objects[0].y, backgroundColor: "pink" }]} />
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

export {Simulation};
