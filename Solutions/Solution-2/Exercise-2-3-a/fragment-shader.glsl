precision mediump float;


// varying vec4 vColor;
varying vec2 vTextureCoord;

void main ()
{
    // gl_FragColor = vColor;
    gl_FragColor = texture2D (uSampler, vTextureCoord);
}
