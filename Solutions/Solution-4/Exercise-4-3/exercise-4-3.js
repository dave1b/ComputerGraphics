// Computer Graphics
// WebGL: Worksheet 4, Exercise 3


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
    uModelviewMatId: -1
};


// parameters that define the scene

var scene =
{
    wiredCube: null,
    fov: 40,

    angle: 0,
    angularSpeed: 0.05 * Math.PI / 180.0,
    lastTimeStamp: -1
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
    window.requestAnimationFrame (drawAnimated);
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

    gl.clearColor (0.0, 0.0, 0.0, 1.0);
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
    ctx.uModelviewMatId = gl.getUniformLocation (ctx.shaderProgram, "uModelviewMat");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";
    scene.wiredCube = new WireFrameCube (gl, [1.0, 1.0, 1.0])
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";

    var dist = 3;

    // set up the projection matrix

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    //  set up the modelview matrix

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    console.log(scene.angle);

    mat4.rotate (modelviewMat, modelviewMat, scene.angle, [0.577, 0.577, 0.577]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);

    gl.clear (gl.COLOR_BUFFER_BIT);
    scene.wiredCube.draw (gl, ctx);
}


function drawAnimated (timeStamp)
{
    var timeElapsed = 0;
    if (scene.lastTimeStamp > 0)
        timeElapsed = timeStamp - scene.lastTimeStamp;
    scene.lastTimeStamp = timeStamp;

    scene.angle += timeElapsed * scene.angularSpeed;
    if (scene.angle > 2.0 * Math.PI)
        scene.angle -= 2.0 * Math.PI;

    draw ();
    window.requestAnimationFrame (drawAnimated);
}
