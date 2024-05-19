import { getClickedObject } from './../../utils/objectsUtils.js'; 

describe('getClickedObject', () => {
    const objects = [
        { id: '1', position: { x: 10, y: 10 }, width: 30, height: 30 },
        { id: '2', position: { x: 20, y: 20 }, width: 20, height: 20 },
        { id: '3', position: { x: 15, y: 15 }, width: 10, height: 10 }
    ];

    it('should return the innermost object when clicked inside multiple objects', () => {
        const x = 25;
        const y = 25;
        const result = getClickedObject(x, y, objects);
        expect(result).toEqual(objects[2]); 
    });

    it('should return null when clicked outside of any objects', () => {
        const x = 5;
        const y = 5;
        const result = getClickedObject(x, y, objects);
        expect(result).toBeNull();
    });

    it('should return the correct object when clicked inside only one object', () => {
        const x = 12;
        const y = 12;
        const result = getClickedObject(x, y, objects);
        expect(result).toEqual(objects[0]); 
    });

    it('should return null when the objects list is empty', () => {
        const x = 25;
        const y = 25;
        const result = getClickedObject(x, y, []);
        expect(result).toBeNull();
    });

    it('should return the correct object when clicked exactly on the border', () => {
        const x = 15;
        const y = 15;
        const result = getClickedObject(x, y, objects);
        expect(result).toEqual(objects[2]); // Expect the smallest area object to be returned
    });
});
