import zoomReducer, { initialZoom } from './../../reducers/zoomReducer.js';

describe('zoomReducer', () => {
    it('should handle zoom_scale_updated', () => {
        const action = {
            type: 'zoom_scale_updated',
            scale: 1.5
        };
        const expectedState = {
            ...initialZoom,
            scale: 1.5
        };
        expect(zoomReducer(initialZoom, action)).toEqual(expectedState);
    });

    it('should handle zoom_in_key_pressed', () => {
        const timestamp = Date.now();
        const action = {
            type: 'zoom_in_key_pressed',
            timestamp
        };
        const expectedState = {
            ...initialZoom,
            lastZoomInKeyPressTime: timestamp
        };
        expect(zoomReducer(initialZoom, action)).toEqual(expectedState);
    });

    it('should handle zoom_out_key_pressed', () => {
        const timestamp = Date.now();
        const action = {
            type: 'zoom_out_key_pressed',
            timestamp
        };
        const expectedState = {
            ...initialZoom,
            lastZoomOutKeyPressTime: timestamp
        };
        expect(zoomReducer(initialZoom, action)).toEqual(expectedState);
    });

    it('should throw an error for unknown action types', () => {
        const action = {
            type: 'unknown_action'
        };
        expect(() => zoomReducer(initialZoom, action)).toThrow(Error('Unknown action: unknown_action'));
    });
});
