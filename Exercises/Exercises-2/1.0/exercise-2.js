window.onload = startup;

var gl;

var ctx =
    {
        shaderProgram: -1,
        // add local parameters for attributes and uniforms here
        aVertexPositionId: -1,
        uColorId: -1,
    };

var rectangleObject =
    {
        vertexBuffer: -1,
    };


function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // set the clear color here
    gl.clearColor(0.8, 0.5, 0.5, 1);

    // add more necessary commands here
}

function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
}

function setUpBuffers() {
    "use strict";
    var vertices = [
        0.5, 0.5,
        0.5, 0.0,
        0.5, -0.5,
        0.0, -0.5,
    ]

    rectangleObject.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}


function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.uniform4f(ctx.uColorId, 1.0,1.0,0.0,1.0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}


