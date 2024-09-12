const eyeSvg = document.querySelector('.main__eye svg')
const eyePath = document.querySelector('.curve')
const eyeCircle = document.querySelector('.circle')
const title = document.querySelector('.main__title')
const menu = document.querySelector('.main__menu')

const svgDistance = eyeSvg.getBoundingClientRect();

const svgCenter = [svgDistance.x + (svgDistance.right - svgDistance.left) / 2, svgDistance.y + (svgDistance.bottom - svgDistance.top) / 2]

const totalPathUnit = eyePath.getTotalLength() / 4

const pathSplit = [
    [totalPathUnit, 2 * totalPathUnit],
    [2 * totalPathUnit, 3 * totalPathUnit],
    [3 * totalPathUnit, 4 * totalPathUnit],
    [0, totalPathUnit],
]

let cursorPointObj = {}
let stopEyeMovement = false

const cursorPoint = new Proxy(cursorPointObj, {
    set: function (target, key, value) {
        target[key] = value;

        if (!stopEyeMovement) {
            handleMouseMove(value)
        }

        return true;
    }
});

document.onmousemove = (event) => {
    cursorPoint.position = {
        x: event.pageX,
        y: event.pageY,
    }
}

const getPathToProceed = (point) => {
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

    return pathSplit[pathToProceed]
}


const handleMouseMove = (mousePoint) => {
    const point = [mousePoint.x, mousePoint.y]
    const pathToProceed = getPathToProceed(point)

    const closestPointRes = closestPoint(eyePath, point, [svgDistance.x, svgDistance.y], pathToProceed[0], pathToProceed[1]);

    eyeCircle.style.transform = `translate(${closestPointRes[0]}px, ${closestPointRes[1]}px)`
}

let timer

const handleClick = () => {
    clearTimeout(timer)
    const isOpen = menu.classList.contains('main__menu-open')

    if (isOpen) {
        menu.classList.remove('main__menu-open')
        eyeCircle.style.strokeWidth = '38px'

        const pathToProceed = getPathToProceed([cursorPoint.position.x, cursorPoint.position.y])
        const closestPointRes = closestPoint(eyePath, [cursorPoint.position.x, cursorPoint.position.y], [svgDistance.x, svgDistance.y], pathToProceed[0], pathToProceed[1]);
        eyeCircle.style.transform = `translate(${closestPointRes[0]}px, ${closestPointRes[1]}px)`

        timer = setTimeout(() => {
            eyeCircle.style.transition = ''
        }, 500)

        stopEyeMovement = false
        return
    }

    stopEyeMovement = true
    eyeCircle.style.transition = 'stroke-width 0.2s, transform 0.5s'
    eyeCircle.style.strokeWidth = '18px'
    eyeCircle.style.transform = `translate(50%, 50%)`
    menu.classList.add('main__menu-open')
}

title.onclick = handleClick
