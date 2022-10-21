// Computer Graphics
// WebGL: Worksheet 4, Exercise 2


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

var wiredCube = null;


/**
 * Startup function to be called when the body is loaded
 */

function startup ()
{
    "use strict";
    myStartup ("Canvas1", proj1);
    myStartup ("Canvas2", proj2);
    myStartup ("Canvas3", proj3);
    myStartup ("Canvas4", proj4);
    myStartup ("Canvas5", proj5);
    myStartup ("Canvas6", proj6);
}

function proj1 ()
{
    var dist = 3;
    var fov = 40;

    var projectionMat = mat4.create();
    fov *= Math.PI / 180;
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function proj2 ()
{
    var dist = 1.5;
    var fov = 80;

    var projectionMat = mat4.create();
    fov *= Math.PI / 180;
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function proj3 ()
{
    var dist = 3;
    var fov = 40;

    var projectionMat = mat4.create();
    fov *= Math.PI / 180;
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    mat4.rotate (modelviewMat, modelviewMat, -35.5 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat, modelviewMat, 45.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function proj4 ()
{
    var dist = 3;
    var fov = 30;

    var projectionMat = mat4.create();
    fov *= Math.PI / 180;
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    mat4.rotate (modelviewMat, modelviewMat, 30.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function proj5 ()
{
    var dist = 1;

    var projectionMat = mat4.create();
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.ortho (projectionMat, -asp, asp, -1, 1, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    mat4.rotate (modelviewMat, modelviewMat, 25.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function proj6 ()
{
    var dist = 1;

    var projectionMat = mat4.create();
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.ortho (projectionMat, -asp, asp, -1, 1, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
    mat4.rotate (modelviewMat, modelviewMat, 10.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat, modelviewMat, 20.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
}

function myStartup (cnv, prj)
{
    "use strict";
    var canvas = document.getElementById (cnv);
    gl = createGLContext (canvas);
    initGL();
    prj();
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
    wiredCube = new WireFrameCube (gl, [1.0, 1.0, 1.0])
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";
    gl.clear (gl.COLOR_BUFFER_BIT);
    wiredCube.draw (gl, ctx);
}
