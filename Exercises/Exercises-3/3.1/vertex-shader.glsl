attribute vec2 aVertexPosition;

uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main ()
{
    vec3 pos = vec3 (aVertexPosition, 0.0);
    gl_Position = vec4 (uProjectionMat * uModelMat * pos, 1.0);
}
