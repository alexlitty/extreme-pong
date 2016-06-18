/**
 * Vertically centers an element on the page using absolute positioning.
 */
function centerVertically(element) {
    
    // Bad element.
    if (!element) {
        console.warn("Vertically centering invalid element: ", element);
        return;
    }

    // Find the vertical center of the page.
    var top = document.documentElement.clientHeight / 2;

    // Offset with the element's height.
    if (isNumeric(element.style.height)) {
        top -= (parseInt(element.style.height) / 2);
    }

    // Set new vertical position.
    element.style.top = top + "px";

}
