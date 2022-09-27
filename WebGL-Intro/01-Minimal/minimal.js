window.onload = main;

function main ()
{
    var canvas = document.getElementById ("myCanvas");
    var gl = canvas.getContext ("webgl");

    gl.clearColor (1.0, 0.0, 0.0, 1.0);
    gl.clear (gl.COLOR_BUFFER_BIT);
}
