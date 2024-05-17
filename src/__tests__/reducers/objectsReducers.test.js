import objectsReducers, { initialObjects } from './../../reducers/objectsReducer.js';

describe('objectsReducers', () => {
    it('should handle object_added', () => {
        const action = {
            type: 'object_added',
            id: '1',
            objectType: 'rectangle',
            position: { x: 10, y: 20 },
            width: 100,
            height: 200,
            isSelected: true
        };
        const expectedState = [
            {
                id: '1',
                objectType: 'rectangle',
                position: { x: 10, y: 20 },
                width: 100,
                height: 200,
                isSelected: true
            }
        ];
        expect(objectsReducers(initialObjects, action)).toEqual(expectedState);
    });

    it('should handle object_deleted by id', () => {
        const currentState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: true },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        const action = { type: 'object_deleted', id: '1' };
        const expectedState = [
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        expect(objectsReducers(currentState, action)).toEqual(expectedState);
    });

    it('should handle object_deleted by deselecting all', () => {
        const currentState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: true },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        const action = { type: 'object_deleted', id: null };
        const expectedState = [
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        expect(objectsReducers(currentState, action)).toEqual(expectedState);
    });

    it('should handle object_selected', () => {
        const currentState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: false },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        const action = { type: 'object_selected', id: '1' };
        const expectedState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: true },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        expect(objectsReducers(currentState, action)).toEqual(expectedState);
    });

    it('should handle object_dimension_updated', () => {
        const currentState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: false }
        ];
        const action = { type: 'object_dimension_updated', id: '1', dw: 10, dh: 20 };
        const expectedState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 110, height: 220, isSelected: false }
        ];
        expect(objectsReducers(currentState, action)).toEqual(expectedState);
    });

    it('should handle all_object_deselected', () => {
        const currentState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: true },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: true }
        ];
        const action = { type: 'all_object_deselected' };
        const expectedState = [
            { id: '1', objectType: 'rectangle', position: { x: 10, y: 20 }, width: 100, height: 200, isSelected: false },
            { id: '2', objectType: 'circle', position: { x: 30, y: 40 }, width: 50, height: 50, isSelected: false }
        ];
        expect(objectsReducers(currentState, action)).toEqual(expectedState);
    });

    it('should throw an error for unknown action types', () => {
        const action = { type: 'unknown_action' };
        expect(() => objectsReducers(initialObjects, action)).toThrow(Error('Unknown action: unknown_action'));
    });
});
