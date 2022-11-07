window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        aColorId: -1,
        uProjectionMatId: -1,
        uModelMatId: -1,
        uViewMatId: -1,
        uEnableTexture: -1,

    };

scene = {
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
    circle: 0,
}


var lennaTxt =
    {
        textureObj: { }
    };

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    scene.circle = new Circle()
    initGL();
    loadTexture();
    drawAnimated();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    // set the clear color here
    gl.enable(gl.DEPTH_TEST)
    scene.circle.bindBuffers(gl)
    gl.clearColor(0, 0, 0, 1);
}

function setUpAttributesAndUniforms(object, xPosition=0, yPosition=0, zPosition=5) {

    ctx.aVertexPositionId = gl.getAttribLocation (ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexTextureCoordId = gl.getAttribLocation (ctx.shaderProgram, "aVertexTextureCoord");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
    ctx.uViewMatId = gl.getUniformLocation(ctx.shaderProgram, "uViewMat");
    ctx.uEnableTextureId = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture");

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

