import React from 'react';

const Toolbox = ({handleSelected, selectedTool, zoomLevel}) => {
  function handleClick(e) {
    const selectedTool = e.target.getAttribute('data-tool');
    handleSelected(selectedTool);
  }
  const tools = ["cursor", "rectangle", "textbox"]
  return (
    <div className="toolbox">
      {
        tools.map((tool)=> {
          const className = selectedTool===tool? 'selected':'non-selected'
          return (
            <button key={tool} className={className} onClick={handleClick} data-tool={tool}>
              {tool}
            </button>
          )
        })
      }
     
      <button>{'Zoom:' + zoomLevel}</button>
      
      

    </div>
  );
}

export default Toolbox;