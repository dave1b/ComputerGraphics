window.onload = startup;

var gl;
var ctx =
    {
        shaderProgram: -1,
        aVertexPositionId: -1,
        uColorId: -1,
        uProjectionMatId: -1,
        uModelViewMatId: -1
    };

// objects
let wireFrameCube;

function startup() {
    "use strict";
    specificStartup("Canvas1", 1)
    specificStartup("Canvas2", 2)
    specificStartup("Canvas3", 3)
    specificStartup("Canvas4", 4)
    specificStartup("Canvas5", 5)
    specificStartup("Canvas6", 6)
}

function specificStartup(canvas, project) {

    var canvas = document.getElementById(canvas);
    gl = createGLContext(canvas);
    wireFrameCube = new WireFrameCube([1, 1, 1])
    initGL(project);
    draw();
}

function initGL(project) {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms(project)
    // Bind Buffer
    wireFrameCube.bindBuffers(gl)
    // set the clear color here
    gl.clearColor(0, 0, 0, 1);
}

function setUpAttributesAndUniforms(project) {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelViewMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMat");

    let distance = 3;

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective(projectionMat, fov, aspect, distance - 1, distance + 1)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)


    // verschiedene Kameraperspektiven
    var modelViewMat = mat4.create();
    if (project == 1) {
        // mat4.translate (modelViewMat, modelViewMat, [0, 0, -distance]);
        mat4.lookAt(modelViewMat, [0, 0, 3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate(modelViewMat, modelViewMat, 30.0 * Math.PI / 180.0, [1, 0, 0]);
        mat4.rotate(modelViewMat, modelViewMat, 30.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }
    if (project == 2) {
        mat4.lookAt(modelViewMat, [0, 0, distance + 0.25], [0, 0, 0], [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }

    if (project == 3) {
        mat4.lookAt(modelViewMat, [0, 0, 3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate(modelViewMat, modelViewMat, 35.0 * Math.PI / 180.0, [1, 0, 0]);
        mat4.rotate(modelViewMat, modelViewMat, 45.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }
    if (project == 4) {
        mat4.lookAt(modelViewMat, [0, 0, 3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate(modelViewMat, modelViewMat, 20.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }

    if (project == 5) {
        mat4.lookAt(modelViewMat, [0, 0, distance], [0, 0, 0], [0, 1, 0]);
        mat4.rotate(modelViewMat, modelViewMat, wireFrameCube.rotateX * Math.PI / 180.0, [0, 1, 0]);
        // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateY* Math.PI / 180.0, [0, 1, 0]);
        // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateZ* Math.PI / 180.0, [0, 0, 1]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }
    if (project == 6) {
        mat4.lookAt(modelViewMat, [0, 0, distance], [0, 0, 0], [0, 1, 0]);
        mat4.rotate(modelViewMat, modelViewMat, -45 * Math.PI / 180.0, [0.577, 0.577, 0.577]);
        // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateY* Math.PI / 180.0, [0, 1, 0]);
        // mat4.rotate (modelViewMat, modelViewMat, wireFrameCube.rotateZ* Math.PI / 180.0, [0, 0, 1]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
    }
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    wireFrameCube.draw(gl, ctx);
}

