/**
 * Adds number value to a string pixel value, and returns a string pixel value.
 */
function addPixels(measurement, value) {

    // Invalid measurement.
    if (!isNumeric(measurement)) {
        console.warn("Adding value to invalid pixel measurement: ", measurement);
        return;
    }

    // Return new pixel value.
    return (parseInt(measurement) + value) + "px";

}


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


/**
 * Whether an element is completely inside the viewport window.
 */
function isInBounds(element) {

    // Get the boundaries of the element.
    var bounds = element.getBoundingClientRect();

    // Check the position of each boundary side.
    if (bounds.top < 0) {
        return false;
    }

    if (bounds.left < 0) {
        return false;
    }

    if (bounds.right > document.documentElement.clientWidth) {
        return false;
    }

    if (bounds.bottom > document.documentElement.clientHeight) {
        return false;
    }

    // Element is completely within viewport.
    return true;

}


/**
 * Generates a random hexadecimal color.
 */
function randomColor() {
    var color = "#";

    for (var i = 0; i < 3; i++) {
        color += randomColor.hex[randomInt(0, randomColor.hex.length)];
    }

    return color;
}


/**
 * Hexadecimal values which randomColor may sample from.
 */
randomColor.hex = '369ABC'.split('');
