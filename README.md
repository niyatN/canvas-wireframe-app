# Getting Started with Canvas-Wireframe-App

Canvas is an application that allows users to create wireframes and basic design.

## features
- Supported objects
    - Rectangle
    - Textbox
    - Ellipse
- User can created supported objects.
    - Select object from toolbox.
    - drag mouse on screen from desired position till dimension
- User can select the object.
- User can delete object.
    - select object and hit delete (in mac: fn + delete)
- User can zoom in and out the canvas. threshold for zool scale is bounded(display alert on screen)
    - To zoom in:
        - hit 'ctrl' + '+' ('=')
        - hit '++' (ie. '==')
    - To zoom out:
        - hit 'ctrl' + '-'
        - hit '--'
- Text box will be removed if user remove all contents. If user tries to add more content then capacity of textbox then height will be increased.
- By selecting drag tool from toolbar, User can move/reposition objects on canvas.


### Available Script

#### How to start the server 

> `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### How to create production build
> `npm start build`
To create a production build


#### How run test 
> `npm test`
To run tests


#### How to deploy
> `npm run deploy`
to deploy app on github page. we are using gh-page to host canvas-wireframe-app