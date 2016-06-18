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

    // Insert the visual element.
    view.appendChild(this.graphic);

}
