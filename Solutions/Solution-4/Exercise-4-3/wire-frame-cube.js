class WireFrameCube
{
    constructor (gl, color)
    {
        var vertices =
        [
            -0.5, -0.5, -0.5,   // 0:A
             0.5, -0.5, -0.5,   // 1:B
             0.5,  0.5, -0.5,   // 2:C
            -0.5,  0.5, -0.5,   // 3:D
            -0.5, -0.5,  0.5,   // 4:E
             0.5, -0.5,  0.5,   // 5:F
             0.5,  0.5,  0.5,   // 6:G
            -0.5,  0.5,  0.5    // 7:H
        ];

        this.VertexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);

        var indices =
        [
            0, 1,    1, 2,    2, 3,    3, 0,    // 0123:ABCD
            4, 5,    5, 6,    6, 7,    7, 4,    // 4567:EFGH
            0, 4,    1, 5,    2, 6,    3, 7     // 04:AE, 15:BF, 26:CG, 37:DH
        ];

        this.NumIndices = indices.length;
        this.IndexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Int8Array (indices), gl.STATIC_DRAW);

        this.Color = color;
    }


    draw (gl, ctx)
    {
        gl.uniform3fv (ctx.uColorId, this.Color);

        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.drawElements (gl.LINES, this.NumIndices, gl.UNSIGNED_BYTE, 0);
    }
}
