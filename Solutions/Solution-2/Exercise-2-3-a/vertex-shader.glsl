attribute vec2 aVertexPosition;
// attribute vec3 aColor;
attribute vec2 aVertexTextureCoord;

// varying vec4 vColor;
varying vec2 vTextureCoord;

void main ()
{
    gl_Position = vec4 (aVertexPosition, 0.0, 1.0);
    // vColor = vec4 (aColor, 1.0);
    vTextureCoord = aVertexTextureCoord;
}
