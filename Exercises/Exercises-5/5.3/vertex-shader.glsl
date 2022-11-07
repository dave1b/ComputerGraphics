attribute vec3 aVertexPosition;
attribute vec3 aColor;
attribute vec2 aVertexTextureCoord;

uniform mat4 uProjectionMat;
uniform mat4 uModelMat;
uniform mat4 uViewMat;

varying vec4 vColor;
varying vec2 vTextureCoord;


void main ()
{
    vec4 pos = uViewMat * uModelMat * vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * pos;
    vColor =  vec4(aColor,1);
    vTextureCoord = aVertexTextureCoord;

}
