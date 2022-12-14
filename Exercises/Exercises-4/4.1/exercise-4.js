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
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    wireFrameCube = new WireFrameCube([1, 1, 1])
    initGL();
    draw();
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

    let dist = 2.7;

    var projectionMat = mat4.create();
    var fov = 40 * Math.PI / 180;
    var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective(projectionMat, fov, aspect, dist - 1, dist + 2)
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat)


    // verschiedene Kameraperspektiven
    var modelViewMat = mat4.create();
    /*
    // mat4.translate (modelViewMat, modelViewMat, [0, 0, -dist]);
    mat4.lookAt (modelViewMat, [0,0,3], [0, 0, 0], [0, 1, 0]);
    mat4.rotate (modelViewMat, modelViewMat, 30.0 * Math.PI / 180.0, [1, 0, 0]);
    mat4.rotate (modelViewMat, modelViewMat, 30.0 * Math.PI / 180.0, [0, 1, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
     */

    /*
    mat4.lookAt (modelViewMat, [0,0,dist+0.25], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
     */

    /*
        mat4.lookAt (modelViewMat, [0,0,3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate (modelViewMat, modelViewMat, 35.0 * Math.PI / 180.0, [1, 0, 0]);
        mat4.rotate (modelViewMat, modelViewMat, 45.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
     */

    /*
        mat4.lookAt (modelViewMat, [0,0,3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate (modelViewMat, modelViewMat, 20.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)
     */
        mat4.lookAt (modelViewMat, [0,0,3], [0, 0, 0], [0, 1, 0]);
        mat4.rotate (modelViewMat, modelViewMat, -20.0 * Math.PI / 180.0, [1, 0, 0]);
        mat4.rotate (modelViewMat, modelViewMat, -30.0 * Math.PI / 180.0, [0, 1, 0]);
        gl.uniformMatrix4fv(ctx.uModelViewMatId, false, modelViewMat)


}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    wireFrameCube.draw(gl, ctx);
}
