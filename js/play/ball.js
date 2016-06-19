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
        x: 15,
        y: 15
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
        return;
    }

    // Collision with bottom wall.
    if (targetBounds.bottom >= document.documentElement.clientHeight) {
        this.bounceVertically();
        return;
    }

    // Collision with player one.
    var intersect = isIntersecting(targetBounds, getElement("player-one").getBoundingClientRect());
    if (intersect) {
        if (intersect === INTERSECT.VERTICAL) {
            this.bounceVertically();
            return;
        }

        else {
            this.bounceHorizontally();
            return;
        }
    }

    // Collision with player two.
    intersect = isIntersecting(targetBounds, getElement("player-two").getBoundingClientRect());
    if (intersect) {
        if (intersect === INTERSECT.VERTICAL) {
            this.bounceVertically();
            return;
        }

        else {
            this.bounceHorizontally();
            return;
        }
    }

    // No collision. Move freely.
    this.graphic.style.left = targetBounds.left + "px";
    this.graphic.style.top = targetBounds.top + "px";
}


/**
 * Perform a vertical bounce.
 */
Ball.prototype.bounceVertically = function() {
    this.velocity.y = -this.velocity.y;
    this.move();
}


/**
 * Perform a horizontal bounce.
 */
Ball.prototype.bounceHorizontally = function() {
    this.velocity.x = -this.velocity.x;
    this.move();
}
