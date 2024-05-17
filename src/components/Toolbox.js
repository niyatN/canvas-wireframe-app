import React from 'react';

const Toolbox = ({handleSelected, selectedTool, zoomLevel}) => {
  function handleClick(e) {
    e.stopPropagation();
    const selectedTool = e.target.getAttribute('data-tool');
    handleSelected(selectedTool);
  }
  const tools = [
    { name: "cursor", icon: "fas fa-mouse-pointer" },
    { name: "rectangle", icon: "fas fa-square" },
    { name: "textbox", icon: "fas fa-font" }
  ];

  return (
    <div className="toolbox">
      {
        tools.map((tool)=> {
          const className = selectedTool===tool.name? 'tool-button selected':' tool-button'
          return (
            <button key={tool.name} className={className} onClick={handleClick} data-tool={tool.name}>
              <i className={tool.icon}></i>
              {tool.name}
            </button>
          )
        })
      }
      {/* <button>{'Zoom Scale:' + zoomLevel}</button> */}
      <div className="zoom-display">{'Zoom Scale: ' + zoomLevel}</div>
    </div>
  );
}

export default Toolbox;