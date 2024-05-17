export const doubleKeypressThresholdInMilliSeconds = 300;


export const getWidthFromPosition =(startPosition, currentPosition) => {
    return Math.abs(currentPosition.x - startPosition.x);
}

export const getHeightFromPosition =(startPosition, currentPosition) => {
    return Math.abs(currentPosition.y - startPosition.y);
}


export const getTopLeftPosition = (position1, position2) => {
    return {
        x: Math.min(position1.x, position2.x),
        y: Math.min(position1.y, position2.y)
    };
}