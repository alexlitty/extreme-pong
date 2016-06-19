/**
 * Returns a random integer.
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Returns the center vector of a boundary.
 */
function getCenter(bounds) {
    return {
        x: bounds.right - bounds.left,
        y: bounds.bottom - bounds.top
    };
}


/**
 * Types of intersections.
 */
var INTERSECT = {
    VERTICAL: 1,
    HORIZONTAL: 2
};


/**
 * Check if two rectangular boundaries are intersecting.
 *
 * Returns the axis of intersection.
 */
function isIntersecting(bounds, otherBounds, velocity) {

    // Check if boundaries are not intersecting.
    if (bounds.right < otherBounds.left) {
        return false;
    }

    if (bounds.left > otherBounds.right) {
        return false;
    }

    if (bounds.top > otherBounds.bottom) {
        return false;
    }

    if (bounds.bottom < otherBounds.top) {
        return false;
    }

    // Boundaries must be intersecting. Determine on which axis.
    if (velocity.x > 0) {

        if (bounds.left < otherBounds.left) {
            return INTERSECT.HORIZONTAL;
        }

        else {
            return INTERSECT.VERTICAL;
        }

    }

    else {

        if (bounds.right > otherBounds.right) {
            return INTERSECT.HORIZONTAL;
        }

        else {
            return INTERSECT.VERTICAL;
        }

    }

}
