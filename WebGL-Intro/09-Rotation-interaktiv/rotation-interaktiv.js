window.onload = main;



var GL;
var NumberOfItems;
var Angle = 0;
const AngleIncrement = 10;
var ModelMatrix;



function main ()
{
    var canvas = document.getElementById ("myCanvas");
    GL = canvas.getContext ("webgl");

    var vertexShaderSource =
    `
        attribute vec2 aVertexPosition;
        attribute vec3 aColor;

        uniform mat3 uModelMatrix;

        varying vec3 v_Color;

        void main ()
        {
            vec3 v = vec3 (aVertexPosition, 1.0);
            vec3 w = uModelMatrix * v;
            gl_Position = vec4 (w, 1.0);
            v_Color = aColor;
        }
    `;

    var vertexShader = GL.createShader (GL.VERTEX_SHADER);
    GL. shaderSource (vertexShader, vertexShaderSource);
    GL. compileShader (vertexShader);

    var fragmentShaderSource =
    `
        precision mediump float;

        varying vec3 v_Color;

        void main ()
        {
            gl_FragColor = vec4 (v_Color, 1.0);
        }
    `;

    var fragmentShader = GL. createShader (GL.FRAGMENT_SHADER);
    GL.shaderSource (fragmentShader, fragmentShaderSource);
    GL.compileShader (fragmentShader);

    var shaderProgram = GL.createProgram();
    GL.attachShader (shaderProgram, vertexShader);
    GL.attachShader (shaderProgram, fragmentShader);
    GL.linkProgram (shaderProgram);
    GL.useProgram (shaderProgram);

    var x = [-0.50, 0.00, 0.50];
    var y = [-0.75, 0.30, 0.75];

    var vertices =
    [
        x [0], y [0],
        x [2], y [0],
        x [2], y [1],
        x [0], y [1],
        x [1], y [2]
    ];

    vertexBuffer = GL.createBuffer();
    GL.bindBuffer (GL.ARRAY_BUFFER, vertexBuffer);
    GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (vertices), GL.STATIC_DRAW );

    var aVertexPositionId = GL.getAttribLocation (shaderProgram , "aVertexPosition");
    GL.vertexAttribPointer (aVertexPositionId, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray (aVertexPositionId);

    var indices = new Uint8Array
    ([
         0, 1, 2, 3, 4, 2, 0, 3, 1
    ]);

    var indexBuffer = GL.createBuffer();
    GL.bindBuffer (GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    GL.bufferData (GL.ELEMENT_ARRAY_BUFFER, indices, GL.STATIC_DRAW);
    NumberOfItems = indices.length;

    var colors = new Float32Array
    ([
         0.0, 0.0, 1.0,
         0.0, 1.0, 1.0,
         0.0, 1.0, 0.0,
         1.0, 1.0, 0.0,
         1.0, 0.0, 0.0
    ]);

    var colorBuffer = GL.createBuffer();
    GL.bindBuffer (GL.ARRAY_BUFFER, colorBuffer);
    GL.bufferData (GL.ARRAY_BUFFER, colors, GL.STATIC_DRAW);

    var aColorId = GL.getAttribLocation (shaderProgram , "aColor");
    GL.vertexAttribPointer (aColorId, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray (aColorId);

    ModelMatrix = GL.getUniformLocation (shaderProgram, 'uModelMatrix');

    GL.bindBuffer (GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    draw (0);
}



function draw (increment)
{
    GL.clearColor (0.4, 0.4, 0.4, 1.0);
    GL.clear (GL.COLOR_BUFFER_BIT);

    Angle += increment;
    var t = Math.PI * Angle / 180;
    var c = Math.cos (t);
    var s = Math.sin (t);
    var transform = new Float32Array
    ([
           c,   s, 0.0,
          -s,   c, 0.0,
         0.0, 0.0, 1.0
    ])
    GL.uniformMatrix3fv (ModelMatrix, false, transform);

    GL.drawElements (GL.LINE_STRIP, NumberOfItems, GL.UNSIGNED_BYTE, 0);
}



function RotLeft ()
{
    draw (AngleIncrement);
}



function RotRight ()
{
    draw (-AngleIncrement);
}
