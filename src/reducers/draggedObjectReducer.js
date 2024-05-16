export const initialDraggedObject = null;


const draggedObjectReducer = (draggedObject, action ) => {

    if(action.type === 'dragged_object_created') {
        return  {
            ...draggedObject,
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
    if(action.type === 'dragged_object_updated') {
        const position = {
            x: Math.min(draggedObject.startPosition.x, draggedObject.currentPosition.x),
            y: Math.min(draggedObject.startPosition.y, draggedObject.currentPosition.y)
        };
        const width = Math.abs(draggedObject.currentPosition.x - draggedObject.startPosition.x);
        const height = Math.abs(draggedObject.currentPosition.y - draggedObject.startPosition.y);
        return  {
            ...draggedObject,
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
    if(action.type === 'dragged_object_unset') {
        return  null;
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}

export default draggedObjectReducer