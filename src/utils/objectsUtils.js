export const getClickedObject = (x, y, objects) => {
    let innermostObject = null;
    let smallestArea = Number.MAX_SAFE_INTEGER;
    objects.forEach(object => {
        const withinBounds =
            x >= object.position.x &&
            x <= object.position.x + object.width &&
            y >= object.position.y &&
            y <= object.position.y + object.height;

        if (withinBounds) {
            const area = object.width * object.height;
            if (area < smallestArea) {
                innermostObject = object;
                smallestArea = area;
            }
        }
    });

    return innermostObject;
}