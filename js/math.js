/**
 * Types of intersections.
 */
var INTERSECT = {
    VERTICAL: 1,
    HORIZONTAL: 2
};


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
 * Check if two rectangular boundaries are intersecting.
 *
 * Returns the axis of intersection.
 */
function isIntersecting(bounds, otherBounds) {

    // Check if boundaries are not intersecting.
    if (bounds.right < otherBounds.left) {
        return false;
    }

    if (bounds.left > otherBounds.right) {
        return false;
    }

    if (bounds.top > otherBounds.bottom) {
        console.log("Too high");
        return false;
    }

    if (bounds.bottom < otherBounds.top) {
        console.log("Too low");
        return false;
    }

    // Boundaries must be intersecting. Determine on which axis.
    var boundsCenter = getCenter(bounds);
    var otherBoundsCenter = getCenter(otherBounds);

    var wy = (bounds.width + otherBounds.width) * (boundsCenter.y - otherBoundsCenter.y);
    var hx = (bounds.height + otherBounds.height) * (boundsCenter.x - otherBoundsCenter.y);

    if (wy > hx) {
        if (wy > -hx) {
            return INTERSECT.HORIZONTAL;
        } else {
            return INTERSECT.VERTICAL;
        }
    }

    else {
        if (wy > -hx) {
            return INTERSECT.VERTICAL;
        } else {
            return INTERSECT.HORIZONTAL;
        }
    }

}
