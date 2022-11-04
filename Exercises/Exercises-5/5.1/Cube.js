class WireFrameCube {

    constructor() {
        this.vertices = this.#defineVertices()
        this.edges = this.#defineEdges()
        this.roatationX = 10;
        this.roatationY = 10;
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

        return  [].concat(  A,C1, B,C1, C,C1, D,C1,
                            B,C2, F,C2, G,C2, C,C2,
                            C,C3, G,C3, H,C3, D,C3,
                            A,C4, D,C4, H,C4, E,C4,
                            F,C5, E,C5, G,C5, H,C5,
                            A,C6, B,C6, F,C6, E,C6
                         )
    }

    #defineEdges(){
        return [
             0, 1, 2,  0, 3, 2,
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

        console.log(this.vertices)


        gl.bindBuffer (gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer (ctx.aVertexPositionId, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray (ctx.aVertexPositionId);
        gl.vertexAttribPointer (ctx.uColorId, 3, gl.FLOAT, false, 24, 12);
        gl.enableVertexAttribArray (ctx.uColorId);




        gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.edgeBuffer);
        gl.drawElements(gl.TRIANGLES,this.edges.length,gl.UNSIGNED_BYTE,0 );
    }
}