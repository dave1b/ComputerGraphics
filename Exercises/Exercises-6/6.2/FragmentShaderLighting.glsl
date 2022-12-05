precision mediump float;

uniform bool uEnableTexture;
uniform bool uEnableLighting;

uniform vec3 uLightPosition;
//uniform vec3 uLightColor;

varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

varying vec3 vColor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;


const float ambientFactor = 0.4;
const float shininess = 10.0;
const vec3 specularMaterialColor = vec3(0.4, 0.4, 0.4);
const vec3 uLightColor = vec3(1.0, 1.0, 1.0);

void main() {
    vec3 baseColor = vColor;
    if (uEnableTexture) {
        baseColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb;
    }

    if (uEnableLighting) {
        //          ambient lighting
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        //         calculate light direction as seen from the vertex position
        vec3 lightDirectionEye =   uLightPosition - vVertexPositionEye3;
        vec3 normal = normalize(vNormalEye);


        // diffuse lighting
        float diffuseFactor = max(dot(lightDirectionEye, normal), 0.0);
        vec3 diffuseColor = diffuseFactor * uLightColor * baseColor;


        //        normalize(dot(uLightPosition, vNormalEye));
        //                        vec3 normal = normalize(vNormalEye);
        //                        float angle = cos(dot(lightDirectionEye,normal));


        //
        //
        //
        //                // specular lighting
        //                vec3 specularColor = vec3(0, 0, 0);
        //                if (diffuseFactor > 0.0) {
        //                   vec3 reflectionDir =  vVertexPositionEye3 - lightDirectionEye;
        //                   vec3 eyeDir = vNormalEye - vVertexPositionEye3;
        //                   float cosPhi = cos(dot(reflectionDir,eyeDir));
        //                   float specularFactor = pow(cos(cosPhi),diffuseFactor);
        //                   specularColor = specularFactor * baseColor;
        //                }
        //
        //                vec3 color = ambientColor + diffuseColor + specularColor;
        //                vec3 color = ambientColor;
        //                gl_FragColor = vec4(color, 1.0);


        //        vec3 normal = normalize (vNormalEye);
        //        vec3 light = normalize (uLightPosition);
        //        float factor = max (dot (normal, light), 0.0);
        // float factor = abs (dot (normal, light));

        vec3 color = diffuseColor + ambientColor;
        gl_FragColor = vec4(color, 1.0);
        //        gl_FragColor = vec4(1.0,1.0,1.0,1.0);

    }
    else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}