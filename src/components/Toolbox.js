import React from 'react';
import { tools } from './../utils/toolsUtil';

const Toolbox = ({handleSelected, selectedTool, zoomLevel}) => {
  const handleClick = (e) => {

    const button = e.target.closest('[data-tool]');
    if (button) {
      const selectedTool = button.getAttribute('data-tool');
      handleSelected(selectedTool);
    }
  }

  return (
    <div className="toolbox">
      {
        tools.map((tool)=> {
          const className = selectedTool===tool.toolType? 'tool-button selected':' tool-button'
          return (
            <button key={tool.toolType} 
                    className={className} 
                    onClick={handleClick} 
                    title={tool.toolType} 
                    data-tool={tool.toolType}>
              <i className={tool.icon}></i>
            </button>
          )
        })
      }
      <div className="zoom-display"><i className="fa-solid fa-magnifying-glass"></i>{'Zoom Scale: ' + zoomLevel}</div>
    </div>
  );
}

export default Toolbox;