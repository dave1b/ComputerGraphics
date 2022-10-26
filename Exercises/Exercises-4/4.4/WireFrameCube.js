class WireFrameCube {

    constructor(color) {
        this.color = color
        this.vertices = this.#defineVertices()
        this.edges = this.#defineEdges()
        this.rotateX = 30.0;
        this.rotateY = 30.0;
        this.rotateZ = 0;
    }

    #defineVertices() {
        return  [
            -.5, -.5,-.5,   // 0 A
            .5, -.5, -.5,   // 1 B
            .5, .5, -.5,     // 2 C
            -.5, .5, -.5,   // 3 D
            -.5, -.5, .5,   // 4 E
            .5, -.5, .5,    // 5 F
            .5, .5, .5,    // 6 G
            -.5, .5, .5     // 7 H
        ]
    }

    #defineEdges(){
        return [
            0,1,    1,2,    2,3,    3,0,
            0,4,    1,5,    2,6,    3,7,
            4,5,    5,6,    6,7,    7,4
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
        gl.uniform3fv(ctx.uColorId, this.color)

        gl.bindBuffer (gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);

        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.edgeBuffer);
        gl.drawElements(gl.LINES,this.edges.length,gl.UNSIGNED_BYTE,0 );
    }
}