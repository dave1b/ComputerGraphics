attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexColor;
attribute vec2 aVertexTextureCoord;

uniform mat4 uProjectionMat;
uniform mat4 uModelviewMat;
uniform mat3 uNormalMat;

varying vec3 vVertexNormal;
varying vec3 vVertexColor;
varying vec2 vVertexTextureCoord;

void main ()
{
    vec4 pos = vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * uModelviewMat * pos;
    vVertexNormal = normalize (uNormalMat * aVertexNormal);
    vVertexColor = aVertexColor;
    vVertexTextureCoord = aVertexTextureCoord;
}
