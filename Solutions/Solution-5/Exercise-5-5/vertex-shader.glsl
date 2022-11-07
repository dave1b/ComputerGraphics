attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;

uniform mat4 uProjectionMat;
uniform mat4 uModelviewMat;

varying vec2 vTextureCoord;

void main ()
{
    vec4 pos = vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * uModelviewMat * pos;
    vTextureCoord = aVertexTextureCoord;
}
