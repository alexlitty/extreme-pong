/**
 * Adds a class to an element.
 */
function addClass(element, name) {
    
    // Bad element.
    if (!element) {
        console.warn("Adding '" + name + "' class to invalid element: ", element);
        return;
    }

    // Add class.
    element.className += name + " ";

}


/**
 * Removes a class from an element.
 */
function removeClass(element, name) {

    // Bad element.
    if (!element) {
        console.warn("Removing '" + name + "' class from invalid element: ", element);
        return;
    }

    // Remove class with a regex.
    var regex = new RegExp('(?:^|\\s)' + name + '(?!\\S)', 'g');
    element.className = element.className.replace(regex, '');

}


/**
 * Retrieves an element by its ID.
 */
var getElement = document.getElementById.bind(document);


/**
 * Hides an element.
 */
function hideElement(element) {
    addClass(element, "hidden");
}


/**
 * Un-hides an element.
 */
function showElement(element) {
    removeClass(element, "hidden");
}
