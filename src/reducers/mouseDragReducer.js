export const initialMouseDrag = {
    isDragging: false,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 }
}

const mouseDragReducer = (mouseDrag, action) => {
    if (action.type === 'mouse_drag_started') {
        return {
            ...mouseDrag,
            isDragging: action.isDragging,
            startPosition: action.startPosition,
            currentPosition: action.currentPosition
        }
    }
    else if (action.type === 'mouse_drag_ended') {
        return {
            ...mouseDrag,
            isDragging: action.isDragging
        }
    }
    else if (action.type === 'mouse_drag_continued') {
        
        return {
            ...mouseDrag,
            currentPosition: action.currentPosition
        }
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}

export default mouseDragReducer;