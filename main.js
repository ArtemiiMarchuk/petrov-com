const eyeSvg = document.querySelector('.main__eye svg')
const eyePath = document.querySelector('.curve')
const eyeCircle = document.querySelector('.circle')

const svgDistance = eyeSvg.getBoundingClientRect();

const svgCenter = [svgDistance.x + (svgDistance.right - svgDistance.left) / 2, svgDistance.y + (svgDistance.bottom - svgDistance.top) / 2]

const totalPathUnit = eyePath.getTotalLength() / 4

const pathSplit = [
    [totalPathUnit, 2 * totalPathUnit],
    [2 * totalPathUnit, 3 * totalPathUnit],
    [3 * totalPathUnit, 4 * totalPathUnit],
    [0, totalPathUnit],
]

const handleMouseMove = (event) => {
    const point = [event.pageX, event.pageY]
    let pathToProceed = 0

    if (point[0] < svgCenter[0]) {
        if (point[1] < svgCenter[1]) {
            pathToProceed = 0
        } else {
            pathToProceed = 3
        }

    } else {
        if (point[1] < svgCenter[1]) {
            pathToProceed = 1
        } else {
            pathToProceed = 2
        }
    }

    const closestPointRes = closestPoint(eyePath, point, [svgDistance.x, svgDistance.y], pathSplit[pathToProceed][0], pathSplit[pathToProceed][1]);

    eyeCircle.setAttribute('cx', closestPointRes[0]);
    eyeCircle.setAttribute('cy', closestPointRes[1]);
}

document.onmousemove = handleMouseMove