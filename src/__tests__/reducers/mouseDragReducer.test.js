import mouseDragReducer, { initialMouseDrag } from './../../reducers/mouseDragReducer.js';

describe('mouseDragReducer', () => {

    it('should handle mouse_drag_started', () => {
        const action = {
            type: 'mouse_drag_started',
            isDragging: true,
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 10, y: 10 },
            isDraggingObject: true,
            draggedObjectOffset: { x: 5, y: 5 },
            draggedObjectId: 'object-1'
        };

        const expectedState = {
            isDragging: true,
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 10, y: 10 },
            isDraggingObject: true,
            draggedObjectOffset: { x: 5, y: 5 },
            draggedObjectId: 'object-1'
        };

        const result = mouseDragReducer(initialMouseDrag, action);
        expect(result).toEqual(expectedState);
    });

    it('should handle mouse_drag_ended', () => {
        const initialState = {
            isDragging: true,
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 20, y: 20 },
            isDraggingObject: true,
            draggedObjectId: 'object-1',
            draggedObjectOffset: { x: 5, y: 5 }
        };

        const action = { type: 'mouse_drag_ended' };

        const expectedState = {
            ...initialState,
            isDragging: false,
            isDraggingObject: false,
            draggedObjectId: null,
            draggedObjectOffset: { x: 0, y: 0 }
        };

        const result = mouseDragReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('should handle mouse_drag_continued', () => {
        const initialState = {
            isDragging: true,
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 15, y: 15 },
            isDraggingObject: true,
            draggedObjectId: 'object-1',
            draggedObjectOffset: { x: 5, y: 5 }
        };

        const action = {
            type: 'mouse_drag_continued',
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 25, y: 25 }
        };

        const expectedState = {
            ...initialState,
            startPosition: { x: 10, y: 10 },
            currentPosition: { x: 25, y: 25 }
        };

        const result = mouseDragReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('should throw an error for unknown action type', () => {
        expect(() => {
            mouseDragReducer(initialMouseDrag, { type: 'unknown_action' });
        }).toThrow('Unknown action: unknown_action');
    });
});
