/**
 * A collection of keyboard keys currently being pressed.
 */
var keyboard = { };


/**
 * Listen for key presses.
 */
document.addEventListener("keydown", function(e) {
    keyboard[e.key] = true;
});


/**
 * Listen for key releases.
 */
document.addEventListener("keyup", function(e) {
    keyboard[e.key] = false;
});


/**
 * Checks if a key is currently being pressed.
 */
function isKeyPressed(key) {
    return keyboard[e.key];
}
