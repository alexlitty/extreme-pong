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
    var ballCount = this.balls.length;
    for (var i = 0; i < ballCount; i++) {

        var ballBounds = this.balls[i].move();
        if (ballBounds.right <= 0) {

        }

    }

}
