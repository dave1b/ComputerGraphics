class TexturedCube
{
    constructor (gl)
    {
        const A = [-0.5, -0.5, -0.5], E = [-0.5, -0.5,  0.5];
        const B = [ 0.5, -0.5, -0.5], F = [ 0.5, -0.5,  0.5];
        const C = [ 0.5,  0.5, -0.5], G = [ 0.5,  0.5,  0.5];
        const D = [-0.5,  0.5, -0.5], H = [-0.5,  0.5,  0.5];

        const X0 = [-1.0,  0.0,  0.0], X1 = [1.0, 0.0, 0.0];
        const Y0 = [ 0.0, -1.0,  0.0], Y1 = [0.0, 1.0, 0.0];
        const Z0 = [ 0.0,  0.0, -1.0], Z1 = [0.0, 0.0, 1.0];

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
            ...A, ...Z0, ...C1, ...LL,
            ...D, ...Z0, ...C1, ...UL,
            ...C, ...Z0, ...C1, ...UR,
            ...B, ...Z0, ...C1, ...LR,

            ...A, ...Y0, ...C2, ...LL,
            ...B, ...Y0, ...C2, ...LR,
            ...F, ...Y0, ...C2, ...UR,
            ...E, ...Y0, ...C2, ...UL,

            ...B, ...X1, ...C3, ...LL,
            ...C, ...X1, ...C3, ...LR,
            ...G, ...X1, ...C3, ...UR,
            ...F, ...X1, ...C3, ...UL,

            ...C, ...Y1, ...C4, ...LL,
            ...D, ...Y1, ...C4, ...LR,
            ...H, ...Y1, ...C4, ...UR,
            ...G, ...Y1, ...C4, ...UL,

            ...D, ...X0, ...C5, ...LL,
            ...A, ...X0, ...C5, ...LR,
            ...E, ...X0, ...C5, ...UR,
            ...H, ...X0, ...C5, ...UL,

            ...E, ...Z1, ...C6, ...LL,
            ...F, ...Z1, ...C6, ...LR,
            ...G, ...Z1, ...C6, ...UR,
            ...H, ...Z1, ...C6, ...UL
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

        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 44, 0);
        gl.vertexAttribPointer (ctx.aVertexNormalId, 3, gl.FLOAT, false, 44, 12);
        gl.vertexAttribPointer (ctx.aVertexColorId, 3, gl.FLOAT, false, 44, 24);
        gl.vertexAttribPointer (ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 44, 36);

        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.enableVertexAttribArray (ctx.aVertexNormalId);
        gl.enableVertexAttribArray (ctx.aVertexColorId);
        gl.enableVertexAttribArray (ctx.aVertexTextureCoordId);

        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, scene.textureObj);
        gl.uniform1i (ctx.uSamplerId, 0);
        gl.uniform1i (ctx.uEnableTextureId, this.EnableTexture);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.drawElements (gl.TRIANGLES, this.NumIndices, gl.UNSIGNED_BYTE, 0);
    }
}
