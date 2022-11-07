// Computer Graphics
// WebGL: Worksheet 5, Exercise 2


// Register function to call after document has loaded

window.onload = startup;


// the gl object is saved globally

var gl;


// we keep all local parameters for the program in a single object

var ctx =
{
    shaderProgram: -1,
    aVertexPositionId: -1,
    aVertexTextureCoordId: -1,
    uProjectionMatId: -1,
    uModelviewMatId: -1
};


// parameters that define the scene

var scene =
{
    texturedSphere: null,
    textureObj: { },

    angle: 0,
    angularSpeed: 0.01 * Math.PI / 180.0,
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
    loadTexture();
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
    ctx.aVertexTextureCoordId = gl.getAttribLocation (ctx.shaderProgram, "aVertexTextureCoord");
    ctx.uProjectionMatId = gl.getUniformLocation (ctx.shaderProgram, "uProjectionMat");
    ctx.uModelviewMatId = gl.getUniformLocation (ctx.shaderProgram, "uModelviewMat");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";
    scene.texturedSphere = new TexturedSphere (gl);
}


/**
 * Initialize a texture from an image
 * @param image the loaded image
 * @param textureObject WebGL Texture Object
 */

function initTexture (image, textureObject)
{
    // create a new texture
    gl.bindTexture (gl.TEXTURE_2D, textureObject);

    // set parameters for the texture
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap (gl.TEXTURE_2D);

    // turn texture off again
    gl.bindTexture (gl.TEXTURE_2D, null);
}


/**
 * Load an image as a texture
 */

function loadTexture ()
{
    var image = new Image();
    // create a texture object
    scene.textureObj = gl.createTexture();
    image.onload = function()
    {
        initTexture (image, scene.textureObj);
        console.log ("Texture loaded");
        // make sure there is a redraw after the loading of the texture
        draw();
    };
    // setting the src will trigger onload
    image.src = "world.png";
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";
    gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable (gl.DEPTH_TEST);

    var dist = 3;

    var projectionMat = mat4.create();
    var asp = gl.drawingBufferWidth / gl.drawingBufferHeight;
    var fov = 40 * Math.PI / 180;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    var modelviewMat = mat4.create();
    mat4.translate (modelviewMat, modelviewMat, [0.0, 0.0, -dist]);
    mat4.rotate (modelviewMat, modelviewMat, -66.5 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat, modelviewMat, scene.angle, [0, 0, 1]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat);
    scene.texturedSphere.draw (gl, ctx, scene);
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
