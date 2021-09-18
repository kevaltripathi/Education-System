import React, {useState} from "react";
import {StyleSheet, Dimensions, View, Text, SafeAreaView} from "react-native";
import { GameLoop } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

const centerX = WIDTH / 2 - RADIUS;
const centerY = HEIGHT / 2 - RADIUS;

const App = () => {
    const [position, setPosition] = useState({x: centerX, y: centerY});

    const updateHandler = ({ touches, screen, layout, time }) => {
        let move = touches.find(x => x.type === "move");
        if (move) {
            setPosition({
                x: position.x + move.delta.pageX,
                y: position.y + move.delta.pageY
            });
        }
    };

    return (
        <GameLoop style={styles.container} onUpdate={updateHandler}>
            <SafeAreaView>
                <Text>The Distance between the planets is: {Math.round(Math.sqrt((centerX-position.x) ** 2 + (centerY-position.y) ** 2))}</Text>
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
