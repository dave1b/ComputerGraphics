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
    aVertexPositionId: -1,
    aColorId: -1
};

// we keep all the parameters for drawing a specific object together
var rectangleObject =
{
    vertexBuffer: -1,
    nTriangles: -1
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

    // set the clear color here
    gl.clearColor (0.7, 0.7, 0.7, 1.0);

    // add more necessary commands here
}


/**
 * Setup all the attribute and uniform variables
 */

function setUpAttributesAndUniforms()
{
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation (ctx.shaderProgram , "aColor");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";

    var x = new Float32Array ([-0.9, 0.8])
    var y = new Float32Array ([-0.7, 0.6])

    var vertices =
    [
        x [0], y [0],   1.0, 0.0, 0.0,
        x [1], y [0],   1.0, 1.0, 0.0,
        x [1], y [1],   0.0, 1.0, 0.0,
        x [0], y [1],   0.0, 0.0, 1.0
    ];

    rectangleObject.vertexBuffer = gl.createBuffer ();
    gl.bindBuffer (gl.ARRAY_BUFFER , rectangleObject.vertexBuffer);
    gl.bufferData (gl.ARRAY_BUFFER , new Float32Array (vertices), gl.STATIC_DRAW);

    ctx.nTriangles = vertices.length / 5;
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";
    console.log ("Drawing");

    gl.clear (gl.COLOR_BUFFER_BIT);

    gl.bindBuffer (gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer (ctx.aColorId, 3, gl.FLOAT, false, 20, 8);
    gl.enableVertexAttribArray (ctx.aVertexPositionId);
    gl.enableVertexAttribArray (ctx.aColorId);

    gl.drawArrays (gl.TRIANGLE_FAN, 0, ctx.nTriangles);
}
