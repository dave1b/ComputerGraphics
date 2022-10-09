class Rectangle
{
    constructor (w, h, x, y)
    {
        w /= 2.0;
        h /= 2.0;

        this.X = x;
        this.Y = y;
        this.Buffer = gl.createBuffer();
        var vertices =
        [
            -w, -h,
             w, -h,
             w,  h,
            -w,  h
        ]
        gl.bindBuffer (gl.ARRAY_BUFFER, this.Buffer);
        gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
    }


    draw ()
    {
        var m0 = mat3.create();
        mat3.identity (m0);
        var m1 = mat3.create();
        mat3.translate (m1, m0, [this.X, this.Y]);
        gl.uniformMatrix3fv (ctx.uModelMatId, false, m1);

        gl.bindBuffer (gl.ARRAY_BUFFER, this.Buffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.drawArrays (gl.TRIANGLE_FAN, 0, 4);
    }
}
