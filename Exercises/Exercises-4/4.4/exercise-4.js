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
let wireFrameCube;

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    wireFrameCube = new WireFrameCube([1, 1, 1])
    initGL();
    drawAnimated();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms()
    // Bind Buffer
    wireFrameCube.bindBuffers(gl)
    // set the clear color here
    gl.clearColor(0, 0, 0, 1);
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
    var zMin = -distance - 1;
    var zMax = -distance + 1;

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective(projectionMat, fov, aspect, -zMax, -zMin)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)


    // verschiedene Kameraperspektiven
    var modelViewMat = mat4.create();

    mat4.translate (modelViewMat, modelViewMat, [0, 0, -distance]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateX * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateY * Math.PI / 180.0, [0, 1, 0]);
    // mat4.lookAt(modelViewMkat, [0, 0, -distance], [0, 0, 0], [0, 1, 0]);
    // mat4.rotate(modelViewMat, modelViewMat, wireFrameCube.rotateX * Math.PI / 180.0, [0.577, 0.577, 0.577]);
    // // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateY* Math.PI / 180.0, [0, 1, 0]);
    // // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateZ* Math.PI / 180.0, [0, 0, 1]);
    gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)

    gl.uniform1f(ctx.uZminId, zMin);
    gl.uniform1f(ctx.uZmaxId, zMax -1);

}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    wireFrameCube.draw(gl, ctx);
}

function drawAnimated(timeStamp = 0) {
    wireFrameCube.rotateX = wireFrameCube.rotateX - 0.3;
    wireFrameCube.rotateY = wireFrameCube.rotateY - 0.3;
    setUpAttributesAndUniforms();
    draw();
    window.requestAnimationFrame(drawAnimated);

}
