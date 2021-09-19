import React from 'react';
import {GameEngine} from "react-native-game-engine";
import {Planet} from "../component/Planet";
import {createPlanet} from "../systems/createPlanet";

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
                let force = entity.mass * entity2.mass / (distance) ** 2;
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

export const Simulation = () => {
    return (
        <GameEngine
            systems = {[Move, Gravity, createPlanet]}
            entities = {[
                {position: {x: 100, y: 100}, velocity: {x:0, y:-1}, mass: 4, renderer: <Planet/>},
                {position: {x: 300, y: 300}, velocity: {x:0, y:1}, mass: 20, renderer: <Planet/>}
            ]}/>
    );
};
