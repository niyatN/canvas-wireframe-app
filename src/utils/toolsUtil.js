export const tools = [
    {
        toolType: 'cursor',
        cursorStyle: 'default',
        icon: "fa-solid fa-mouse-pointer",
        isDrawable: false
    },
    {
        toolType: 'rectangle',
        cursorStyle: 'crosshair',
        icon: "fa-regular fa-square",
        isDrawable: true
    },
    {
        toolType: 'textbox',
        cursorStyle: 'crosshair',
        icon: "fa-solid fa-font",
        isDrawable: true
    },
    {
        toolType: 'ellipse',
        cursorStyle: 'crosshair',
        icon: "fa-regular fa-circle",
        isDrawable: true
    },
    {
        toolType: 'drag_object',
        cursorStyle: 'grab',
        icon: "fa-regular fa-hand-pointer",
        isDrawable: false
    }
];

export const getCursorStyle = (toolType) => {
    const tool = tools.find(t => t.toolType === toolType);
    if (tool) {
        return tool.cursorStyle;
    } else {
        throw new Error(`Unknown tool type: ${toolType}`);
    }
};

export const isDrawableTool = (toolType) => {
    const tool = tools.find(t => t.toolType === toolType);
    if (tool) {
        return tool.isDrawable;
    } else {
        return false;
    }
};
