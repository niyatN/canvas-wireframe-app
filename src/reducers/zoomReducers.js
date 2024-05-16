const zoomReducer = (zoom, action) => {

    if(action.type === 'zoom_scale_updated') {
        return {
            ...zoom,
            scale: action.scale
        };
    }
    else {
        throw Error('Unknown action: ' + action.type);
    }
}


export default zoomReducer;