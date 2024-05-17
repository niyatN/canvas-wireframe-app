export const initialSelectedTool = 'cursor';

const selectedToolReducer = (tool, action) => {
    if (action.type === 'selected_tool_updated') {
        return action.tool;
    }

    else {
        throw Error('Unknown action: ' + action.type);
    }
}



export default selectedToolReducer;