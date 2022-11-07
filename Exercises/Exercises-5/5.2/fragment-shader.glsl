precision mediump float;

varying vec4 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform int uEnableTexture;


void main ()
{
    if(uEnableTexture == 0){
        gl_FragColor = vColor;
    }
    else {
    gl_FragColor = texture2D (uSampler, vTextureCoord);

    }
}
