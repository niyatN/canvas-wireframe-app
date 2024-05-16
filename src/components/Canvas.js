// Canvas.js

import React, { useState, useRef, useEffect, useReducer } from 'react';
import Object from './objects/Object';
import './../styles/Canvas.css';
import { v4 as uuidv4 } from 'uuid';
import Toolbox from './Toolbox';
import { cursorStyleMap } from './../utils/cursorUtil.js'
import objectReducer, { initialObjects } from '../reducers/objectsReducer.js';
import zoomReducer, { initialZoom } from './../reducers/zoomReducers.js';
import selectedToolReducer, { initialSelectedTool } from './../reducers/selectedToolReducer.js';
import mouseDragReducer, { initialMouseDrag } from './../reducers/mouseDragReducer.js';
import draggedObjectReducer, { initialDraggedObject } from './../reducers/draggedObjectReducer.js';


const Canvas = () => {
    const canvasRef = useRef(null);
    const [zoom, zoomDispatch] = useReducer(zoomReducer, initialZoom);
    const [objects, objectsDispatch] = useReducer(objectReducer, initialObjects);
    const [selectedTool, selectedToolDispatch] = useReducer(selectedToolReducer, initialSelectedTool);
    const [mouseDrag, mouseDragDispatch] = useReducer(mouseDragReducer, initialMouseDrag);
    const [draggedObject, draggedObjectDispatch] = useReducer(draggedObjectReducer, initialDraggedObject);
    const [pinchStartDistance, setPinchStartDistance] = useState(0);
    const [pinchStartZoom, setPinchStartZoom] = useState(1);

    const unselectAllObjects = () => {
        objectsDispatch({
            type: 'all_object_deselected'
        });
    }


    const handleIncreaseObjectHeight = (id) => {
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
            setPinchStartZoom(zoom.scale);
        }
    };

    const handleTouchMove = (e) => {
        console.log("touch move")
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            const scale = distance / pinchStartDistance;
            zoomDispatch({
                type: 'zoom_scale_updated',
                scale: pinchStartZoom * scale
            });
        }
    };

    const handleTouchEnd = () => {
        setPinchStartDistance(0);
    };

    const handleZoom = (e, zoomDelta) => {
        if (zoom.scale >= 2.5 && zoomDelta > 0) {
            alert(`Maximum zoom threshold is reached!`);
            return;
        }
        if (zoom.scale <= 0.1 && zoomDelta < 0) {
            alert(`Minimum zoom threshold is reached!`);
            return;
        }
        const canvas = canvasRef.current;
        const boundingRect = canvas.getBoundingClientRect();
        const cursorX = e.clientX - boundingRect.left;
        const cursorY = e.clientY - boundingRect.top;

        const newZoomLevel =
            Math.round((zoom.scale + zoomDelta) * 10) / 10;

        zoomDispatch({
            type: 'zoom_scale_updated',
            scale: newZoomLevel
        })
        const scaleFactor = newZoomLevel / zoom.scale;
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
        // used '=' for '+' 
        else if (e.key === '=') {
            const currentTime = Date.now();
            if (zoom.lastZoomInKeyPressTime && currentTime - zoom.lastZoomInKeyPressTime <= 300) {
                handleZoom(e, 0.1);
            }
            zoomDispatch({
                type: 'zoom_in_key_pressed',
                timestamp: currentTime
            });
        }

        else if (e.key === '-') {
            const currentTime = Date.now();
            if (zoom.lastZoomOutKeyPressTime && currentTime - zoom.lastZoomOutKeyPressTime <= 300) {
                handleZoom(e, -0.1);
            }
            zoomDispatch({
                type: 'zoom_out_key_pressed',
                timestamp: currentTime
            });
        }
    };


    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [zoom]);

    const handleDelete = (id) => {
        objectsDispatch({
            type: 'object_deleted',
            id: id
        });
    }



    const handleSelected = (tool) => {
        selectedToolDispatch({
            type: 'seleted_tool_updated',
            tool: tool
        })
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
        console.log("mouse down");
        console.log(e);
        unselectAllObjects();
        const boundingRect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - boundingRect.left) / zoom.scale;
        const y = (e.clientY - boundingRect.top) / zoom.scale;
        mouseDragDispatch({
            type: 'mouse_drag_started',
            isDragging: true,
            startPosition: { x: x, y: y },
            currentPosition: { x: x, y: y }
        });
        if(selectedTool!=='cursor') {
            draggedObjectDispatch({
                type: 'dragged_object_created',
                id: 'dragged-object' + uuidv4(),
                objectType: selectedTool,
                startPosition: {x:x, y:y},
                currentPosition: {x:x, y:y},
                width: 0,
                height: 0,
                isSelected: false
            });
        }
        
    };

    const handleMouseMove = (e) => {
        // console.log(mouseDrag.isDragging);
        if (mouseDrag.isDragging) {
            const boundingRect = canvasRef.current.getBoundingClientRect();
            const x = (e.clientX - boundingRect.left) / zoom.scale;
            const y = (e.clientY - boundingRect.top) / zoom.scale;
            mouseDragDispatch({
                type: 'mouse_drag_continued',
                currentPosition: { x: x, y: y }
            });
            if(draggedObject) {
                draggedObjectDispatch({
                    type: 'dragged_object_updated',
                    id: draggedObject.id,
                    objectType: draggedObject.objectType,
                    startPosition: draggedObject.startPosition,
                    currentPosition: {x,y},
                    isSelected: false
                });
            }
        }
    };


    const handleMouseUp = () => {
        mouseDragDispatch({
            type: 'mouse_drag_ended',
            isDragging: false
        });
        const width = Math.abs(mouseDrag.currentPosition.x - mouseDrag.startPosition.x);
        const height = Math.abs(mouseDrag.currentPosition.y - mouseDrag.startPosition.y);
        if (width > 0 && height > 0) {
            const position = {
                x: Math.min(mouseDrag.startPosition.x, mouseDrag.currentPosition.x),
                y: Math.min(mouseDrag.startPosition.y, mouseDrag.currentPosition.y)
            };

            addObject(uuidv4(), selectedTool, position, width, height, true);
        }
        draggedObjectDispatch({
            type: 'dragged_object_unset'
        });
        selectedToolDispatch({
            type: 'seleted_tool_updated',
            tool: 'cursor'
        })
    };

    return (
        <div className="canvas-container" >
            <div className="canvas"
                ref={canvasRef}
                onClick={()=>console.log('clicked on canvas')}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    cursor: cursorStyleMap[selectedTool],
                    transform: `scale(${zoom.scale})`,
                    transformOrigin: '0 0',
                }}>
                {
                    objects.map((object) =>
                        (
                            <Object key={object.id} id={object.id}
                                objectType={object.objectType}
                                position={object.position}
                                width={object.width}
                                height={object.height}
                                isSelected={object.isSelected}
                                handleClick={handleClick}
                                handleDelete={handleDelete}
                                handleIncreaseObjectHeight={handleIncreaseObjectHeight}
                            />
                        )
                    )
                }
                {draggedObject && (
                    <Object
                        id={draggedObject.id}
                        objectType={draggedObject.objectType}
                        position={draggedObject.position}
                        width={draggedObject.width}
                        height={draggedObject.height}
                        isSelected={draggedObject.isSelected}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                        handleIncreaseObjectHeight={handleIncreaseObjectHeight}
                    />
                )}
            </div>

            <Toolbox
                handleSelected={handleSelected}
                selectedTool={selectedTool}
                zoomLevel={zoom.scale} />
        </div>
    );
}

export default Canvas;
