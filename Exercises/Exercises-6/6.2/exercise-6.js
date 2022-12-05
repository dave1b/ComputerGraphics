window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        aVertexColorId: -1,
        aVertexNormalId: -1,
        aVertexTextureCoordId: -1,

        uModelViewMatrixId: -1,
        uProjectionMatrixId: -1,
        uNormalMatrixId: -1,


        uEnableTexture: -1,
        uEnableLighting: -1,
        uLightPositionId: -1,
        uLightColorId: -1,
        uSamplerId: -1,
    };

scene = {
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
    textureObj: {},
    cube: 0,
    color: (1, 0, 0),
    bands: 5,
    angle: 0,

}


function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    scene.sphere = new SolidSphere(gl, scene.bands, scene.bands, scene.color)

    initGL();
    loadTexture();
    drawAnimated();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShaderLighting.glsl');
    // set the clear color here
    setUpAttributesAndUniforms();
    setUpBuffers();
    gl.clearColor(0, 0, 0, 1);
}

function setUpAttributesAndUniforms(object, xPosition = 0, yPosition = 0, zPosition = 5) {

    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
    ctx.aVertexNormalId = gl.getAttribLocation(ctx.shaderProgram, "aVertexNormal");
    ctx.aVertexTextureCoordId = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");

    ctx.uModelViewMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");
    ctx.uProjectionMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uNormalMatrixId = gl.getUniformLocation(ctx.shaderProgram, "uNormalMatrix");

    ctx.uEnableTextureId = gl.getUniformLocation(ctx.shaderProgram, "uEnableTexture");
    ctx.uEnableLightingId = gl.getUniformLocation(ctx.shaderProgram, "uEnableLighting");

    ctx.uLightPositionId = gl.getUniformLocation(ctx.shaderProgram, "uLightPosition");
    ctx.uLightColorId = gl.getUniformLocation(ctx.shaderProgram, "uLightColor");
    ctx.uSamplerId = gl.getUniformLocation(ctx.shaderProgram, "uSampler");

}

function setUpBuffers() {
    "use strict";
    scene.cube = new TexturedCube(gl);
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


function drawAnimated(timeStamp = 0) {
    console.log('draw');

    scene.angle += 1

    draw()
    window.requestAnimationFrame(drawAnimated);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST)

    let distance = 4.5

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    // mat4.translate (projectionMat, projectionMat, [0, 0, -distance]);
    mat4.perspective(projectionMat, fov, aspect, distance - 1, distance + 1)
    // mat4.ortho(projectionMat, -1, 1,-1,1, distance-1, distance+1)
    gl.uniformMatrix4fv(ctx.uProjectionMatrixId, false, projectionMat)


    // modelVieMat
    var modelViewMat = mat4.create();
    mat4.translate(modelViewMat, modelViewMat, [0, 0, -distance]);
    mat4.rotate(modelViewMat, modelViewMat, scene.cube.roatationX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate(modelViewMat, modelViewMat, scene.cube.roatationY * Math.PI / 180.0, [0, 1, 0]);
    mat4.rotate(modelViewMat, modelViewMat, scene.cube.roatationZ * Math.PI / 180.0, [0, 0, 1]);

    // rot matrix
    var rot = mat4.create();
    mat4.rotate(rot, rot, scene.angle * Math.PI / 180, [0.577, 0.577, 0.577]);
    mat4.multiply(modelViewMat, modelViewMat, rot);

    gl.uniformMatrix4fv(ctx.uModelViewMatrixId, false, modelViewMat)

    // normalMat
    var normalMat = mat3.create();
    mat3.normalFromMat4(normalMat, modelViewMat)
    gl.uniformMatrix3fv(ctx.uNormalMatrixId, false, normalMat)


    // lightPosition
    var lightPosition = [0,1,-3.5]
    gl.uniform3fv(ctx.uLightPositionId, lightPosition)

    scene.cube.enableTexture(true)
    scene.cube.enableLightening(true)
    scene.cube.draw(gl, ctx, scene)


}

