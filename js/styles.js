/**
 * Adds a class to an element.
 */
function addClass(element, name) {
    element.className = name;
}


/**
 * Removes a class from an element.
 */
function removeClass(element, name) {
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
    element.className += 'hidden';
}


/**
 * Un-hides an element.
 */
function showElement(element) {
    element.className -= 'hidden';
}
