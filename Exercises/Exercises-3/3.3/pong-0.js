// Computer Graphics
// WebGL Exercises
// Pong


// Register function to call after document has loaded

window.onload = startup;


// the gl object is saved globally

var gl;


// we keep all local parameters for the program in a single object

var ctx = {
    shaderProgram: -1, aVertexPositionId: -1, uColorId: -1, uProjectionMatId: -1, uModelMatId: -1
};


class GameObjects {
    constructor(scalingX, scalingY, translateX, translateY, colorArray = [1, 1, 1, 1]) {
        this.buffer = -1;
        this.color = [] = colorArray;
        this.scaleX = scalingX;
        this.scaleY = scalingY;
        this.translateX = translateX;
        this.translateY = translateY;
    }

    translateYToZero() {
        this.translateY = 0;
    }
}

class GameManager {
    constructor(winScore) {
        this.scoreToWin = winScore;
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.ballDirectionX = -1;
        this.ballDirectionY = 0;
        this.isGameRunning = false;
        this.ballPixelMovementPerSecond = 300;
        this.speedX = 2;
        this.speedY = 1.0;
        // this.trickDuration = ;
    }

    updateUI() {
        document.getElementById("score").innerText = this.scorePlayer1 + ":" + this.scorePlayer2;
        if (this.scorePlayer1 == this.scoreToWin) {
            alert("Player 1 has won!  \n Final Score " + this.scorePlayer1 + ":" + this.scorePlayer2);
            this.resetGame()
        } else if (this.scorePlayer2 == this.scoreToWin) {
            alert("Player 2 has won! \nFinal Score " + this.scorePlayer1 + ":" + this.scorePlayer2);
            this.resetGame()
        }
    }

    resetGame() {
        gameManager.isGameRunning = false;
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
    }

    getSpeedY(){
        this.speedY = this.speedX/2;
        return this.speedY;
    }
}

var player1 = new GameObjects(1, 5, -350, 0, [.3, .3, 1, 1]);
var player2 = new GameObjects(1, 5, 350, 0, [1, 1, .2, 1]);
let net = new GameObjects(.5, 60, 0, 0);
var ball = new GameObjects(1, 1, 0, 0, [.5, 1, .25, 1]);
var gameManager = new GameManager(5);

/**
 * Startup function to be called when the body is loaded
 */

function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    window.addEventListener('keyup', onKeyup, false);
    window.addEventListener('keydown', onKeydown, false);
    draw();
}

function startGame() {
    var startDirection = 0;
    while (startDirection == 0) {
        startDirection = Math.floor(Math.random() * (-1 - 2)) + 2;
    }
    gameManager.ballDirectionX = startDirection;
    gameManager.isGameRunning = true;
    drawAnimated();
}

function resetGame() {
    gameManager.resetGame();
    player1.translateY = 0;
    player2.translateY = 0;
    resetBall();
    draw();
}


/**
 * InitGL should contain the functionality that needs to be executed only once
 */

function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'vertex-shader.glsl', 'fragment-shader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
}


/**
 * Setup all the attribute and uniform variables
 */

function setUpAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uColorId = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");

    // Set up the projection matrix
    var projectionMat = mat3.create();
    mat3.fromScaling(projectionMat, [2.0 / gl.drawingBufferWidth, 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uProjectionMatId, false, projectionMat);

    /**
     * Setup the buffers to use. If more objects are needed this should be split in a file per object.
     */
}

function setUpBuffers() {
    var vertices = [5, 5, 5, -5, -5, -5, -5, 5,];

    "use strict";
    // Net Buffer
    net.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, net.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Ball Buffer
    ball.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ball.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Player 1 Buffer
    player1.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, player1.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Player  Buffer
    player2.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, player2.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


}


/**
 * Draw the scene.
 */

function draw() {

    "use strict";
    gl.clear(gl.COLOR_BUFFER_BIT);


    let m0 = mat3.create();
    mat3.identity(m0);


    // Net
    // Transformationsmatrix von befüllen lassen mit Parameter
    /* var ballTranslationsM = mat3.create();
    mat3.scale(ballTranslationsM, m0, [ball.scaleX, ball.scaleY])
    mat3.translate(ballTranslationsM,ballTranslationsM,[ball.translateX,ball.translateY]) */

    // Transformationsmatrix selber definieren:
    var netTranslationsM = mat3.fromValues(net.scaleX, 0, net.translateX, 0, net.scaleY, net.translateY, 0, 0, 1);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, netTranslationsM);
    gl.bindBuffer(gl.ARRAY_BUFFER, net.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.uniform4fv(ctx.uColorId, net.color);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);


    // Ball
    var ballTranslationsM = mat3.create();
    mat3.scale(ballTranslationsM, m0, [ball.scaleX, ball.scaleY])
    mat3.translate(ballTranslationsM, ballTranslationsM, [ball.translateX, ball.translateY])
    gl.uniformMatrix3fv(ctx.uModelMatId, false, ballTranslationsM);
    gl.bindBuffer(gl.ARRAY_BUFFER, ball.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.uniform4fv(ctx.uColorId, ball.color);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // Player 1
    var player1TranslationsM = mat3.create();
    mat3.scale(player1TranslationsM, m0, [player1.scaleX, player1.scaleY])
    mat3.translate(player1TranslationsM, player1TranslationsM, [player1.translateX, player1.translateY])
    gl.uniformMatrix3fv(ctx.uModelMatId, false, player1TranslationsM);
    gl.bindBuffer(gl.ARRAY_BUFFER, player1.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.uniform4fv(ctx.uColorId, player1.color);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // Player 2
    var player2TranslationsM = mat3.create();
    mat3.scale(player2TranslationsM, m0, [player2.scaleX, player2.scaleY])
    mat3.translate(player2TranslationsM, player2TranslationsM, [player2.translateX, player2.translateY])
    gl.uniformMatrix3fv(ctx.uModelMatId, false, player2TranslationsM);
    gl.bindBuffer(gl.ARRAY_BUFFER, player2.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.uniform4fv(ctx.uColorId, player2.color);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}


// Window frame
var previousTimestamp = 0;
var timeCounterInMS = 0;
var timeInterval = 0;
var ballLastXPosition = 0;
var ballPixelMovementsInSecond = 0;


function drawAnimated(timeStamp = 0) {
    if (!gameManager.isGameRunning) {
        return
    }

    if (isDown(key.W)) {
        if (player1.translateY <= ((275 / scaleFactor))) {
            player1.translateY += .5;
        }
    }
    if (isDown(key.S)) {
        if (player1.translateY >= ((-275 / scaleFactor))) {
            player1.translateY -= .5;
        }
    }
    if (isDown(key.UP)) {
        if (player2.translateY <= ((275 / scaleFactor))) {
            player2.translateY += .5;
        }
    }
    if (isDown(key.DOWN)) {
        if (player2.translateY >= ((-275 / scaleFactor))) {
            player2.translateY -= .5;
        }
    }

    timeInterval = timeStamp - previousTimestamp
    timeCounterInMS += timeInterval;
    previousTimestamp = timeStamp;

    if (timeCounterInMS >= 100) {
        ballPixelMovementsInSecond = 10*(Math.abs(ball.translateX - ballLastXPosition));
        console.log("ballPixelMovementsInSecond: " , ballPixelMovementsInSecond)
        if (ballPixelMovementsInSecond > gameManager.ballPixelMovementPerSecond) {
            gameManager.speedX -= 0.05;
        } else if (ballPixelMovementsInSecond < gameManager.ballPixelMovementPerSecond) {
            gameManager.speedX += 0.05;
        }
        timeCounterInMS = 0;
        ballPixelMovementsInSecond = 0;
        ballLastXPosition = ball.translateX;
    }

    moveBall();
    checkBoundaries();
    draw();

    window.requestAnimationFrame(drawAnimated);

}

let scaleFactor = player1.scaleY;
let halfSizePlayer = player1.scaleY * 10 / 2;

function checkBoundaries() {
    // check if ball touch player 1
    if (ball.translateX <= player1.translateX) {
        if (ball.translateY <= player1.translateY * scaleFactor + halfSizePlayer && ball.translateY >= player1.translateY * scaleFactor - halfSizePlayer) {
            gameManager.ballDirectionX = 1;
            let delta = player1.translateY * scaleFactor - ball.translateY;
            gameManager.ballDirectionY = -delta / halfSizePlayer;
            // debug();
        }
    } else
        // check if ball touch player 2
    if (ball.translateX >= player2.translateX) {
        if (ball.translateY <= player2.translateY * scaleFactor + halfSizePlayer && ball.translateY >= player2.translateY * scaleFactor - halfSizePlayer) {
            gameManager.ballDirectionX = -1;
            let delta = player2.translateY * scaleFactor - ball.translateY;
            gameManager.ballDirectionY = -delta / halfSizePlayer;
            // debug();
        }
    }

    // check if ball behind player line
    if (ball.translateX < player1.translateX - 5) {
        ++gameManager.scorePlayer2;
        resetBall();
    } else if (ball.translateX > player2.translateX + 5) {
        ++gameManager.scorePlayer1;
        resetBall();
    } else if (ball.translateY >= 300) {
        gameManager.ballDirectionY = -gameManager.ballDirectionY;
    } else if (ball.translateY <= -300) {
        gameManager.ballDirectionY = -gameManager.ballDirectionY;
    }

}

function moveBall() {
    ball.translateX += gameManager.ballDirectionX * gameManager.speedX;
    ball.translateY += gameManager.ballDirectionY * gameManager.getSpeedY();
}

function resetBall() {
    gameManager.updateUI()
    // console.log("resetBall()")
    // debug()
    ball.translateX = 0;
    ball.translateY = 0;
    gameManager.ballDirectionY = 0;
    player1.translateYToZero();
    player2.translateYToZero();
}

function debug() {
    console.log("ball.tanslateY: ", ball.translateY);
    console.log("player1.tanslateY: ", player1.translateY * scaleFactor);
    console.log("upper bound 1: ", player1.translateY * scaleFactor + halfSizePlayer);
    console.log("lover bound 1: ", player1.translateY * scaleFactor - halfSizePlayer);
    console.log("player2.tanslateY: ", player2.translateY * scaleFactor);
    console.log("upper bound 2: ", player2.translateY * scaleFactor + halfSizePlayer);
    console.log("lover bound 2: ", player2.translateY * scaleFactor - halfSizePlayer);
    console.log("Delta ", gameManager.ballDirectionY)
}


// Key Handling

var key = {
    _pressed: {}, A: 65, D: 68, W: 87, S: 83, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ENTER: 13, SPACE: 32,
};


function isDown(keyCode) {
    return key._pressed [keyCode];
}


function onKeydown(event) {
    key._pressed [event.keyCode] = true;
}

function onKeyup(event) {
    delete key._pressed [event.keyCode];
}

