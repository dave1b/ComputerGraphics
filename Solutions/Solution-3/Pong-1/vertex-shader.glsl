attribute vec2 aVertexPosition;

uniform mat3 uProjectionMat; // projektion auf pixel
uniform mat3 uModelMat;

void main ()
{
    // 2D in homogenen form -> 3D, darum vec3
    vec3 pos = uProjectionMat * uModelMat * vec3 (aVertexPosition, 1.0);  // immer das zuerst multiplizieren welches als letztes gemacht werden soll
    gl_Position = vec4 (pos.xy / pos.z, 0.0, 1.0);
}
