import {Planet} from "../component/Planet";
import {planetContains, absSpeed} from "../util";
import React from "react";

export const createPlanet = (entities, {touches}) => {
    touches.filter(t => t.type === "press").forEach(t => {
        const position = {x: t.event.pageX, y: t.event.pageY};
        let containingPlanet = entities.find(entity => (planetContains(entity, position)));
        if (containingPlanet === undefined) {
            // no planet where the user touched, so create a new one
            entities[entities.length] = {
                position: position,
                velocity: {x: 0, y: 0},
                mass: 20,
                radius: 20,
                editing: false,
                renderer: <Planet />
            };
        } else {
            containingPlanet.editing = !containingPlanet.editing;
            entities.forEach(entity => {
                if (entity !== containingPlanet) {
                    entity.editing = false;
                }
            })
            entities.optionCard.mass = containingPlanet.mass;
            entities.optionCard.velocity = absSpeed(containingPlanet.velocity);
        }
    });
    return entities;
};
