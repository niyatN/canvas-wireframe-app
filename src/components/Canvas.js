// Canvas.js

import React, { useState, useRef, useEffect, useReducer } from 'react';
import Object from './objects/Object';
import './../styles/Canvas.css';
import { v4 as uuidv4 } from 'uuid';
import Toolbox from './Toolbox';
import objectReducer from './../reducers/objectsReducers.js';

function Canvas() {
    const canvasRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const [objects, objectsDispatch] = useReducer(objectReducer, []);
    const [selectedTool, setSelectedTool] = useState('cursor');
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [lastKeyPressTime, setLastKeyPressTime] = useState(null);

    const [pinchStartDistance, setPinchStartDistance] = useState(0);
    const [pinchStartZoom, setPinchStartZoom] = useState(1);

    const unselectAllObjects = () => {
        objectsDispatch({
            type: 'all_object_deselected'
        });
    }


    const increaseObjectHeight = (id) => {
        objectsDispatch(
            {
                type: 'object_dimension_updated',
                id: id,
                dw: 0,
                dh: 10
            }
        );
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

    const handleZoom = (e, zoomDelta) => {
        if (zoomLevel >= 2.5 && zoomDelta > 0) {
            alert(`Maximum zoom threshold is reached!`);
            return;
        }
        if (zoomLevel <= 0.1 && zoomDelta < 0) {
            alert(`Minimum zoom threshold is reached!`);
            return;
        }
        const canvas = canvasRef.current;
        const boundingRect = canvas.getBoundingClientRect();
        const cursorX = e.clientX - boundingRect.left;
        const cursorY = e.clientY - boundingRect.top;


        const newZoomLevel =
            Math.round((zoomLevel + zoomDelta) * 10) / 10;



        
        setZoomLevel(newZoomLevel);

        const scaleFactor = newZoomLevel / zoomLevel;
        canvas.scrollTo({
            left: cursorX * scaleFactor - e.clientX,
            top: cursorY * scaleFactor - e.clientY,
            behavior: 'smooth',
        });
        
    };

    const handleKeyPress = (e) => {
        // used '=' for '+' 
        if (e.key === '=' && e.ctrlKey) {

            handleZoom(e, 0.1);

        }
        else if (e.key === '-' && e.ctrlKey) {

            handleZoom(e, -0.1);

        }
        else if (e.key === '=') {
            const currentTime = Date.now();
            if (lastKeyPressTime && currentTime - lastKeyPressTime <= 300) {
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

    const handleDelete = (id) => {
        objectsDispatch({
            type: 'object_deleted',
            id: id
        });
    }



    const handleSelected = (tool) => {
        setSelectedTool(tool);
    }

    const handleClick = (id) => {


        objectsDispatch({
            type: 'object_selected',
            id: id
        });
    }



    const addObject = (id, objectType, position, width, height, isSelected) => {

        if (objectType !== 'cursor') {
            objectsDispatch({

                type: 'object_added',
                objectType: objectType,
                id: id,
                position: position,
                width: width,
                height: height,
                isSelected: isSelected
            });
        }

    };

    const handleMouseDown = (e) => {

        unselectAllObjects();
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
    console.log(objects);
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
                        objectType={object.objectType}
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
