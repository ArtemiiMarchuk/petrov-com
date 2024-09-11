const eyeCenter = document.querySelector('.main__eyeCenter')
const eyeSvg = document.querySelector('.main__eye svg')
const eyePath = document.querySelector('.curve')
const eyeCircle = document.querySelector('.circle')

const svgDistance = eyeSvg.getBoundingClientRect();

const handleMouseMove = (event) => {
    const {pageX: x, pageY: y} = event
    const {innerWidth: width, innerHeight: height} = window
    const percentX = 100 * x / innerWidth
    const percentY = 100 * y / innerHeight


    const resultX = percentX
    const resultY = percentY

    /*eyeCenter.style.left = resultX + '%'
    eyeCenter.style.top = resultY + '%'*/

    const closestPointRes = closestPoint(eyePath, [event.pageX, event.pageY], [svgDistance.x, svgDistance.y]);
    eyeCircle.setAttribute('cx', closestPointRes[0]);
    eyeCircle.setAttribute('cy', closestPointRes[1]);
}

document.onmousemove = handleMouseMove