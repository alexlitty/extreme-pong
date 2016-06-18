/**
 * A player in the play state.
 *
 * If this should be the first player, argument is true. If second player, false.
 */
function Player(first) {

    this.first = first;
    var view = getElement("state-play");

    // Create a visual element for the player.
    this.graphic = document.createElement("div");
    this.graphic.style.width = "10px";
    this.graphic.style.height = "50px";
    addClass(this.graphic, "player");

    // Position player.
    centerVertically(this.graphic);
    if (first) {
        this.graphic.style.left = "32px";
    } else {
        this.graphic.style.right = "32px";
    }
    
    // Insert the player element.
    view.appendChild(this.graphic);

}


/**
 * Move the player relatively. This is how the player moves on a keyboard.
 *
 * If movement should be upward, argument is true. If downward, false.
 */
Player.prototype.moveRelatively = function(upward) {

    var top;

    // Get the boundary information for this player's graphic.
    var bounds = this.graphic.getBoundingClientRect();

    // Try to move upward.
    if (upward) {

        // Cannot move upward. Position at top.
        if ((bounds.top - config.playerSpeed) < 0) {
            top = "0";
        }

        // Move upward.
        else {
            top = bounds.top - config.playerSpeed;
        }

    }

    // Try to move downward.
    else {

        // Cannot move downward. Position at bottom.
        if ((bounds.bottom + config.playerSpeed) > document.documentElement.clientHeight) {
            top = document.documentElement.clientHeight - bounds.height;
        }

        // Move downward.
        else {
            top = bounds.top + config.playerSpeed;
        }
    }

    // Set new position.
    this.graphic.style.top = top + "px";

}


/**
 * Move the player absolutely. This is how the player moves on a touch device.
 */
Player.prototype.moveAbsolutely = function(x) {

}
