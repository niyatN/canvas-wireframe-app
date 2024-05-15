

const Rectangle = ({id, position, width, height, handleClick, isSelected}) => {
    const handleSelect = (e) => {
        e.stopPropagation();
        handleClick(id);
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

    return (<div style={{ position: 'relative' }}>
        <div key={id} className='object rectangle'
            style={{
                left: position.x + 'px',
                top: position.y + 'px',
                width: width + 'px',
                height: height + 'px'
            }}
            onClick={handleSelect}>


        </div>

        {isSelected === true && <div style={outlineStyle}></div>}


    </div>);
}


export default Rectangle;