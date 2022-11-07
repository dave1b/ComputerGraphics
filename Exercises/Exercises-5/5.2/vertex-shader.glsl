attribute vec3 aVertexPosition;
attribute vec3 uColor;

uniform mat4 uProjectionMat;
uniform mat4 uModelMat;
uniform mat4 uViewMat;

varying vec3 vColor;

void main ()
{
    vec4 pos = uViewMat * uModelMat * vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * pos;
    vColor =  uColor;
}
