function path_find_qstar(
    start,
    end,
    numPoints = 20,
    curvature = 0.5,
    noiseFactor = 0.1
) {
    const path = [];
    const controlPoint = djk_offset(start, end, curvature);

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        let lat = q_bez(start[0], controlPoint[0], end[0], t);
        let lng = q_bez(start[1], controlPoint[1], end[1], t);

        // Fuzzing
        if (i > 0 && i < numPoints) {
            lat += (Math.random() - 0.5) * noiseFactor;
            lng += (Math.random() - 0.5) * noiseFactor;
        }

        path.push([lat, lng]);
    }

    return path;
}

function djk_offset(start, end, curvature) {
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;

    const dLat = end[0] - start[0];
    const dLng = end[1] - start[1];
    const offsetLat = -dLng * curvature;
    const offsetLng = dLat * curvature;

    return [midLat + offsetLat, midLng + offsetLng];
}

function q_bez(p0, p1, p2, t) {
    const term1 = p0 * Math.pow(1 - t, 2);
    const term2 = 2 * p1 * t * (1 - t);
    const term3 = p2 * Math.pow(t, 2);
    return term1 + term2 + term3;
}

const pathfind = (start: number[], end: number[]) => {
    const path = path_find_qstar(start, end, 20, 0.5, 0.1);
    console.log(path);
    return path;
};

export function estimatePathDistance(path) {
    let totalDistance = 0;

    for (let i = 1; i < path.length; i++) {
        totalDistance += haversineDistance(path[i - 1], path[i]);
    }

    console.log(totalDistance)
    return totalDistance;
}

function haversineDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(coord1[0]);
    const lat2 = toRadians(coord2[0]);
    const deltaLat = toRadians(coord2[0] - coord1[0]);
    const deltaLon = toRadians(coord2[1] - coord1[1]);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export default pathfind;
