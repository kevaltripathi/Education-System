import React, {useState} from "react";
import {Button, StyleSheet, Dimensions, View, Text, SafeAreaView} from "react-native";
import {Icon} from "react-native-elements";
import { GameLoop } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

const centerX = WIDTH / 2 - RADIUS;
const centerY = HEIGHT / 2 - RADIUS;

const G = 6.67e-11;
let centerMass = 5.9e24;
const metres_per_px = 384400000 / 60; // pixels

const initial_time_multiplier = 10;

const Simulation = () => {
    const [state, setState] = useState({
        x_offset: 0,
        y_offset: 0,
        time_multiplier: initial_time_multiplier,
        paused: false,
        objects: [
            {
                x: centerX - 60,
                y: centerY,
                mass: 7.3e22,
                velocity: [0, -0.4 * initial_time_multiplier],
            },
            {
                x: centerX,
                y: centerY,
                mass: 5.9e24,
                velocity: [0, 0.0 * initial_time_multiplier],
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

        new_objects = state.objects.map(object => {
            x = object.x;
            y = object.y;
            velocity = object.velocity;
            if (!state.paused) {
                for (object2 of state.objects) {
                    if (object2 !== object) {
                        let distance = Math.sqrt((object2.x-object.x) ** 2 + (object2.y-object.y) ** 2);
                        let direction = Math.atan2(object.x - object2.x, object.y - object2.y);
                        let force = -G * object.mass * object2.mass / (distance * metres_per_px) ** 2;
                        let accel = force / object.mass * state.time_multiplier ** 2;
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
            } else {
                return {
                    x: x_offset + object.x,
                    y: y_offset + object.y,
                    velocity: velocity,
                    mass: object.mass
                };
            }
        });
        setState({
            x_offset: x_offset,
            y_offset: y_offset,
            time_multiplier: state.time_multiplier,
            paused: state.paused,
            objects: new_objects,
        });
    };

    const changeSpeed = ( new_speed ) => {
        setState({
            x_offset: state.x_offset,
            y_offset: state.y_offset,
            time_multiplier: new_speed,
            objects: state.objects.map(object => {return {
                x: object.x,
                y: object.y,
                mass: object.mass,
                velocity: object.velocity.map(component => (component / state.time_multiplier * new_speed)),
            }})
        })
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

            <SafeAreaView style={styles.bottom}>
                <Icon style={styles.bottomIcon} name="play-arrow" onPress={() => {state.paused = !state.paused}} />
                <View style={styles.vline} />
                <Icon style={styles.bottomIcon} name="fast-rewind" onPress={() => {if (state.time_multiplier > 1) changeSpeed(state.time_multiplier - 1)}} />
                <Text style={styles.bottomText}>{state.time_multiplier}x</Text>
                <Icon style={styles.bottomIcon} name="fast-forward" onPress={() => {changeSpeed(state.time_multiplier + 1)}} />
            </SafeAreaView>
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
    },
    bottom: {
        position: "absolute",
        width: WIDTH,
        display: "flex",
        flexDirection: "row",
        bottom: 0,
        padding: 10,
    },
    bottomIcon: {
        height: 30,
        width: 30,
    },
    bottomText: {
        marginLeft: 15,
        marginRight: 15,
    },
    vline: {
        width: 1,
        backgroundColor: "#555",
        marginLeft: 15,
        marginRight: 15,
    }
});

export {Simulation};
