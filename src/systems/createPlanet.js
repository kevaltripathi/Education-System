import {Planet} from "../component/Planet";
import React from "react";

export const createPlanet = (entities, {touches}) => {
    touches.filter(t => t.type === "press").forEach(t => {
        const position = {x: t.event.pageX, y: t.event.pageY};
        entities[entities.length] = {position: position, velocity: {x:0, y:0}, mass:20, radius:20, renderer: <Planet />};
    });
    return entities;
};
