// DI Computer Graphics
//
// WebGL Exercises

// Turn Texture Mapping on and off
// Add Transformation
// Add 3D functionality

// Register function to call after document has loaded

window.onload = startup;

// the gl object is saved globally

var gl;

// we keep all local parameters for the program in a single object

var ctx =
{
    shaderProgram: -1,
    aVertexPositionId: -1,
    aVertexColorId: -1,
    aVertexTextureCoordId: -1,
    aVertexNormalId: -1,
    uModelViewMatrixId: -1,
    uProjectionMatrixId: -1,
    uNormalMatrixId: -1,
    uSamplerId: -1,
    uUseTextureId: -1,
    uLightPositionId: -1,
    uLightColorId: -1,
    uEnableLightingId: -1
};

// keep texture parameters in an object so we can mix textures and objects

var lennaTxt =
{
    textureObject0: {}
};

// parameters that define the scene

var scene =
{
    eyePosition: [0, 2, -4],
    lookAtPosition: [0, 0, 0],
    upVector: [0, 1, 0],
    nearPlane: 0.1,
    farPlane: 30.0,
    fov: 40,
    lightPosition: [3, 3, -3],
    lightColor: [1, 1, 1],
    rotateObjects: true,
    angle: 0,
    angularSpeed: 0.05 * Math.PI / 180.0
};

var drawingObjects =
{
    wiredCube: null,
    solidCube: null,
    solidSphere: null,
    solidCylinder: null
};

// Startup function to be called when the body is loaded

function startup ()
{
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    loadTexture();
    // Animation form is now requested after texture is loaded
    //window.requestAnimationFrame (drawAnimated);
}

// InitGL should contain the functionality that needs to be executed only once

function initGL ()
{
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms();
    defineObjects();

    gl.enable (gl.DEPTH_TEST);
    gl.clearColor (0.0, 0.0, 0.4, 1.0);
}

// Initialize a texture from an image
// @param image the loaded image
// @param textureObject WebGL Texture Object

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
    console.log ("Texture initialised");
}

// Load an image as a texture

function loadTexture ()
{
    var image = new Image();
    // create a texture object
    lennaTxt.textureObject0 = gl.createTexture();
    image.onload = function()
    {
        console.log("Image loaded");
        initTexture(image, lennaTxt.textureObject0);
        window.requestAnimationFrame (drawAnimated);
    };
    // setting the src will trigger onload
    image.src = "lena512.png";
}

function defineObjects ()
{
    drawingObjects.solidCube = new SolidCube(gl,
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0],
        [1.0, 1.0, 0.0],
        [0.0, 1.0, 1.0],
        [1.0, 0.0, 1.0]);
    drawingObjects.solidSphere = new SolidSphere(gl, 12, 24, [0.7, 0.7, 0.7]);
}

// Setup all the attribute and uniform variables

function setUpAttributesAndUniforms ()
{
    "use strict";

    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation (ctx.shaderProgram, "aVertexColor");
    ctx.aVertexTextureCoordId = gl.getAttribLocation (ctx.shaderProgram, "aVertexTextureCoord");
    ctx.aVertexNormalId = gl.getAttribLocation (ctx.shaderProgram, "aVertexNormal");

    ctx.uModelViewMatrixId = gl.getUniformLocation (ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation (ctx.shaderProgram, "uProjectionMatrix");
    ctx.uNormalMatrixId = gl.getUniformLocation (ctx.shaderProgram, "uNormalMatrix");

    ctx.uSamplerId = gl.getUniformLocation (ctx.shaderProgram, "uSampler");
    ctx.uUseTextureId = gl.getUniformLocation (ctx.shaderProgram, "uEnableTexture");

    ctx.uLightPositionId = gl.getUniformLocation (ctx.shaderProgram, "uLightPosition");
    ctx.uLightColorId = gl.getUniformLocation (ctx.shaderProgram, "uLightColor");
    ctx.uEnableLightingId = gl.getUniformLocation (ctx.shaderProgram, "uEnableLighting");

    console.log (ctx);
}

// Draw the scene.

function draw ()
{
    "use strict";
    var modelViewMatrix = mat4.create();
    var viewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    var normalMatrix = mat3.create();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set the matrices from the scene
    mat4.lookAt (viewMatrix, scene.eyePosition, scene.lookAtPosition, scene.upVector);
    mat4.perspective (projectionMatrix,
        glMatrix.toRadian (scene.fov),
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        scene.nearPlane, scene.farPlane);
    //mat4.ortho (projectionMatrix, -2.0, 2.0, -2.0, 2.0, scene.nearPlane, scene.farPlane);
    // it is same projection matrix for all drawings, so it can be set here
    gl.uniformMatrix4fv (ctx.uProjectionMatrixId, false, projectionMatrix);

    // enable the texture mapping
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, lennaTxt.textureObject0);
    gl.uniform1i (ctx.uSamplerId, 0);

    // set the light
    gl.uniform1i (ctx.uEnableLightingId, 0);
    gl.uniform3fv (ctx.uLightPositionId, scene.lightPosition);
    gl.uniform3fv (ctx.uLightColorId, scene.lightColor);

    // first cube
    if (1)
    {
        mat4.translate (modelViewMatrix, viewMatrix, [1, 0, 0]);
        mat4.rotate (modelViewMatrix, modelViewMatrix, scene.angle, [0.577, 0.577, 0.577]);
        gl.uniformMatrix4fv (ctx.uModelViewMatrixId, false, modelViewMatrix);
        mat3.normalFromMat4 (normalMatrix, modelViewMatrix);
        gl.uniformMatrix3fv (ctx.uNormalMatrixId, false, normalMatrix);
        gl.uniform1i (ctx.uEnableLightingId, 1);
        gl.uniform1i (ctx.uUseTextureId, 0);
        drawingObjects.solidCube.draw (gl, ctx.aVertexPositionId, ctx.aVertexColorId,
            ctx.aVertexTextureCoordId, ctx.aVertexNormalId);
    }

    // second cube
    if (1)
    {
        mat4.translate (modelViewMatrix, viewMatrix, [-1, 0, 0]);
        mat4.rotate (modelViewMatrix, modelViewMatrix, scene.angle, [-0.577, -0.577, -0.577]);
        gl.uniformMatrix4fv (ctx.uModelViewMatrixId, false, modelViewMatrix);
        mat3.normalFromMat4 (normalMatrix, modelViewMatrix);
        gl.uniformMatrix3fv (ctx.uNormalMatrixId, false, normalMatrix);
        gl.uniform1i (ctx.uEnableLightingId, 1);
        gl.uniform1i (ctx.uUseTextureId, 1);
        drawingObjects.solidCube.draw (gl, ctx.aVertexPositionId, ctx.aVertexColorId,
            ctx.aVertexTextureCoordId, ctx.aVertexNormalId);
    }

    // sphere
    if (1)
    {
        mat4.translate (modelViewMatrix, viewMatrix, [0, 0, -1]);
        mat4.rotate (modelViewMatrix, modelViewMatrix, scene.angle, [0.577, -0.577, 0.577]);
        mat4.scale (modelViewMatrix, modelViewMatrix, [0.5, 0.5, 0.5]);
        gl.uniformMatrix4fv (ctx.uModelViewMatrixId, false, modelViewMatrix);
        mat3.normalFromMat4 (normalMatrix, modelViewMatrix);
        gl.uniformMatrix3fv (ctx.uNormalMatrixId, false, normalMatrix);
        gl.uniform1i (ctx.uEnableLightingId, 1);
        gl.uniform1i (ctx.uUseTextureId, 0);
        drawingObjects.solidSphere.draw (gl, ctx.aVertexPositionId, ctx.aVertexColorId,
            ctx.aVertexNormalId);
    }
}

var lastTimeStamp = -1;

function drawAnimated (timeStamp)
{
    if (lastTimeStamp < 0)
        lastTimeStamp = timeStamp;
    var timeElapsed = timeStamp - lastTimeStamp;
    if (timeElapsed >= 10)
    {
        lastTimeStamp = timeStamp;
        scene.angle += timeElapsed * scene.angularSpeed;
        if (scene.angle > 2.0 * Math.PI)
            scene.angle -= 2.0 * Math.PI;
        draw ();
    }

    window.requestAnimationFrame (drawAnimated);
}
