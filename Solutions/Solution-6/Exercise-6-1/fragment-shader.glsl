precision mediump float;

uniform int uEnableTexture ;
uniform sampler2D uSampler;

varying vec3 vVertexNormal;
varying vec3 vVertexColor;
varying vec2 vVertexTextureCoord;

void main ()
{
    vec3 color
        = uEnableTexture != 0
        ? texture2D (uSampler, vVertexTextureCoord)  .rgb
        : vVertexColor;

    vec3 normal = normalize (vVertexNormal);
    vec3 light = normalize (vec3 (-1.0, 1.0, 1.0));
    float factor = max (dot (normal, light), 0.0);
    // float factor = abs (dot (normal, light));

    gl_FragColor = vec4 (factor * color, 1.0);
}

