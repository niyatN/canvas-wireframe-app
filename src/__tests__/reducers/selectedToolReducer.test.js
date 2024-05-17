import selectedToolReducer, { initialSelectedTool } from './../../reducers/selectedToolReducer.js';

describe('selectedToolReducer', () => {


  it('should handle selected_tool_updated', () => {
    const action = {
      type: 'selected_tool_updated',
      tool: 'rectangle'
    };
    expect(selectedToolReducer(initialSelectedTool, action)).toBe('rectangle');
  });

  it('should throw an error for unknown action types', () => {
    const action = {
      type: 'unknown_action'
    };
    expect(() => selectedToolReducer(initialSelectedTool, action)).toThrow('Unknown action: unknown_action');
  });
});