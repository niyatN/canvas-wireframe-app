// Canvas.js

import React, { useState, useRef , useEffect} from 'react';
import Object from './Object';
import './../styles/Canvas.css'; 
import { v4 as uuidv4 } from 'uuid';
import Toolbox from './Toolbox';

function Canvas() {
    const canvasRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const [objects, setObjects] = useState([]);
    const [selectedTool, setSelectedTool] = useState('cursor');
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);

    const [pinchStartDistance, setPinchStartDistance] = useState(0);
    const [pinchStartZoom, setPinchStartZoom] = useState(1);
    const clearIsSelected = () => {
        const newObjects = objects.map((object) => {
            return {...object, isSelected: false}
        });
        setObjects(newObjects);
    }


    const increaseObjectHeight = (id) => {
        const newObjects = objects.map((object) => {
            
            if(object.id!==id) {
                return  object;
            }
            else {
                // console.log(object.height);
                // console.log({...object, height:  object.height + 10});
                // const newHeight = object.height + 10;
                return {...object, height:  object.height + 10}
            }
        });
        
        setObjects(newObjects);
    }



    const handleTouchStart = (e) => {
        console.log("touch1 start")
        console.log(e.touches[0]);
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            setPinchStartDistance(distance);
            setPinchStartZoom(zoomLevel);
        }
    };

    const handleTouchMove = (e) => {
        console.log("touch move")
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            const scale = distance / pinchStartDistance;
            setZoomLevel(pinchStartZoom * scale);
        }
    };

    const handleTouchEnd = () => {
        setPinchStartDistance(0);
    };

    const handleZoom = (e, zoomDelta)=> {
        if(zoomLevel>=2.5 && zoomDelta>0) {
            alert(`Maximum zoom threshold is reached!`);
            return;
        }
        if(zoomLevel<=0.1 && zoomDelta<0) {
            alert(`Minimum zoom threshold is reached!`);
            return;
        }
        const canvas = canvasRef.current;
        const boundingRect = canvas.getBoundingClientRect();
        const cursorX = e.clientX - boundingRect.left;
        const cursorY = e.clientY - boundingRect.top;

       
        const newZoomLevel =  
            Math.round((zoomLevel + zoomDelta) * 10)/10;
        

        
        setZoomLevel(newZoomLevel);

        const scaleFactor = newZoomLevel / zoomLevel;
        canvas.scrollTo({
            left: cursorX * scaleFactor - e.clientX,
            top: cursorY * scaleFactor - e.clientY,
            behavior: 'smooth',
        });
        
    };
    const handleKeyPress = (e) => {
        // console.log(e.key);
        // console.log(e.ctrlKey);
        
        if (e.key === '=' && e.ctrlKey) {
   
                handleZoom(e, 0.1);

        }
        else if (e.key === '-' && e.ctrlKey) {
            
                handleZoom(e, -0.1);
            
        }
        else if (e.key === '=') {
            const currentTime = Date.now();
            if ( lastKeyPressTime && currentTime - lastKeyPressTime <= 300) {
                handleZoom(e, 0.1);
            }
            setLastKeyPressTime(currentTime);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [zoomLevel, lastKeyPressTime]);

    const getSelectedObject = () => {
        let id = objects.filter((object)=>object.isSelected).find(()=>true);
    }
    const handleDelete = (id) => {
        const newObjects = objects.filter((object) => {
            if(id===null) {
                return !object.isSelected
            }
            // return object.isSelected || object.id!==id;
            return object.id!==id;
        });
        setObjects(newObjects);
    }

   

    const handleSelected = (tool) => {
        setSelectedTool(tool);
    }

    const handleClick = (id) => {
        // console.log(id)
        const newObjects = objects.map((object) => {
            // console.log(object);
            if (object.id === id) {
                return { ...object, isSelected: true };
            }
            else {
                return { ...object, isSelected: false };
            }
        })
        setObjects(newObjects);
    }



    const addObject = (id, type, position, width, height, isSelected) => {
        if (type !== 'cursor') {


            setObjects([...objects, { id, type, position, width, height, isSelected }]);
        }
    };

    const handleMouseDown = (e) => {
        
        clearIsSelected();
        setDragging(true);
        const boundingRect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - boundingRect.left) / zoomLevel;
        const y = (e.clientY - boundingRect.top) / zoomLevel;
        setStartPosition({ x, y });
        setCurrentPosition({ x, y });
    };

    const handleMouseMove = (e) => {
     

        if (dragging) {
            const boundingRect = canvasRef.current.getBoundingClientRect();
            const x = (e.clientX - boundingRect.left) / zoomLevel;
            const y = (e.clientY - boundingRect.top) / zoomLevel;
            setCurrentPosition({ x, y });
          }
    };








    const handleMouseUp = () => {
        

        setDragging(false);
        const width = Math.abs(currentPosition.x - startPosition.x);
        const height = Math.abs(currentPosition.y - startPosition.y);
        if (width > 0 && height > 0) {
            const position = {
            x: Math.min(startPosition.x, currentPosition.x),
            y: Math.min(startPosition.y, currentPosition.y)
            };

            addObject(uuidv4(), selectedTool, position, width, height, true);
        }
    };
    const cursorStyle = () => {

        if (selectedTool === 'rectangle') {
            return 'crosshair';
        }
        else if (selectedTool === 'textbox') {
            return 'crosshair';
        }
        else {
            return 'default';
        }

    }
    // console.log(objects);
    return (
        <div className="canvas-container" >
            <div className="canvas"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    cursor: cursorStyle(),
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: '0 0',
                }}>
                {
                    objects.map((object) =>
                    (<Object key={object.id} id={object.id}
                        type={object.type}
                        position={object.position}
                        width={object.width}
                        height={object.height}
                        isSelected={object.isSelected}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                        handleIncreaseObjectHeight={increaseObjectHeight}
                    />)
                    )
                }
            </div>

            <Toolbox handleSelected={handleSelected} selectedTool={selectedTool}
            zoomLevel={zoomLevel} />
        </div>
    );
}

export default Canvas;
