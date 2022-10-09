// Computer Graphics
// WebGL Exercises


// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx =
    {
        shaderProgram: -1,
        // add local parameters for attributes and uniforms here
        aVertexPositionId: -1
    };

// we keep all the parameters for drawing a specific object together
var rectangleObject =
    {
        vertexBuffer: -1,
        colorBuffer: -1
    };


/**
 * Startup function to be called when the body is loaded
 */

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}


/**
 * InitGL should contain the functionality that needs to be executed only once
 */

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // set the clear color here
    gl.clearColor(0.8, 0.5, 0.5, 1);

    // add more necessary commands here
}


/**
 * Setup all the attribute and uniform variables
 */

function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");

    // add code here to get the ids of attributes and uniform variables from the shaders
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers() {
    "use strict";
    rectangleObject.vertexBuffer = gl.createBuffer();
    var vertices = [
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
        -0.8, 0.8,
        0.8, 0.8,
        0.8, -0.8,
        -0.8, -0.8,

    ]
    gl.bindBuffer (gl.ARRAY_BUFFER , rectangleObject.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // add code here to setup the buffers for drawing an object


    var colors = new Float32Array
    ([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
    ]);
    rectangleObject.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

}


/**
 * Draw the scene.
 */

function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aColorId, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aColorId);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
    // gl.drawArrays(gl.LINE_LOOP, 0,4);
    // add drawing routines here
}
