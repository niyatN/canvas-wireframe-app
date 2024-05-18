import React from 'react';

const Ellipse = ({ id, position, width, height, handleClick, isSelected }) => {
    const handleSelect = (e) => {
        e.stopPropagation();
        handleClick(id);
    };

    const outlineStyle = {
        display: 'block',
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        width: width + 'px',
        height: height + 'px',
        border: '2px solid blue',
        borderRadius: '50%', 
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                key={id}
                className='object ellipse'
                style={{
                    left: position.x + 'px',
                    top: position.y + 'px',
                    width: width + 'px',
                    height: height + 'px',
                    borderRadius: '50%', // Make it a circle by setting border radius to half of width and height
                }}
                onClick={handleSelect}>
            </div>

            {isSelected === true && <div style={outlineStyle}></div>}
        </div>
    );
};

export default Ellipse;
