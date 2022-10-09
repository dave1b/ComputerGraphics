attribute vec2 aVertexPosition;

uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main ()
{
    vec3 pos = uProjectionMat * uModelMat * vec3 (aVertexPosition, 1.0);
    gl_Position = vec4 (pos.xy / pos.z, 0.0, 1.0);
}
