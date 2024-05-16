export const initialSelectedTool = 'cursor';

const selectedToolReducer = (tool, action) => {
    if (action.type === 'seleted_tool_updated') {
        // console.log(tool);
        // console.log(action.tool);
        return action.tool;
    }

    else {
        throw Error('Unknown action: ' + action.type);
    }
}



export default selectedToolReducer;