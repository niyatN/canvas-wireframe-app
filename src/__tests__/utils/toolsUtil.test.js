import { tools,getCursorStyle } from './../../utils/toolsUtil';

describe('getCursorStyle', () => {
    it('should return the correct cursor style for a known tool type', () => {
        tools.forEach(tool => {
            expect(getCursorStyle(tool.toolType)).toBe(tool.cursorStyle);
        });
    });

    it('should throw an error for an unknown tool type', () => {
        expect(() => getCursorStyle('unknownTool')).toThrow('Unknown tool type: unknownTool');
    });
});
