/**
 * Ensures a value is numeric and finite.
 *
 * Returns true if the value if a number or a numeric string, false otherwise.
 */
function isNumeric(value) {
    
    // Force the value to be a number.
    v = +value;

    // Not a number.
    if (isNaN(v)) {
        return false;
    }

    // Infinite number.
    if (!isFinite(v)) {
        return false;
    }

    // Value is numeric and finite.
    return true;

}
