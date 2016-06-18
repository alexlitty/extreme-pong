/**
 * Controls the flow of the title screen.
 *
 * Callback is invoked when the user responds to the title screen.
 */
function TitleState() {

    var title = getElement("state-title");

    // Show title screen.
    showElement(title);

    // Listen for user response.
    title.addEventListener("click", TitleState.stop);

}


/**
 * Stops the Title state and initiates a new Play state.
 */
TitleState.stop = function() {

    var title = getElement("state-title");

    // Hide title screen.
    hideElement(title);

    // Stop listening for user response.
    title.removeEventListener("click", TitleState.stop);

    // Start a Play state.
    game.state = new PlayState;

}
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

    // Now that the game is initialized, un-hide the body.
    showElement(document.body);

}


/**
 * Sets the current state object running the game.
 */
Game.prototype.setState = function(newState) {
    this.state = newState;
}
/**
 * Configuration settings for the game and its underlying engine.
 */
var config = {

    // The desired frames per second.
    fps: 30

};
