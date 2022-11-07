class TexturedCube
{
    constructor (gl)
    {
        const A = [-0.5, -0.5, -0.5], E = [-0.5, -0.5,  0.5];
        const B = [ 0.5, -0.5, -0.5], F = [ 0.5, -0.5,  0.5];
        const C = [ 0.5,  0.5, -0.5], G = [ 0.5,  0.5,  0.5];
        const D = [-0.5,  0.5, -0.5], H = [-0.5,  0.5,  0.5];

        const C1 = [1.0, 0.0, 0.0];
        const C2 = [1.0, 1.0, 0.0];
        const C3 = [0.0, 1.0, 0.0];
        const C4 = [0.0, 1.0, 1.0];
        const C5 = [0.0, 0.0, 1.0]
        const C6 = [1.0, 0.0, 1.0];

        const LL = [0.0, 0.0];
        const LR = [1.0, 0.0];
        const UR = [1.0, 1.0];
        const UL = [0.0, 1.0];

        var vertices =
        [
            ...A, ...C1, ...LL, ...D, ...C1, ...UL, ...C, ...C1, ...UR, ...B, ...C1, ...LR,
            ...A, ...C2, ...LL, ...B, ...C2, ...LR, ...F, ...C2, ...UR, ...E, ...C2, ...UL,
            ...B, ...C3, ...LL, ...C, ...C3, ...LR, ...G, ...C3, ...UR, ...F, ...C3, ...UL,
            ...C, ...C4, ...LL, ...D, ...C4, ...LR, ...H, ...C4, ...UR, ...G, ...C4, ...UL,
            ...D, ...C5, ...LL, ...A, ...C5, ...LR, ...E, ...C5, ...UR, ...H, ...C5, ...UL,
            ...E, ...C6, ...LL, ...F, ...C6, ...LR, ...G, ...C6, ...UR, ...H, ...C6, ...UL
        ];

        this.VertexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);

        var indices =
        [
             0,  1,  2,      0,  2,  3,     //  ADCB
             4,  5,  6,      4,  6,  7,     //  ABFE
             8,  9, 10,      8, 10, 11,     //  BCGF
            12, 13, 14,     12, 14, 15,     //  CDHG
            16, 17, 18,     16, 18, 19,     //  DAEH
            20, 21, 22,     20, 22, 23      //  EFGH
        ];

        this.NumIndices = indices.length;
        this.IndexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Int8Array (indices), gl.STATIC_DRAW);

        this.Color = [0.4, 0.8, 0.4];
        this.EnableTexture = true;
    }


    enableTexture (b)
    {
        this.EnableTexture = b;
    }


    draw (gl, ctx, scene)
    {
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 32, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.vertexAttribPointer (ctx.aColorId, 3, gl.FLOAT, false, 32, 12);
        gl.enableVertexAttribArray (ctx.aColorId);
        gl.vertexAttribPointer (ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 32, 24);
        gl.enableVertexAttribArray (ctx.aVertexTextureCoordId);

        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, scene.textureObj);
        gl.uniform1i (ctx.uSamplerId, 0);
        gl.uniform1i (ctx.uEnableTextureId, this.EnableTexture);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.drawElements (gl.TRIANGLES, this.NumIndices, gl.UNSIGNED_BYTE, 0);
    }
}
