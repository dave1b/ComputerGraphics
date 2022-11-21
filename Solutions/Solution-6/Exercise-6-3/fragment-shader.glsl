precision mediump float;

uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

varying vec3 vColor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

const float ambientFactor = 0.2;
const float shininess = 15.0;
const vec3 specularMaterialColor = vec3 (0.4, 0.4, 0.4);



void main ()
{
    vec3 baseColor = vColor;
    if (uEnableTexture)
        baseColor = texture2D (uSampler, vec2 (vTextureCoord.s, vTextureCoord.t)) .rgb;

    if (uEnableLighting)
    {
        //  calculate light direction as seen from the vertex position

            vec3 lightDirectionEye = normalize (uLightPosition - vVertexPositionEye3);
            vec3 normal = normalize (vNormalEye);

        //  ambient lighting

            vec3 ambientColor = ambientFactor * baseColor.rgb;

        //  diffuse uEnableLighting

            float diffuseFactor = max (dot (normal, lightDirectionEye), 0.0);
            vec3 diffuseColor = diffuseFactor * baseColor * uLightColor;

        //  specular lighting

            vec3 specularColor = vec3 (0, 0, 0);
            if (diffuseFactor > 0.0)
            {
               vec3 reflectionDir = normalize (reflect (- lightDirectionEye, normal));
               vec3 eyeDir = - normalize (vVertexPositionEye3);
               float cosPhi = max (dot (reflectionDir, eyeDir), 0.0);
               float specularFactor = pow (cosPhi, shininess);
               specularColor = specularFactor * specularMaterialColor * uLightColor;
            }
            vec3 color = ambientColor + diffuseColor + specularColor;


        //  color = normal;

            gl_FragColor = vec4 (color, 1.0);
    }
    else
        gl_FragColor = vec4 (baseColor, 1.0);
}
