/**
 * The central instance of our game.
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

    // Hide all states.
    var stateElements = document.getElementsByTagName("section");
    for (var i = 0; i < stateElements.length; i++) {
        hideElement(stateElements[i]);
    }

    // Start the title screen.
    this.state = new TitleState;

    // Calculate the interval needed for the desired FPS.
    this.fpsInterval = (1 / config.fps) * 1000;

    // Now that the game is initialized, un-hide the body.
    showElement(document.body);

}


/**
 * Sets the current state object running the game.
 */
Game.prototype.setState = function(newState) {
    this.state = newState;
}
