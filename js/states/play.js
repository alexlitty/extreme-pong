/**
 * Controls the flow of the actual Pong game.
 */
function PlayState() {

    var view = getElement("state-play");

    // Create two players.
    this.playerOne = new Player(true);
    this.playerTwo = new Player(false);

    // Start with a single ball.
    this.balls = [ ];
    this.addBall();

    // Create list of collision-ready elements.
    this.objects = [
        this.playerOne.graphic,
        this.playerTwo.graphic
    ];

    // Listen for window resizing, and handle the initial window size.
    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize();

    // Listen for user touches.
    view.addEventListener("touchstart", this.handleTouch.bind(this), false);
    view.addEventListener("touchmove", this.handleTouch.bind(this), false);

    // Listen for mouse events.
    view.addEventListener("click", this.handleMouse.bind(this), false);
    view.addEventListener("mouseover", this.handleMouse.bind(this), false);
    view.addEventListener("mousemove", this.handleMouse.bind(this), false);
    view.addEventListener("mousedown", this.handleMouse.bind(this), false);

    // Initialize state loop.
    setInterval(this.execute.bind(this), game.fpsInterval);

    // Show play state.
    showElement(view);

}


/**
 * Pauses the play state.
 */
PlayState.prototype.pause = function() {
    this.paused = true;
}


/**
 * Starts or resumes the play state.
 */
PlayState.prototype.resume = function() {
    this.paused = false;
}


/**
 * Handles user touches.
 */
PlayState.prototype.handleTouch = function(evt) {

    evt.stopPropagation();
    evt.preventDefault();

    // Loop through all touches.
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {

        // Use this touch to move a player.
        this.sendMovement(touches[i].pageX, touches[i].pageY);

    }

}


/**
 * Handles user clicks and other mouse events.
 */
PlayState.prototype.handleMouse = function(evt) {

    evt.stopPropagation();
    evt.preventDefault();

    // Use this click to move a player.
    this.sendMovement(evt.clientX, evt.clientY);

}


/**
 * Sends an absolute movement, such as a user touch or click, to the correct player.
 *
 * If a touch or click occurred on the left side of the screen, it is received by player one.
 * Otherwise, it is received by player two.
 */
PlayState.prototype.sendMovement = function(x, y) {

    // Event is on left side. Send to player one.
    if (x < (document.documentElement.clientWidth / 2)) {
        this.playerOne.moveAbsolutely(y);
    }

    // Event is on right side. Send to player two.
    else {
        this.playerTwo.moveAbsolutely(y);
    }

}


/**
 * Handles the window resizing.
 */
PlayState.prototype.handleResize = function() {

    // Ensure all objects are visible in the new viewport.
    this.playerOne.forceIntoBounds();
    this.playerTwo.forceIntoBounds();

    // Device is in portrait, or browser isn't wide enough.
    if (window.innerHeight > window.innerWidth) {
        showElement(getElement("orientation-message"));
        this.pause();
    }
    
    // Device is in landscape, or browser is wide enough.
    else {
        hideElement(getElement("orientation-message"));
        this.resume();
    }

}


/**
 * Start, continue, or stop a countdown.
 */
PlayState.prototype.countdown = function(callback, number) {

    // Get the visual countdown element.
    var countdownElement = getElement("countdown");

    // Stop the countdown.
    if (number < 1) {

        // Hide the countdown, release the countdown lock.
        hideElement(countdownElement);
        removeClass(countdownElement, "drop");
        this.countdownLock = false;

        callback();
        return;
    }

    // Start the countdown 
    if (!number) {

        // A countdown is already active. Don't start another.
        if (this.countdownLock) {
            return;
        }

        // Show the countdown.
        showElement(countdownElement);
        addClass(countdownElement, "drop");

        // Set the countdown lock and initial number.
        this.countdownLock = true;
        number = 3;
    }

    // Update the element.
    countdownElement.innerHTML = number;

    // Continue the countdown.
    setTimeout(this.countdown.bind(this), 450, callback, number - 1);

}


/**
 * Creates a new ball on the table.
 */
PlayState.prototype.addBall = function() { 
    var self = this;

    this.countdown(function() {

        var view = getElement("state-play");

        // Add a new ball to the ongoing list of balls.
        self.balls.push(new Ball);

    });

}


/**
 * Executes a frame in the play state.
 */
PlayState.prototype.execute = function() {

    // If the game is paused, do nothing.
    if (this.paused) {
        return;
    }

    // Move players by keyboard.
    if (isKeyPressed("ArrowUp")) {
        this.playerTwo.moveRelatively(true);
    } else if (isKeyPressed("ArrowDown")) {
        this.playerTwo.moveRelatively(false);
    }

    if (isKeyPressed("w")) {
        this.playerOne.moveRelatively(true);
    } else if (isKeyPressed("s")) {
        this.playerOne.moveRelatively(false);
    }

    // Move all balls.
    var i = this.balls.length;
    while (i--) {

        // Move this ball.
        var ballBounds = this.balls[i].move(this.objects);
        var scored = false;

        // Player one scored!
        if (ballBounds.left >= document.documentElement.clientWidth) {
            this.playerOne.addScore();
            scored = true;
        }

        // Player two scored!
        if (ballBounds.right <= 0) {
            this.playerTwo.addScore();
            scored = true;
        }

        // Remove this ball if it's out of the game.
        if (scored) {
            this.balls[i].destroy();
            this.balls.splice(i, 1);
        }

    }

    // Always keep one ball in the game.
    if (!this.balls.length) {
        this.addBall();
        this.addBall();
        this.addBall();
    }

}
