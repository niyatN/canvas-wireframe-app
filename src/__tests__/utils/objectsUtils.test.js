import { getClickedObject } from './../../utils/objectsUtils.js'; 

describe('getClickedObject function', () => {
    const objects = [
        { id: 1, position: { x: 0, y: 0 }, width: 100, height: 100 },
        { id: 2, position: { x: 150, y: 150 }, width: 100, height: 100 },
        { id: 3, position: { x: 50, y: 50 }, width: 50, height: 50 },
    ];

    test('returns the innermost object when clicked within its boundaries', () => {
        const clickedObject = getClickedObject(60, 60, objects);
        expect(clickedObject).toEqual(objects[2]);
    });

    test('returns null when clicked outside the boundaries of all objects', () => {
        const clickedObject = getClickedObject(200, 200, objects);
        expect(clickedObject).toBeNull();
    });

    test('returns the innermost object when clicked within the boundaries of multiple objects', () => {
        const clickedObject = getClickedObject(20, 20, objects);
        expect(clickedObject).toEqual(objects[2]); 
    });
});
