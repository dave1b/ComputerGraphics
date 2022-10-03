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
    aVertexTextureCoordId: -1,
    uSamplerId: -1
};

// we keep all the parameters for drawing a specific object together
var rectangleObject =
{
    vertexBuffer: -1,
    nTriangles: -1
};

// keep texture parameters in an object so we can mix textures and objects
var lennaTxt =
{
    textureObj: { }
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
    ctx.aVertexTextureCoordId = gl.getAttribLocation (ctx.shaderProgram, "aVertexTextureCoord");
    ctx.uSamplerId = gl.getUniformLocation (ctx.shaderProgram , "aSampler");
}


/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

function setUpBuffers ()
{
    "use strict";

    var vertices =
    [
        -0.5, -0.6,   0.0, 0.0,
         0.5, -0.6,   1.0, 0.0,
         0.5,  0.6,   1.0, 1.0,
        -0.5,  0.6,   0.0, 1.0
    ];

    rectangleObject.vertexBuffer = gl.createBuffer ();
    gl.bindBuffer (gl.ARRAY_BUFFER , rectangleObject.vertexBuffer);
    gl.bufferData (gl.ARRAY_BUFFER , new Float32Array (vertices), gl.STATIC_DRAW);

    ctx.nTriangles = vertices.length / 4;
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
    lennaTxt.textureObj = gl.createTexture();
    image.onload = function()
    {
        initTexture (image, lennaTxt.textureObj);
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
    console.log ("Drawing");

    gl.clear (gl.COLOR_BUFFER_BIT);

    gl.bindBuffer (gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer (ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 16, 8);
    gl.enableVertexAttribArray (ctx.aVertexPositionId);
    gl.enableVertexAttribArray (ctx.aVertexTextureCoordId);

    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, lennaTxt.textureObj);
    gl.uniform1i (ctx.uSamplerId, 0);

    gl.drawArrays (gl.TRIANGLE_FAN, 0, ctx.nTriangles);
}
