window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        uColorId: -1,
        uProjectionMatId: -1,
        uModelViewMatId: -1,
        uZminId: -1,
        uZmaxId: 1,
    };

// objects
let wireFrameCubeRed;
let wireFrameCubeCyan;

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    wireFrameCubeRed = new WireFrameCube([1, 0, 0])
    wireFrameCubeCyan = new WireFrameCube([0, 1, 1])
    initGL();
    drawAnimated();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    // set the clear color here
    gl.clearColor(0, 0, 0, 1);
    // Bind Buffer
    setUpAttributesAndUniforms()
}

function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelViewMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMat");
    ctx.uZminId = gl.getUniformLocation(ctx.shaderProgram, "uZmin");
    ctx.uZmaxId = gl.getUniformLocation(ctx.shaderProgram, "uZmax");

    let distance = 3;
    let eyeDistance = 0.015
    var zMin = -distance - 1;
    var zMax = -distance + 1;

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective(projectionMat, fov, aspect, -zMax, -zMin)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)

    wireFrameCubeRed.bindBuffers(gl)
    // RedCube
    var modelViewMat = mat4.create();
    mat4.translate (modelViewMat, modelViewMat, [0, 0, -distance]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCubeRed.rotateX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCubeRed.rotateY * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    gl.uniform1f(ctx.uZminId, zMin);
    gl.uniform1f(ctx.uZmaxId, zMax -1);
    wireFrameCubeRed.draw(gl, ctx)


    wireFrameCubeCyan.bindBuffers(gl)
    // CyanCube
    var modelViewMat = mat4.create();
    mat4.translate (modelViewMat, modelViewMat, [0+eyeDistance, 0+ eyeDistance, -distance+ eyeDistance]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCubeCyan.rotateX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCubeCyan.rotateY * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    gl.uniform1f(ctx.uZminId, zMin);
    gl.uniform1f(ctx.uZmaxId, zMax -1);
    wireFrameCubeCyan.draw(gl, ctx)

    // CyanCube
}

function draw() {

}

function drawAnimated(timeStamp = 0) {
    let speed = 0.5
    wireFrameCubeRed.rotateX -= speed;
    wireFrameCubeRed.rotateY -= speed;
    wireFrameCubeCyan.rotateX -= speed;
    wireFrameCubeCyan.rotateY -=speed;
    // wireFrameCubeCyan.rotateX -= 0.3;
    // wireFrameCubeCyan.rotateY -= 0.3;
    gl.clear(gl.COLOR_BUFFER_BIT);
    setUpAttributesAndUniforms();
    // draw();
    window.requestAnimationFrame(drawAnimated);

}
