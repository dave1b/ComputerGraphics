class TexturedSphere
{
    constructor (gl)
    {
        const r = 0.9;
        const m = 24;
        const n = 2 * m;

        var vertices = [];
        {
            const du = 2 * Math.PI / n
            const dv = Math.PI / m;
            for (var i = 0; i <= m; ++i)
            {
                const v = i * dv, cv = Math.cos (v), sv = Math.sin (v);
                for (var k = 0; k <= n; ++k)
                {
                    const u = k * du, cu = Math.cos (u), su = Math.sin (u);
                    vertices.push (r * cu * sv);
                    vertices.push (r * su * sv);
                    vertices.push (r * cv);
                    vertices.push (1.0 - k / n);
                    vertices.push (i / m);
                }
            }
        }

        this.VertexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);

        var indices = [];
        {
            for (let i = 0; i < m; ++i)
            for (let k = 0; k < n; ++k)
            {
                const a = i * (n + 1) + k;
                const b = a + 1;
                const d = b + n;
                const c = d + 1;
                indices.push (a); indices.push (b); indices.push (c);
                indices.push (a); indices.push (c); indices.push (d);
            }
        }

        this.NumIndices = indices.length;
        this.IndexBuffer = gl.createBuffer();
        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Int16Array (indices), gl.STATIC_DRAW);
    }


    draw (gl, ctx, scene)
    {
        gl.bindBuffer (gl.ARRAY_BUFFER, this.VertexBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 20, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.vertexAttribPointer (ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 20, 12);
        gl.enableVertexAttribArray (ctx.aVertexTextureCoordId);

        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, scene.textureObj);
        gl.uniform1i (ctx.uSamplerId, 0);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        gl.drawElements (gl.TRIANGLES, this.NumIndices, gl.UNSIGNED_SHORT, 0);
    }
}
