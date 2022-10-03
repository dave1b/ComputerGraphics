window.onload = startup;

var gl;

var ctx =
    {
        shaderProgram: -1,
        // add local parameters for attributes and uniforms here
        aVertexPositionId: -1
    };

var rectangleObject =
    {
        vertexBuffer: -1,
    };
var borderObject =
    {
        vertexBuffer1: -1,
        vertexBuffer2: -1,
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
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");
}

function setUpBuffers() {
    "use strict";
    var vertices = [
        0, 0, 1, 0, 0,
        0.5, 0.5, 1.0, 1.0, 0.0,
        0.5, 0.0, 0.0, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0, 1.0,
        0.0, -0.5, 0.0, 0.0, 1.0,

        -0.5, -0.5, 1.0, 0.0, 1.0,
        -0.5, 0.0, 0.0, 0.0, 1.0,
        -0.5, 0.5, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 0.0, 1.0,
        0.5, 0.5, 1.0, 1.0, 0.0,
    ]
    var vertices2 = [
        0.8, 0.8, 1.0, 1.0, 1.0,
        0.8, -0.8, 0.0, 0.0, 1.0,
        -0.8, -0.8, 1.0, 1.0, 1.0,
        -0.8, 0.8, 0.0, 0.0, 1.0,
    ]

    var vertices3 = [
        0.7, 0.7, 0.0, 0.0, 1.0,
        0.7, -0.7, 1.0, 1.0, 1.0,
        -0.7, -0.7, 0.0, 0.0, 1.0,
        -0.7, 0.7, 1.0, 1.0, 1.0,
    ]

    rectangleObject.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    borderObject.vertexBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, borderObject.vertexBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);

    borderObject.vertexBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, borderObject.vertexBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices3), gl.STATIC_DRAW);
}


function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(ctx.aColorId, 3, gl.FLOAT, false, 20, 8);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aColorId);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 10);


// border
    gl.bindBuffer(gl.ARRAY_BUFFER, borderObject.vertexBuffer1);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(ctx.aColorId, 3, gl.FLOAT, false, 20, 8);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aColorId);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

// border 2
    gl.bindBuffer(gl.ARRAY_BUFFER, borderObject.vertexBuffer2);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(ctx.aColorId, 3, gl.FLOAT, false, 20, 8);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aColorId);
    gl.lineWidth(100.0);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    // gl.drawArrays(gl.LINE_LOOP, 0,4);
    // add drawing routines here
}


