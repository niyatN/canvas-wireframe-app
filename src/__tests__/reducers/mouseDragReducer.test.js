import mouseDragReducer, { initialMouseDrag } from './../../reducers/mouseDragReducer.js';

describe('mouseDragReducer', () => {
    
    it('should handle mouse_drag_started', () => {
        const action = {
            type: 'mouse_drag_started',
            isDragging: true,
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 10, y: 20 }
        };
        const expectedState = {
            ...initialMouseDrag,
            isDragging: true,
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 10, y: 20 }
        };
        expect(mouseDragReducer(initialMouseDrag, action)).toEqual(expectedState);
    });

    it('should handle mouse_drag_ended', () => {
        const action = {
            type: 'mouse_drag_ended',
            isDragging: false
        };
        const currentState = {
            isDragging: true,
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 30, y: 40 }
        };
        const expectedState = {
            ...currentState,
            isDragging: false
        };
        expect(mouseDragReducer(currentState, action)).toEqual(expectedState);
    });

    it('should handle mouse_drag_continued', () => {
        const action = {
            type: 'mouse_drag_continued',
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 30, y: 40 }
        };
        const currentState = {
            isDragging: true,
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 15, y: 25 }
        };
        const expectedState = {
            ...currentState,
            startPosition: { x: 10, y: 20 },
            currentPosition: { x: 30, y: 40 }
        };
        expect(mouseDragReducer(currentState, action)).toEqual(expectedState);
    });

    it('should throw an error for unknown action types', () => {
        const action = {
            type: 'unknown_action'
        };
        expect(() => mouseDragReducer(initialMouseDrag, action)).toThrow(Error('Unknown action: unknown_action'));
    });
});
