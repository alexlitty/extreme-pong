/**
 * Adds a class to an element.
 */
function addClass(element, name) {
    
    // Bad element.
    if (!element) {
        console.warn("Adding '" + name + "' class to invalid element: ", element);
        return;
    }

    // Add class.
    element.className += name;

}


/**
 * Removes a class from an element.
 */
function removeClass(element, name) {

    // Bad element.
    if (!element) {
        console.warn("Removing '" + name + "' class from invalid element: ", element);
        return;
    }

    // Remove class with a regex.
    var regex = new RegExp('(?:^|\\s)' + name + '(?!\\S)', 'g');
    element.className = element.className.replace(regex, '');

}


/**
 * Retrieves an element by its ID.
 */
var getElement = document.getElementById.bind(document);


/**
 * Hides an element.
 */
function hideElement(element) {
    addClass(element, "hidden");
}


/**
 * Un-hides an element.
 */
function showElement(element) {
    removeClass(element, "hidden");
}
/**
 * Ensures a value is numeric and finite.
 *
 * Returns true if the value if a number or a numeric string, false otherwise.
 */
function isNumeric(value) {
    
    // Force the value to be a number.
    v = +value;

    // Not a number.
    if (isNaN(v)) {
        return false;
    }

    // Infinite number.
    if (!isFinite(v)) {
        return false;
    }

    // Value is numeric and finite.
    return true;

}
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
/**
 * Configuration settings for the game and its underlying engine.
 */
var config = {

    // The desired frames per second.
    fps: 30

};
