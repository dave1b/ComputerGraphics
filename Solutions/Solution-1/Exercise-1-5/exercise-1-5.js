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
    vertexBuffer: -1,
    colorBuffer: -1,
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
    ctx.aColorId = gl.getAttribLocation (ctx.shaderProgram , "aColor");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";

    var a = new Float32Array ([-0.7, -0.5, -0.7, -0.1, 1.0, 0.6, 0.6])
    var b = new Float32Array ([ 0.5,  0.8, -0.9, -0.6, 0.6, 1.0, 0.6])
    var c = new Float32Array ([-0.3,  0.4,  0.4,  0.7, 1.0, 1.0, 0.6])

    var vertices =
    [
        a [0], a [2],   a [1], a [2],   a [1], a [3],
        a [0], a [2],   a [1], a [3],   a [0], a [3],

        b [0], b [2],   b [1], b [2],   b [1], b [3],
        b [0], b [2],   b [1], b [3],   b [0], b [3],

        c [0], c [2],   c [1], c [2],   c [1], c [3],
        c [0], c [2],   c [1], c [3],   c [0], c [3],
    ];

    rectangleObject.vertexBuffer = gl.createBuffer ();
    gl.bindBuffer (gl.ARRAY_BUFFER , rectangleObject.vertexBuffer);
    gl.bufferData (gl.ARRAY_BUFFER , new Float32Array (vertices), gl.STATIC_DRAW);

    var colors = new Float32Array
    ([
         a [4], a [5], a [6],   a [4], a [5], a [6],   a [4], a [5], a [6],
         a [4], a [5], a [6],   a [4], a [5], a [6],   a [4], a [5], a [6],

         b [4], b [5], b [6],   b [4], b [5], b [6],   b [4], b [5], b [6],
         b [4], b [5], b [6],   b [4], b [5], b [6],   b [4], b [5], b [6],

         c [4], c [5], c [6],   c [4], c [5], c [6],   c [4], c [5], c [6],
         c [4], c [5], c [6],   c [4], c [5], c [6],   c [4], c [5], c [6],
    ]);

    rectangleObject.colorBuffer = gl.createBuffer ();
    gl.bindBuffer (gl.ARRAY_BUFFER , rectangleObject.colorBuffer);
    gl.bufferData (gl.ARRAY_BUFFER , new Float32Array (colors), gl.STATIC_DRAW);

    ctx.nTriangles = vertices.length / 2;
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
    gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (ctx.aVertexPositionId);
    gl.drawArrays (gl.TRIANGLE_FAN, 0, 4);

    gl.bindBuffer (gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer (ctx.aColorId, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (ctx.aColorId);

    gl.drawArrays (gl.TRIANGLES, 0, ctx.nTriangles);
}
