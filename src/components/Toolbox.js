import React from 'react';

const Toolbox = ({handleSelected, selectedTool, zoomLevel}) => {
  function handleClick(e) {

    const button = e.target.closest('[data-tool]');
    if (button) {
      const selectedTool = button.getAttribute('data-tool');
      handleSelected(selectedTool);
    }
  }
  const tools = [
    { name: "cursor", icon: "fa-solid fa-mouse-pointer" },
    { name: "rectangle", icon: "fa-regular fa-square" },
    { name: "textbox", icon: "fa-solid fa-font" },
    { name: "ellipse", icon: "fa-regular fa-circle" }
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
      <div className="zoom-display"><i className="fa-solid fa-magnifying-glass"></i>{'Zoom Scale: ' + zoomLevel}</div>
    </div>
  );
}

export default Toolbox;