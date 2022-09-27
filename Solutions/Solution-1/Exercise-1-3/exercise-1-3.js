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
    aVertexPositionId: -1
};

// we keep all the parameters for drawing a specific object together
var rectangleObject =
{
    buffer: -1
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
    gl.clearColor (0.7, 0.8, 1.0, 1.0);

    // add more necessary commands here
}


/**
 * Setup all the attribute and uniform variables
 */

function setUpAttributesAndUniforms()
{
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";
    rectangleObject.buffer = gl.createBuffer();
    var vertices =
    [
        -0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5,
        -0.5,  0.5
    ];
    gl.bindBuffer (gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
}


/**
 * Draw the scene.
 */

function draw()
{
    "use strict";
    console.log ("Drawing");
    gl.clear (gl.COLOR_BUFFER_BIT);
    gl.bindBuffer (gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (ctx.aVertexPositionId);
    gl.drawArrays (gl.TRIANGLE_FAN, 0, 4);
}
