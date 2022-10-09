class Rectangle
{
    constructor (w, h, x, y)
    {
        this.DX = w / 2.0;
        this.DY = h / 2.0;

        this.X = x;
        this.Y = y;

        this.Buffer = gl.createBuffer();
        var vertices =
        [
            -this.DX, -this.DY,
             this.DX, -this.DY,
             this.DX,  this.DY,
            -this.DX,  this.DY
        ]
        gl.bindBuffer (gl.ARRAY_BUFFER, this.Buffer);
        gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
    }


    up ()
    {
        if (this.Y < gl.drawingBufferHeight / 2 - this.DY - 1)
            this.Y += 1;
        console.log (this.Y, gl.drawingBufferHeight);
    }


    down ()
    {
        if (this.Y > - gl.drawingBufferHeight / 2 + this.DY)
            this.Y -= 1;
        console.log (this.Y);
    }


    draw ()
    {
        var m0 = mat3.create();
        mat3.identity (m0);
        var m1 = mat3.create();
        console.log (m1);
        mat3.translate (m1, m0, [this.X, this.Y]);
        gl.uniformMatrix3fv (ctx.uModelMatId, false, m1);

        gl.bindBuffer (gl.ARRAY_BUFFER, this.Buffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.drawArrays (gl.TRIANGLE_FAN, 0, 4);
    }
}
