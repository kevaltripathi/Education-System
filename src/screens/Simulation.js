import React, {useState} from 'react';
import {GameEngine} from "react-native-game-engine";
import {Button, StyleSheet, Dimensions, View, Text, SafeAreaView} from "react-native";
import {Icon} from "react-native-elements";
import {Planet} from "../component/Planet";
import {createPlanet} from "../systems/createPlanet";
import {OptionCard} from "../component/OptionCard";
import {LinearGradient} from "expo-linear-gradient";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const metres_per_px = 384400000 / 60;
const initial_time_multiplier = 10;
const G = 6.67e-11;

const Gravity = (entities) => {
    entities.forEach(entity => {
        const x1 = entity.position.x;
        const y1 = entity.position.y;
        entities.forEach((entity2) => {
            const x2 = entity2.position.x;
            const y2 = entity2.position.y;
            if(entity2 !== entity) {
                let distance = Math.sqrt((x2-x1) ** 2 + (y2-y1) ** 2);
                let direction = Math.atan2(x1 - x2, y1 - y2);
                let force = -1 * entity.mass * entity2.mass / (distance) ** 2;
                let accel = force / entity.mass;
                entity.velocity.x += accel * Math.sin(direction);
                entity.velocity.y += accel * Math.cos(direction);
            }
        })
    })
    return entities;
}

const Move = (entities) => {
    entities.forEach((entity) => {
        if(entity.velocity) {
            entity.position.x += (entity.velocity.x);
            entity.position.y += (entity.velocity.y);
        }
    })
    return entities;
}

const Collide = (entities) => {
    entities.forEach((entity) => {
        const x1 = entity.position.x;
        const y1 = entity.position.y;
        entities.forEach((entity2, index) => {
            const x2 = entity2.position.x;
            const y2 = entity2.position.y;
            if (entity2 !== entity) {
                let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                if (distance < entity.radius + entity2.radius - 5) {
                    // combine both entities into one
                    entity.mass += entity2.mass;
                    entity.radius += 2;
                    entities.splice(index, 1); // remove entity2
                }
            }
        });
    });
    return entities;
}

export const Simulation = () => {
    const [paused, setPaused] = useState(false);
    let entities = [
        {
            position: {x: 100, y: 400},
            velocity: {x: 0, y: -0.5},
            mass: 4,
            radius: 20,
            editing: false,
            renderer: <Planet/>,
        },
        {
            position: {x: 150, y: 300},
            velocity: {x: 0, y: 0.5},
            mass: 20,
            radius: 20,
            editing: false,
            renderer: <Planet/>,
        },
    ];
    entities.optionCard = ( {
        mass: 0,
        velocity: 0,
        renderer: <OptionCard style={styles.bottom} />
    } );

    return (
        [
            <LinearGradient
                key={0}
                colors={["rgba(2,0,36,1)", "#203a93"]}
                style={styles.background}
                start={{
                    x: 0.5,
                    y: 0.4,
                }}
                end={{
                    x: 1,
                    y: 1,
                }}
            />,
            <GameEngine key={1}
                        systems={[Move, Gravity, Collide, createPlanet]}
                        entities={entities}
                        running={!paused}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Icon style={styles.topIcon} name={paused ? "play-arrow" : "pause"} onPress={() => {
                            paused ? setPaused(false) : setPaused(true);
                        }}/>
                        <View style={styles.vline}/>
                        <Icon style={styles.topIcon} name="fast-rewind" onPress={() => {
                        }}/>
                        <Text style={styles.topText}>1x</Text>
                        <Icon style={styles.topIcon} name="fast-forward" onPress={() => {
                        }}/>
                    </View>
                </View>
            </GameEngine>,
        ]
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    },
    top: {
        backgroundColor: "#FFF",
        width: WIDTH,
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    bottom: {
        position: "absolute",
        bottom: 0,
    },
    topText: {
        marginLeft: 15,
        marginRight: 15,
        includeFontPadding: false
    },
    vline: {
        backgroundColor: "#CCC",
        borderWidth: 0.5,
        height: "100%",
        marginLeft: 15,
        marginRight: 15
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
});
