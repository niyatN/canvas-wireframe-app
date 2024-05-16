import { useState } from "react";
const TextBox = ({id, position, width, height, handleClick, handleDelete, isSelected, handleIncreaseObjectHeight}) => {
    const [text, setText] = useState("");
    const handleSelect = (e) => {
        e.stopPropagation();
        handleClick(id);
    }

    const handleChangeTextArea = (e) => {
        setText(e.target.value);

        if(e.target.scrollHeight>e.target.clientHeight) {
            handleIncreaseObjectHeight(id);
        }
    }

    const handleBlur = (e) => {
        if(text.trim()==="") {
            handleDelete(id);
        }
    }


    const outlineStyle = {
        display: 'block',
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        width: width + 'px',
        height: height + 'px',
        border: '2px solid blue',
    };

    return (
        <div style={{ position: 'relative' }}>
        <textarea key={id} id= {id} className='object textbox'
            onChange={handleChangeTextArea}
            onBlur={handleBlur}
            style={{
                left: position.x + 'px',
                top: position.y + 'px',
                width: width + 'px',
                height: height + 'px'
            }}
            onClick={handleSelect}
            autoFocus={isSelected}>

        </textarea>

        {isSelected === true && <div style={outlineStyle}></div>}


    </div>
    )
}


export default TextBox;