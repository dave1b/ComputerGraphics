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
const float shininess = 10.0;
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);

void main() {
    vec3 baseColor = vColor;
    if (uEnableTexture) {
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if (uEnableLighting) {
        // calculate light direction as seen from the vertex position
        vec3 lightDirectionEye =  vVertexPositionEye3 - uLightPosition ;
//        normalize(dot(uLightPosition,vNormalEye));
        vec3 normal = normalize(vNormalEye);
        float angle = cos(dot(lightDirectionEye,normal));

        // ambient lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        // diffuse lighting
        float diffuseFactor = pow(cos(angle),shininess) ;
        vec3 diffuseColor = diffuseFactor * baseColor;

        // specular lighting
        vec3 specularColor = vec3(0, 0, 0);
        if (diffuseFactor > 0.0) {
           vec3 reflectionDir =  vVertexPositionEye3 - lightDirectionEye;
           vec3 eyeDir = vNormalEye - vVertexPositionEye3;
           float cosPhi = cos(dot(reflectionDir,eyeDir));
           float specularFactor = pow(cos(cosPhi),diffuseFactor);
           specularColor = specularFactor * baseColor;
        }

        vec3 color = ambientColor + diffuseColor + specularColor;
        gl_FragColor = vec4(color, 1.0);
    }
    else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}