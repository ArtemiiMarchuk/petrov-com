function closestPoint(pathNode, point, offset, from, to) {
    var pathLength = to,
        precision = 20,
        best,
        bestLength,
        bestDistance = Infinity;

    // linear scan for coarse approximation
    for (var scan, scanLength = from, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
            best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
    }

    // binary search for precise estimate
    precision /= 2;
    while (precision > 0.5) {
        var before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
            best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
            best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
            precision /= 2;
        }
    }

    best = [best.x, best.y];
    best.distance = Math.sqrt(bestDistance);
    return best;

    function distance2(p) {
        var dx = p.x + offset[0] - point[0],
            dy = p.y+ offset[1] - point[1];
        return dx * dx + dy * dy;
    }
}