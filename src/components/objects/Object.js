
import { useEffect } from "react";
import TextBox from './TextBox.js';
import Rectangle from './Rectangle.js';


const Object = ({ id, objectType, position, width, height,
     isSelected, handleClick, handleDelete, handleIncreaseObjectHeight }) => {


    const handleKeyDown = (e) => {

        if (e.key === 'Delete') {
            // console.log(e.key);
            handleDelete(null);
        }
    }




    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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
    else {
        throw Error('Unknown Object type: ' + objectType);
    }
}

export default Object