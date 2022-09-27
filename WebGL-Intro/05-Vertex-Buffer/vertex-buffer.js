window.onload = main;

function main ()
{
    var canvas = document.getElementById ("myCanvas");
    var gl = canvas.getContext ("webgl");

    var vertexShaderSource =
    `
        attribute vec2 aVertexPosition;

        void main ()
        {
            gl_Position = vec4 (aVertexPosition, 0.0, 1.0);
        }
    `;

    var vertexShader = gl.createShader (gl.VERTEX_SHADER);
    gl. shaderSource (vertexShader, vertexShaderSource);
    gl. compileShader (vertexShader);

    var fragmentShaderSource =
    `
        precision mediump float;

        void main ()
        {
            gl_FragColor = vec4 (0.0, 0.0, 0.0, 1.0);
        }
    `;

    var fragmentShader = gl. createShader (gl.FRAGMENT_SHADER);
    gl.shaderSource (fragmentShader, fragmentShaderSource);
    gl.compileShader (fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader (shaderProgram, vertexShader);
    gl.attachShader (shaderProgram, fragmentShader);
    gl.linkProgram (shaderProgram);
    gl.useProgram (shaderProgram);

    var x = [-0.6, 0.0, 0.6];
    var y = [-0.9, 0.3, 0.9];

    var vertices =
    [
        x [0], y [0],
        x [2], y [0],
        x [2], y [1],
        x [0], y [1],
        x [1], y [2],
        x [2], y [1],
        x [0], y [0],
        x [0], y [1],
        x [2], y [0]
    ];

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW );

    gl.clearColor (0.8, 0.8, 0.8, 1.0);
    gl.clear (gl.COLOR_BUFFER_BIT);

    var aVertexPositionId = gl.getAttribLocation (shaderProgram , "aVertexPosition");
    gl.vertexAttribPointer (aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (aVertexPositionId);
    gl.drawArrays (gl.LINE_STRIP, 0, vertices.length / 2);
}
