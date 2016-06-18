/**
 * A ball in the play state.
 */
function Ball() {

    var view = getElement("state-play");

    // Create a visual element for the ball.
    this.graphic = document.createElement("div");
    this.graphic.style.width = "16px";
    this.graphic.style.height = this.graphic.style.width;
    addClass(this.graphic, "ball");

    // Position ball.
    centerElement(this.graphic);

    // Set an initial velocity.
    this.velocity = {
        x: 5,
        y: 5
    };

    // Insert the visual element.
    view.appendChild(this.graphic);

}


/**
 * Move the ball according "physics."
 *
 * Unless provided with a velocity, the ball will move according to its internal velocity.
 */
Ball.prototype.move = function(velocity) { 

    // Use default, internal velocity.
    if (!velocity) {
        velocity = this.velocity;
    }

    // Get current position.
    var bounds = this.graphic.getBoundingClientRect();

    // Calculate target position.
    var targetBounds = {
        left: parseInt(this.graphic.style.left) + velocity.x,
        top: parseInt(this.graphic.style.top) + velocity.y
    };

    targetBounds.right = targetBounds.left + bounds.width;
    targetBounds.bottom = targetBounds.top + bounds.height;

    // Collision with top wall.
    if (targetBounds.top <= 0) {
        this.bounceVertically();
    }

    // Collision with bottom wall.
    if (targetBounds.bottom >= document.documentElement.clientHeight) {
        this.bounceVertically();
    }

    // Move the ball to the new position.
    this.graphic.style.left = targetBounds.left + "px";
    this.graphic.style.top = targetBounds.top + "px";

}


/**
 * Perform a vertical bounce.
 */
Ball.prototype.bounceVertically = function() {
    console.log("Bouncing vertically");
    this.velocity.y = -this.velocity.y;
}


/**
 * Perform a horizontal bounce.
 */
Ball.prototype.bounceHorizontally = function() {
    console.log("Bouncing horizontally");
    this.velocity.x = -this.velocity.x;
}
