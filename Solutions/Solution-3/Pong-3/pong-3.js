// Computer Graphics
// WebGL Exercises
// Pong


// Register function to call after document has loaded

window.onload = startup;


// the gl object is saved globally

var gl;


// we keep all local parameters for the program in a single object

var ctx =
{
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    uProjectionMatId: -1,
    uModelMatId: -1
};


// we keep all the parameters for drawing a specific object together

var scene =
{
    Middle: -1,
    Ball: -1,
    PaddleL: -1,
    PaddleR: -1
};


/**
 * Startup function to be called when the body is loaded
 */

function startup ()
{
    "use strict";
    var canvas = document.getElementById ("myCanvas");
    gl = createGLContext (canvas);
    initGL();
    window.addEventListener ('keyup', onKeyup, false);
    window.addEventListener ('keydown', onKeydown, false);
    draw();
}


/**
 * InitGL should contain the functionality that needs to be executed only once
 */

function initGL ()
{
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders (gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    gl.clearColor (0.1, 0.1, 0.1, 1.0);
}


/**
 * Setup all the attribute and uniform variables
 */

function setUpAttributesAndUniforms ()
{
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation (ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation (ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation (ctx.shaderProgram, "uModelMat");

    // Set up the projection matrix
    var projectionMat = mat3.create();
    mat3.fromScaling (projectionMat,
        [2.0 / gl.drawingBufferWidth , 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv (ctx.uProjectionMatId, false, projectionMat);
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";
    scene.Middle = new Rectangle (3, gl.drawingBufferHeight, 0, 0);
    scene.Ball = new Rectangle (10, 10, -250, -100);
    scene.PaddleL = new Rectangle (10, 50, -350, -100);
    scene.PaddleR = new Rectangle (10, 50, 350, 100);
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";
    console.log ("Drawing");
    gl.clear (gl.COLOR_BUFFER_BIT);

    gl.uniform4f (ctx.uColorId, 1.0, 1.0, 1.0, 1.0);

    scene.Middle.draw();
    scene.Ball.draw();
    scene.PaddleL.draw();
    scene.PaddleR.draw();
}


// Key Handling

var key =
{
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};


function isDown (keyCode)
{
    return key._pressed [keyCode];
}


function onKeydown (event)
{
    key._pressed [event.keyCode] = true;
}


function onKeyup (event)
{
    delete key._pressed [event.keyCode];
}
