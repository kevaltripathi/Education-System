export const planetContains = (planet, position) => {
    let distance = Math.sqrt((position.x - planet.position.x) ** 2 + (position.y - planet.position.y) ** 2);
    return distance < planet.radius;
}