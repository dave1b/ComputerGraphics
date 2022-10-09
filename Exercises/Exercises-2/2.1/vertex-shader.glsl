attribute vec2 vVertexTextureCoord;
attribute vec2 aVertexPosition;

varying vec2 vTextureCoord;
void main ()
{

    gl_Position = vec4 (aVertexPosition, 0.0, 1.0);

    vTextureCoord = vVertexTextureCoord;

}
