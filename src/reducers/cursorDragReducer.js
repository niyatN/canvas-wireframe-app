export const initialCursorDrag = null;


const cursorDragReducer = (cursorDrag, action ) => {

    if(action.type === 'cursor_drag_created') {
        return  {
            ...cursorDrag,
            id: action.id,
            objectType: action.objectType,
            startPosition: action.startPosition,
            currentPosition: action.currentPosition,
            position: action.startPosition,
            width: 0,
            height: 0,
            isSelected: action.isSelected
        }
    }
    if(action.type === 'cursor_drag_updated') {
        const position = {
            x: Math.min(cursorDrag.startPosition.x, cursorDrag.currentPosition.x),
            y: Math.min(cursorDrag.startPosition.y, cursorDrag.currentPosition.y)
        };
        const width = Math.abs(cursorDrag.currentPosition.x - cursorDrag.startPosition.x);
        const height = Math.abs(cursorDrag.currentPosition.y - cursorDrag.startPosition.y);
        return  {
            ...cursorDrag,
            id: action.id,
            objectType: action.objectType,
            startPosition: action.startPosition,
            currentPosition: action.currentPosition,
            position: position,
            width: width,
            height: height,
            isSelected: action.isSelected
        }
    }
    if(action.type === 'cursor_drag_ended') {
        return  null;
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}

export default cursorDragReducer;