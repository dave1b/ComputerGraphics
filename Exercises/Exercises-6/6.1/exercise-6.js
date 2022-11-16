window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        aVertexColor: -1,
        aVertexNormal: -1,
        aVertexTextureCoord: -1,

        uModelViewMatrix: -1,
        uProjectionMatrix: -1,
        uNormalMatrix: -1,


        uEnableTexture: -1,
        uEnableLighting: -1,
        uLightPosition: -1,
        uLightColor: -1,
        uSampler: -1,
    };

scene = {
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
    sphere: 0,
    color: (1,0,0),
    bands: 5,
}


var lennaTxt =
    {
        textureObj: { }
    };

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    scene.sphere = new SolidSphere(gl,scene.bands,scene.bands,scene.color )

    initGL();
    loadTexture();
    drawAnimated();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShaderLighting.glsl');
    // set the clear color here
    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0, 0, 0, 1);
}

function setUpAttributesAndUniforms(object, xPosition=0, yPosition=0, zPosition=5) {

    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColor = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.aVertexNormal = gl.getAttribLocation(ctx.shaderProgram, "aVertexNormal");
    ctx.aVertexTextureCoord = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");

    ctx.uModelViewMatrix = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrix = gl.getUniformLocation (ctx.shaderProgram, "uProjectionMatrix");
    ctx.uNormalMatrix = gl.getUniformLocation(ctx.shaderProgram, "uNormalMatrix");


    ctx.uEnableTexture = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture");
    ctx.uEnableLighting = gl.getUniformLocation(ctx.shaderProgram, "uEnableLighting");
    ctx.uLightPosition = gl.getUniformLocation(ctx.shaderProgram, "uLightPosition");
    ctx.uLightColor = gl.getUniformLocation(ctx.shaderProgram, "uLightColor");
    ctx.uSampler = gl.getUniformLocation(ctx.shaderProgram, "uSampler");

    let distance = zPosition

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.translate (projectionMat, projectionMat, [0, 0, -distance]);
    mat4.perspective(projectionMat, fov, aspect, 1, 20)
    // mat4.ortho(projectionMat, [-1,0,0], [1,0,0],[0,-1,0],[0,1,0], distance, -distance)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)

    // modelMat
    var modelMat = mat4.create();
    mat4.translate (modelMat, modelMat, [xPosition, yPosition, -distance]);
    mat4.rotate (modelMat, modelMat, object.roatationX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelMat, modelMat, object.roatationY * Math.PI / 180.0, [0, 1, 0]);
    mat4.rotate (modelMat, modelMat, object.roatationZ * Math.PI / 180.0, [0, 0, 1]);
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
    };
    // setting the src will trigger onload
    image.src = "lena512.png";
}


function drawAnimated(timeStamp = 0) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    setUpAttributesAndUniforms(scene.circle);
    draw(scene.circle)


    window.requestAnimationFrame(drawAnimated);
}

function draw(object){
    object.draw(gl,ctx)
}

