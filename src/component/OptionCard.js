import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import { Slider } from 'react-native-elements';

const OptionCard = () => {
    const [mass, setMass] = useState(0);
    const [velocity, setVelocity] = useState(0);
    return (
        <View style={styles.card}>
            <View style={styles.outer}>
                <View style={[styles.inner, {marginRight: 20}]}>
                    <Text style={{textAlign: "center"}}>Mass: {mass}</Text>
                    <Slider
                        style={{margin: -5}}
                        value={mass}
                        onValueChange={value => setMass(value)}
                        thumbStyle={{ height: 10, width: 10, backgroundColor: 'green' }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                    />
                </View>
                <View style={[styles.inner, {marginLeft: 20}]}>
                    <Text style={{textAlign: "center"}}>Velocity: {velocity}</Text>
                    <Slider
                        style={{margin: -5}}
                        value={velocity}
                        onValueChange={value => setVelocity(value)}
                        thumbStyle={{ height: 10, width: 10, backgroundColor: 'orange' }}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingHorizontal: 25,
        backgroundColor: "white",
    },
    outer: {
        flexDirection: "row"
    },
    inner: {
        flex: 1,
        alignContent: "center"
    }
});

export {OptionCard};
