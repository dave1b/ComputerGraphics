class SolidCube
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
        const C5 = [0.0, 0.0, 1.0];
        const C6 = [1.0, 0.0, 1.0];
        var vertices =
        [
            ...A, ...C1, ...D, ...C1, ...C, ...C1, ...B, ...C1,
            ...A, ...C2, ...B, ...C2, ...F, ...C2, ...E, ...C2,
            ...B, ...C3, ...C, ...C3, ...G, ...C3, ...F, ...C3,
            ...C, ...C4, ...D, ...C4, ...H, ...C4, ...G, ...C4,
            ...D, ...C5, ...A, ...C5, ...E, ...C5, ...H, ...C5,
            ...E, ...C6, ...F, ...C6, ...G, ...C6, ...H, ...C6
        ];
        console.log(vertices)

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
    }


    draw (gl, ctx)
    {
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.vertexAttribPointer (ctx.aColorId, 3, gl.FLOAT, false, 24, 12);
        gl.enableVertexAttribArray (ctx.aColorId);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.drawElements (gl.TRIANGLES, this.NumIndices, gl.UNSIGNED_BYTE, 0);
    }
}
