window.onload = main;



function main ()
{
    var canvas = document.getElementById ("myCanvas");
    var gl = canvas.getContext ("webgl");

    var vertexShaderSource =
    `
        void main ()
        {
            // vierte Koordinate ist Perspektive punkte durch 4. teilen
            gl_Position = vec4 (0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 10.0;
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
            // rgb und alfa (transparenz 0 = durchsichtig 1 = voll)
            gl_FragColor = vec4 (1.0, 0.0, 0.0, 1.0);
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

    var vertices =
    [
        -0.5, -0.5
    ];

    gl.clearColor (0.8, 0.8, 0.8, 1.0);
    gl.clear (gl.COLOR_BUFFER_BIT);

    gl.drawArrays (gl.POINTS, 0, 1);
}
