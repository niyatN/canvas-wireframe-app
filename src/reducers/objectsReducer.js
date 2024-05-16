export const initialObjects = [];



const objectsReducers = (objects, action) => {
    if (action.type === 'object_added') {
        // id, type, position, width, height, isSelected
        return [
            ...objects,
            {
                id: action.id,
                objectType: action.objectType,
                position: action.position,
                width: action.width,
                height: action.height,
                isSelected: action.isSelected
            }
        ]
    }
    else if (action.type === 'object_deleted') {
        const newObjects = objects.filter((object) => {
            if (action.id === null) {
                return !object.isSelected
            }
            // return object.isSelected || object.id!==id;
            return object.id !== action.id;
        });
        return newObjects;
    }
    else if (action.type === 'object_selected') {
        const newObjects = objects.map((object) => {
            // console.log(object);
            if (object.id === action.id) {
                return { ...object, isSelected: true };
            }
            else {
                return { ...object, isSelected: false };
            }
        })
        return newObjects;
    }
    else if (action.type === 'object_dimension_updated') {
        const newObjects = objects.map((object) => {
            if (object.id !== action.id) {
                return object;
            }
            else {
                return {
                    ...object,
                    width: object.width + action.dw,
                    height: object.height + action.dh
                }
            }
        });

        return newObjects;
    }
    else if(action.type === 'all_object_deselected') {
        const newObjects = objects.map((object) => {
            return {...object, isSelected: false}
        });
        return newObjects;
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}


export default objectsReducers;