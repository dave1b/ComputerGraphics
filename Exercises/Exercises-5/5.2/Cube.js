class WireFrameCube {

    constructor() {
        this.vertices = this.#defineVertices()
        this.edges = this.#defineEdges()
        this.roatationX = 40;
        this.roatationY = 20;
        this.roatationZ = 0;
    }

    #defineVertices() {
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

        const BL = [0.0, 0.0];
        const BR = [1.0, 0.0];
        const TR = [1.0, 1.0];
        const TL = [0.0, 1.0];

        return  [].concat(  A,C1,BL,  B,C1,BR,  C,C1,TR,  D,C1,TL,
                            B,C2,BL,  F,C2,BR,  G,C2,TR,  C,C2,TL,
                            C,C3,BL,  G,C3,BR,  H,C3,TR,  D,C3,TL,
                            E,C4,BL,  A,C4,BR,  D,C4,TR,  H,C4,TL,
                            F,C5,BL,  E,C5,BR,  H,C5,TR,  G,C5,TL,
                            B,C6,BL,  A,C6,BR,  E,C6,TR,  F,C6,TL,
            )
    }

    #defineEdges(){
        return [
             0, 1, 2,  0, 2, 3,
             4, 5, 6,  4, 6, 7,
             8, 9,10,  8,10,11,
            12,13,14, 12,14,15,
            16,17,18, 16,18,19,
            20,21,22, 20,22,23

        ]
    }

    bindBuffers(gl){
        this.verticesBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

        this.edgeBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Int8Array(this.edges),gl.STATIC_DRAW)
    }

    draw(gl, ctx){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.bindBuffer (gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 32, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.vertexAttribPointer (ctx.aColorId, 3, gl.FLOAT, false, 32, 12);
        gl.enableVertexAttribArray (ctx.aColorId);
        gl.vertexAttribPointer (ctx.aVertexTextureCoordId, 2, gl.FLOAT, false, 32, 24);
        gl.enableVertexAttribArray (ctx.aVertexTextureCoordId);

        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, lennaTxt.textureObj);
        gl.uniform1i (ctx.uSamplerId, 0);
        gl.uniform1i (ctx.uEnableTextureId, true);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.edgeBuffer);
        gl.drawElements (gl.TRIANGLES, this.edges.length, gl.UNSIGNED_BYTE, 0);
    }
}