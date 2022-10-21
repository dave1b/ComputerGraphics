attribute vec3 aVertexPosition;

uniform mat4 uProjectionMat;
uniform mat4 uModelviewMat;
uniform vec3 uColor;
uniform float uZmin;
uniform float uZmax;

varying vec3 vColor;

void main ()
{
    vec4 pos = uModelviewMat * vec4 (aVertexPosition, 1.0);
    gl_Position = uProjectionMat * pos;
    float factor = (pos.z - uZmin) / (uZmax - uZmin);
    vColor = factor * uColor;
}
