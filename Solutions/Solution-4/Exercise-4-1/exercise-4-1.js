// Computer Graphics
// WebGL: Worksheet 4, Exercise 1


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
    var canvas = document.getElementById ("myCanvas");
    gl = createGLContext (canvas);
    initGL();
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

    var mode = 1;
    var dist = 3;

    // set up the projection matrix

    var projectionMat = mat4.create();
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (mode)
    {
        console.log("skdjf")
        var fov = 40 * Math.PI / 180;
        mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    }
    else
        mat4.scale (projectionMat, projectionMat, [1, asp, 1, 1]);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);




    //  set up the modelview matrix

    var modelviewMat = mat4.create();
    if (mode)
    {
        mat4.translate (modelviewMat, modelviewMat, [0, 0, -dist]);
        mat4.rotate (modelviewMat, modelviewMat, 30.0 * Math.PI / 180.0, [1, 0, 0]);
        mat4.rotate (modelviewMat, modelviewMat, 30.0 * Math.PI / 180.0, [0, 1, 0]);
    }
    else
    {
        mat4.lookAt (modelviewMat, [-0.1, 0.1, 1], [0, 0, 0], [0, 1, 0]);
        mat4.scale (modelviewMat, modelviewMat, [0.5, 0.5, 0.5]);
        mat4.translate (modelviewMat, modelviewMat, [0.0, 0.0, 1.0]);
    }
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
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
