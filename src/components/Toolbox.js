import React from 'react';

const Toolbox = ({handleSelected, selectedTool, zoomLevel}) => {
  function handleClick(e) {
    e.stopPropagation();
    const selectedTool = e.target.getAttribute('data-tool');
    handleSelected(selectedTool);
  }
  const tools = [
    { name: "cursor", icon: "fa-solid fa-mouse-pointer" },
    { name: "rectangle", icon: "fa-regular fa-square" },
    { name: "textbox", icon: "fa-solid fa-font" }
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
      <div className="zoom-display"><i className="fa-solid fa-magnifying-glass"></i>{'Zoom Scale: ' + zoomLevel}</div>
    </div>
  );
}

export default Toolbox;