/**
 * Controls the flow of the actual Pong game.
 */
function PlayState() {

    var view = getElement("state-play");

    // Create two players.
    this.playerOne = new Player(true);
    this.playerTwo = new Player(false);

    // Create a single ball.
    this.ball = new Ball;

    // Initialize state loop.
    setInterval(this.execute.bind(this), game.fpsInterval);

    // Show play screen.
    showElement(view);

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

}
