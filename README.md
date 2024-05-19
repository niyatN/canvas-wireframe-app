#  Canvas-Wireframe-App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Reference](#api-reference)
    - [Components](#components)
    - [Reducers](#reducers)
    - [Utilities](#utilities)
6. [Development](#development)



## Introduction

Canvas-Wireframe is a web application that allows users to create and manipulate various objects (like rectangles, textboxes, and ellipses) on a canvas. It supports zooming, object selection, and dragging.
> You can try the app on https://niyatn.github.io/canvas-wireframe-app/

## Features

- Create/Add different types of objects (rectangle, textbox, ellipse) to the canvas.
- Select and drag objects to reposition them.
- Zoom in and out of the canvas within threshold.
- Persist object state and manage.
- Select and delete object.



## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/niyatN/canvas-wireframe-app.git

   cd canvas-wireframe-app
   ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start    
    ```
4. To deploy on GitHub Pages:
    ```sh
    npm run deploy
    ```

## Usage

### Adding Objects

    - Select a tool from the toolbox (rectangle, textbox, ellipse).
    - Click and drag on the canvas to create the object.
    - Use the cursor tool to select and manipulate objects.
    

### Select Object
    - Select a cursor tool or click on object to to select it.

### Delete Object
    - Select object and press 'del' ('fn' + 'del' in mac).

### Zoom Object
    - To zoom in
        - hit 'ctrl' + '+' ('=')
        - hit '++' (ie. '==')
    - To zoom out
        - hit 'ctrl' + '-'
        - hit '--'

## API Reference

### Components

`Canvas`  
The main component that contains the canvas and handles object rendering and manipulation.

`Toolbox`  
Component that displays the tools available for drawing and manipulating objects on the canvas.
show zoom level percentage.

`Object`  
Generic component for rendering different types of objects (rectangle, textbox, ellipse).

### Reducers


`objectsReducer.js`  
Manages the state of objects on the canvas. Handles actions like adding, deleting, selecting, and updating object dimensions.

eg. actions:
- object_added
- object_deleted
- object_selected
- object_dimension_updated
- object_position_updated
- all_object_deselected

`zoomReducer.js`    
Manages the zoom state of the canvas.

eg. actions:
- zoom_scale_updated
- zoom_in_key_pressed
- zoom_out_key_pressed

`selectedToolReducer.js`  
Manages the currently selected tool.

eg. actions:
- selected_tool_updated

`mouseDragReducer.js`   
Manages the state of mouse drag events.

eg. actions:
- mouse_drag_started
- mouse_drag_ended
- mouse_drag_continued

### Utilities

`toolsUtil.js`   
Defines the tools available for drawing and their properties like cursorStyle, icon, isDrawable.

`canvasUtil.js`    
Utility functions for canvas operations, such as calculating dimensions and positions.

## Development

- Running Tests
To run the tests, use the following command:
    ```sh
    npm test
    ```

- Create Production build
To create build, use following command:  
    ```sh
    npm start build
    ```

## Demo

Here's a quick demo of the Canvas-Wireframe-app:
[![Demo Canvas-Wireframe-App](./docs/demo.gif)](./docs/demo.mov)