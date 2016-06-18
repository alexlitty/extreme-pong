/**
 * Vertically centers an element on the page using absolute positioning.
 */
function centerElementVertically(element) {
    
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


/**
 * Horizontally centers an element on the page using absolute positioning.
 */
function centerElementHorizontally(element) {

    // Bad element.
    if (!element) {
        console.warn("Horizontally centering invalid element: ", element);
        return;
    }

    // Find the horizontal center of the page.
    var left = document.documentElement.clientWidth / 2;

    // Offset with the element's width.
    if (isNumeric(element.style.width)) {
        left -= (parseInt(element.style.width) / 2);
    }

    // Set new horizontal position.
    element.style.left = left + "px";

}


/**
 * Centers an element vertically and horizontally.
 */
function centerElement(element) {
    centerElementVertically(element);
    centerElementHorizontally(element);
}
