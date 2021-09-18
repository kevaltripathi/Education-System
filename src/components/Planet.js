import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

const RADIUS = 20;

class Planet extends PureComponent {
    render() {
        return (
            <View style={[styles.planet, {
                left: this.props.x - this.props.radius / 2,
                top: this.props.y - this.props.radius / 2,
                backgroundColor: this.props.backgroundColor,
                width: this.props.radius * 2,
                height: this.props.radius * 2,
                borderRadius: this.props.radius * 2,
            }]} />
        );
    }
}

const styles = StyleSheet.create({
    planet: {
        position: "absolute",
    },
});

export { Planet };
