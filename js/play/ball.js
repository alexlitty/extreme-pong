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
 */
Ball.prototype.move = function() {

    this.graphic.style.left = addPixels(this.graphic.style.left, this.velocity.x);
    this.graphic.style.top = addPixels(this.graphic.style.top, this.velocity.y);

}
