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
        x: randomInt(5, 10),
        y: randomInt(2, 7)
    };

    if (Math.random() >= 0.5) {
        this.velocity.x = -this.velocity.x;
    }

    if (Math.random() >= 0.5) {
        this.velocity.y = -this.velocity.y;
    }

    // Insert the visual element.
    view.appendChild(this.graphic);

}


/**
 * Destroys the ball.
 */
Ball.prototype.destroy = function() {
    
    var view = getElement("state-play");

    // Destroy the ball's visual element.
    view.removeChild(this.graphic);

}


/**
 * Move the ball according "physics."
 *
 * Objects is an array of collision-ready elements.
 *
 * Returns the boundaries of the ball after moving.
 */
Ball.prototype.move = function(objects) { 

    // Get current position.
    var bounds = this.graphic.getBoundingClientRect();

    // Calculate target position.
    var targetBounds = {
        left: parseInt(this.graphic.style.left) + this.velocity.x,
        top: parseInt(this.graphic.style.top) + this.velocity.y
    };

    targetBounds.right = targetBounds.left + bounds.width;
    targetBounds.bottom = targetBounds.top + bounds.height;

    // Collision with top wall.
    if (targetBounds.top <= 0) {
        this.bounceVertically();
    }

    // Collision with bottom wall.
    else if (targetBounds.bottom >= document.documentElement.clientHeight) {
        this.bounceVertically();
    }

    // Collision with objects.
    else {

        // Check for a collision with each object.
        var collided;
        var objectsLength = objects.length;
        for (var i = 0; i < objectsLength; i++) {

            // Get the object's boundaries.
            var objectBounds = objects[i].getBoundingClientRect();

            // Check for a collision with this object.
            var intersect = isIntersecting(targetBounds, objectBounds, this.velocity);
            if (intersect) {
                collided = false;

                // Vertical collision.
                if (intersect === INTERSECT.VERTICAL) {
                    collided = true;
                    this.bounceVertically();
                }

                // Horizontal collision.
                else {
                    collided = true;
                    this.bounceHorizontally();
                }

                // Trigger the object's collision styles.
                if (collided) {

                    var obj = objects[i];
                    addClass(obj, "hit");

                    // Assign a random background color.
                    obj.style.background = randomColor();

                    // Wait for the hit styles to go into effect, then remove them.
                    setTimeout(function() {
                        obj.style.background = "#efefef";
                        removeClass(obj, "hit");
                    }, 1);
                }

            }

        }

    }

    // Perform the movement.
    this.graphic.style.left = targetBounds.left + "px";
    this.graphic.style.top = targetBounds.top + "px";

    // Return the new boundaries.
    return targetBounds;
}


/**
 * Perform a vertical bounce.
 */
Ball.prototype.bounceVertically = function() {
    this.velocity.y = -this.velocity.y;
}


/**
 * Perform a horizontal bounce.
 */
Ball.prototype.bounceHorizontally = function() {
    this.velocity.x = -this.velocity.x;
}
