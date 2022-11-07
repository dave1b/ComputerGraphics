attribute vec3 aVertexPosition;
attribute vec3 aColor;

uniform mat4 uProjectionMat;
uniform mat4 uModelviewMat;

varying vec4 vColor;

void main ()
{
    vec4 pos = vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * uModelviewMat * pos;
    vColor = vec4 (aColor, 1.0);
}
