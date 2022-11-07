window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        uColorId: -1,
        uProjectionMatId: -1,
        uModelMatId: -1,
        uViewMatId: -1,
        uEnableTexture: -1,
        aVertexTextureCoordId: -1

    };

scene = {
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
}

// objects
let texturedCube;

var lennaTxt =
    {
        textureObj: { }
    };

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    solidCube = new WireFrameCube()
    initGL();
    loadTexture();
    draw();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    // set the clear color here
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST)
    // gl.frontFace(gl.CCW)
    // gl.cullFace(gl.BACK)
    // gl.enable(gl.CULL_FACE)
    solidCube.bindBuffers(gl)
    setUpAttributesAndUniforms()
}

function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getAttribLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
    ctx.uViewMatId = gl.getUniformLocation(ctx.shaderProgram, "uViewMat");
    ctx.uEnableTextureId = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture");
    ctx.uSamplerId = gl.getUniformLocation(ctx.shaderProgram, "uSampler");

    let distance = 5;

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.translate (projectionMat, projectionMat, [0, 0, -distance]);
    mat4.perspective(projectionMat, fov, aspect, 1, 20)
    // mat4.ortho(projectionMat, [-1,0,0], [1,0,0],[0,-1,0],[0,1,0], distance, -distance)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)

    // modelMat
    var modelMat = mat4.create();
    mat4.translate (modelMat, modelMat, [0, 0, -distance]);
    console.log(modelMat);
    mat4.rotate (modelMat, modelMat, solidCube.roatationX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelMat, modelMat, solidCube.roatationY * Math.PI / 180.0, [0, 1, 0]);
    mat4.rotate (modelMat, modelMat, solidCube.roatationZ * Math.PI / 180.0, [0, 0, 1]);
    console.log(modelMat);
    gl.uniformMatrix4fv(ctx.uModelMatId, false, modelMat)

    // viewMat
    var viewMat = mat4.create();
    mat4.translate (viewMat, viewMat, [0, 0, 0]);
    mat4.rotate(viewMat,viewMat, scene.cameraRotationX * Math.PI / 180.0, [1,0,0])
    mat4.rotate(viewMat,viewMat, scene.cameraRotationY * Math.PI / 180.0, [0,1,0])
    mat4.rotate(viewMat,viewMat, scene.cameraRotationZ * Math.PI / 180.0, [0,0,1])
    gl.uniformMatrix4fv(ctx.uViewMatId, false, viewMat);


}


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

function draw() {
    solidCube.draw(gl,ctx)
}
