/**
 * The single instance of our game.
 */
var game;


/**
 * Once the page loads, create the instance of our game.
 */
window.onload = function() {
    game = new Game;
}


/**
 * Central game object.
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

    // Initialize game state.
    this.toState(this.STATES.TITLE);

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

    // Now that the game is initialized, un-hide the body.
    showElement(document.body);

}


/**
 * Moves the gameplay into a different state.
 *
 * If provided with an invalid state, execute() will stop the game.
 */
Game.prototype.toState = function(state) {

    // Update the current state.
    this.state = state;

    // Hide all states.
    hideElement(getElement("state-error"));
    hideElement(getElement("state-title"));

    // Move to error state.
    if (state === this.STATES.ERROR) {
        showElement(getElement("state-error"));
    }

    // Move to title screen.
    else if (state === this.STATES.TITLE) {
        showElement(getElement("state-title"));
    }
}


/**
 * Halts the game and displays an error.
 */
Game.prototype.stop = function(msg) {

    // Stop main loop.
    clearInterval(this.intervalHandle);

    // Set error state.
    this.toState(this.STATES.ERROR);

    // Set error message.
    getElement("error-message").innerHTML = msg;
}


/**
 * Executes a single frame of the game.
 */
Game.prototype.execute = function() {

    // Intentionally do nothing on an error.
    if (this.state === this.STATES.ERROR) {

    }

    // Execute title frame.
    else if (this.state === this.STATES.TITLE) {
        this.title(); 
    }

    // Invalid state.
    else {
        this.stop("Invalid game state");
    }
}


/**
 * Executes a single frame of the title screen.
 */
Game.prototype.title = function() {

}
