precision mediump float;

uniform int uEnableTexture ;
uniform sampler2D uSampler;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main ()
{
    if (uEnableTexture == 0)
        gl_FragColor = vColor;
    else
        gl_FragColor = texture2D (uSampler, vTextureCoord);
}

