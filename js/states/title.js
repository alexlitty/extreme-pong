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
    game.setState(new PlayState);

}
