attribute vec3 aVertexPosition;

uniform mat4 uProjectionMat;
uniform mat4 uModelMat;

void main ()
{
    vec4 pos = vec4(aVertexPosition, 1.0);
    gl_Position = uProjectionMat * uModelMat * pos;
}
