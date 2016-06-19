/**
 * Controls the flow of the actual Pong game.
 */
function PlayState() {

    var view = getElement("state-play");

    // Create two players.
    this.playerOne = new Player(true);
    this.playerTwo = new Player(false);

    // Start with a single ball.
    this.balls = [ ];
    this.addBall();

    // Create list of collision-ready elements.
    this.objects = [
        this.playerOne.graphic,
        this.playerTwo.graphic
    ];

    // Initialize state loop.
    setInterval(this.execute.bind(this), game.fpsInterval);

    // Show play screen.
    showElement(view);

}


/**
 * Creates a new ball on the table.
 */
PlayState.prototype.addBall = function() { 

    var view = getElement("state-play");

    // Add a new ball to the ongoing list of balls.
    this.balls.push(new Ball);

}


/**
 * Executes a frame in the play state.
 */
PlayState.prototype.execute = function() {

    // Move players by keyboard.
    if (isKeyPressed("ArrowUp")) {
        this.playerTwo.moveRelatively(true);
    } else if (isKeyPressed("ArrowDown")) {
        this.playerTwo.moveRelatively(false);
    }

    if (isKeyPressed("w")) {
        this.playerOne.moveRelatively(true);
    } else if (isKeyPressed("s")) {
        this.playerOne.moveRelatively(false);
    }

    // Move all balls.
    var i = this.balls.length;
    while (i--) {

        // Move this ball.
        var ballBounds = this.balls[i].move(this.objects);
        var scored = false;

        // Player one scored!
        if (ballBounds.left >= document.documentElement.clientWidth) {
            this.playerOne.addScore();
            scored = true;
        }

        // Player two scored!
        if (ballBounds.right <= 0) {
            this.playerTwo.addScore();
            scored = true;
        }

        // Remove this ball if it's out of the game.
        if (scored) {
            this.balls[i].destroy();
            this.balls.splice(i, 1);
        }

    }

    // Always keep one ball in the game.
    if (!this.balls.length) {
        this.addBall();
    }

}
