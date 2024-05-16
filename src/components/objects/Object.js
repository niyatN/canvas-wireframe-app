
import { useState, useEffect } from "react";
import TextBox from './TextBox.js';
import Rectangle from './Rectangle.js';


const Object = ({ id, objectType, position, width, height, isSelected, handleClick, handleDelete, handleIncreaseObjectHeight }) => {

    const handleSelect = (e) => {
        e.stopPropagation();
        handleClick(id);
    }

    const handleChangeTextArea = (e) => {
        console.log(e.target.value);

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



    const handleKeyDown = (e) => {

        if (e.key === 'Delete') {
            // console.log(e.key);
            handleDelete(null);
        }
    }

    const handleTextChange = (e) => {
        // console.log("===---===");
        console.log(e.target.value);
        if (e.target.value.trim() === '') {
            // If empty and unselected, delete the object
            handleDelete(id);
        }
    };


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // const className = isSelected ? `object ${type} ` : `object ${type}`;
    if (objectType === 'rectangle') {

        return (
            <Rectangle id={id}
                position={position}
                width={width}
                height={height}
                handleClick={handleClick}
                handleDelete={handleDelete}
                isSelected={isSelected}
            />
        );
    }
    else if (objectType === 'textbox') {
        return (
            <TextBox id={id}
                position={position}
                width={width}
                height={height}
                handleClick={handleClick}
                handleDelete={handleDelete}
                isSelected={isSelected}
                handleIncreaseObjectHeight={handleIncreaseObjectHeight} />
        )
    }
    // Should be replaced with error 
    // throw Error('Unknown Object type: ' + type);
    else {
        return null;
    }
}

export default Object