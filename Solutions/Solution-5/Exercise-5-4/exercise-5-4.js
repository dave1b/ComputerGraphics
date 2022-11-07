// Computer Graphics
// WebGL: Worksheet 5, Exercise 4


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
    aColorId: -1,
    uProjectionMatId: -1,
    uModelviewMatId: -1,
    uEnableTexture: -1
};


// parameters that define the scene

var scene =
{
    texturedCube: null,
    textureObj: { },
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
    ctx.aVertexTextureCoordId = gl.getAttribLocation (ctx.shaderProgram, "aVertexTextureCoord");
    ctx.aColorId = gl.getAttribLocation (ctx.shaderProgram, "aColor");
    ctx.uProjectionMatId = gl.getUniformLocation (ctx.shaderProgram, "uProjectionMat");
    ctx.uModelviewMatId = gl.getUniformLocation (ctx.shaderProgram, "uModelviewMat");
    ctx.uEnableTextureId = gl.getUniformLocation (ctx.shaderProgram, "uEnableTexture");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";
    scene.texturedCube = new TexturedCube (gl);
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
    image.src = "lena512.png";
}


/**
 * Draw the scene.
 */

function draw ()
{
    "use strict";
    gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable (gl.DEPTH_TEST);

    var dist = 2.8;

    var w = gl.drawingBufferWidth;
    var h = gl.drawingBufferHeight;

    var projectionMat = mat4.create();
    var asp = w / h;
    var fov = 40 * Math.PI / 180;
    mat4.perspective (projectionMat, fov, asp, dist - 1, dist + 1);
    gl.uniformMatrix4fv (ctx.uProjectionMatId, false, projectionMat);

    gl.viewport (0, h / 2, w / 2, h / 2);
    var modelviewMat1 = mat4.create();
    mat4.translate (modelviewMat1, modelviewMat1, [0.0, 0.0, -dist]);
    mat4.rotate (modelviewMat1, modelviewMat1, -60.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat1, modelviewMat1, -40.0 * Math.PI / 180.0, [0, 0, 1]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat1);
    scene.texturedCube.enableTexture (true);
    scene.texturedCube.draw (gl, ctx, scene);

    gl.viewport (w / 2, h / 2, w / 2, h / 2);
    var modelviewMat2 = mat4.create();
    mat4.translate (modelviewMat2, modelviewMat2, [0.0, 0.0, -dist]);
    mat4.rotate (modelviewMat2, modelviewMat2, 30.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat2, modelviewMat2, 30.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat2);
    scene.texturedCube.enableTexture (false);
    scene.texturedCube.draw (gl, ctx, scene);

    gl.viewport (0, 0, w / 2, h / 2);
    var modelviewMat3 = mat4.create();
    mat4.translate (modelviewMat3, modelviewMat3, [0.0, 0.0, -dist]);
    mat4.rotate (modelviewMat3, modelviewMat3, -30.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat3, modelviewMat3, 30.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat3);
    scene.texturedCube.enableTexture (false);
    scene.texturedCube.draw (gl, ctx, scene);

    gl.viewport (w / 2, 0, w / 2, h / 2);
    var modelviewMat4 = mat4.create();
    mat4.translate (modelviewMat4, modelviewMat4, [0.0, 0.0, -dist]);
    mat4.rotate (modelviewMat4, modelviewMat4, 30.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelviewMat4, modelviewMat4, 210.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv (ctx.uModelviewMatId, false, modelviewMat4);
    scene.texturedCube.enableTexture (false);
    scene.texturedCube.draw (gl, ctx, scene);
}
