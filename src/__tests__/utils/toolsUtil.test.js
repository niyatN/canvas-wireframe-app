import { tools,getCursorStyle, isDrawableTool } from './../../utils/toolsUtil';

describe('toolsUtil', () => {
    test('should return correct cursor style for a given tool type', () => {
        tools.forEach(tool => {
            expect(getCursorStyle(tool.toolType)).toBe(tool.cursorStyle);
        });
    });

    test('should throw an error for an unknown tool type in getCursorStyle', () => {
        expect(() => getCursorStyle('unknown')).toThrow('Unknown tool type: unknown');
    });

    test('should return correct isDrawable for a given tool type', () => {
        tools.forEach(tool => {
            expect(isDrawableTool(tool.toolType)).toBe(tool.isDrawable);
        });
    });

    test('should return false for an unknown tool type in isDrawableTool', () => {
        expect(isDrawableTool('cursor')).toBe(false);
    });
});
