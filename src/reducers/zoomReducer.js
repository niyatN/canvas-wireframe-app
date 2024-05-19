export const initialZoom = {
    scale: 1.0,
    lastZoomInKeyPressTime: null,
    lastZoomOutKeyPressTime: null
};

const zoomReducer = (zoom, action) => {

    if (action.type === 'zoom_scale_updated') {
        return {
            ...zoom,
            scale: action.scale
        };
    }
    else if (action.type === 'zoom_in_key_pressed') {
        return {
            ...zoom,
            lastZoomInKeyPressTime: action.timestamp
        };
    }
    else if (action.type === 'zoom_out_key_pressed') {
        return {
            ...zoom,
            lastZoomOutKeyPressTime: action.timestamp
        };
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}


export default zoomReducer;