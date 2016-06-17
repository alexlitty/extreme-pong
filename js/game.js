/**
 * Primary game object.
 *
 * Controls the flow of the game.
 */
function Game() {

    // An "enumeration" of possible game states.
    this.STATES = {
        ERROR: 0,
        TITLE: 1,
        PLAY: 2,
        RESULT: 3
    };

    // Current game state.
    this.state = this.STATES.TITLE;

    // Validate FPS setting.
    if (!isNumeric(config.fps)) {
        this.stop("Invalid FPS");
        return;
    }

    // Calculate the interval needed to get our target framerate.
    var loopInterval = (1 / config.fps);

    // Convert the interval to milliseconds.
    loopInterval *= 1000;

    // Start the game.
    this.intervalHandle = setInterval(this.execute.bind(this), loopInterval);

}


/**
 * Moves the gameplay into a different state.
 */
Game.prototype.toState = function(state) {

}


/**
 * Halts the game and displays an error.
 */
Game.prototype.stop = function(msg) {

    // Stop main loop.
    clearInterval(this.intervalHandle);

    // Set error state.
    this.state = this.STATES.ERROR;

    // Set error message.
    getElement("state-error").innerHTML = msg;
}


/**
 * Executes a single frame of the game.
 */
Game.prototype.execute = function() {
    this.stop("Testing");

    console.log("executing");


    if (this.state === this.STATES.ERROR) {
    }

    else if (this.state === this.STATES.TITLE) {
        this.title(); 
    }

    else {
        this.stop("Invalid game state");
    }
}


/**
 * Executes a single frame of the title screen.
 */
Game.prototype.title = function() {
}
