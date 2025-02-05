const scrollableAre = document.querySelector('.main__frame');
const scrollableAreContent = document.querySelector('.main__text')
const textShadow = document.querySelector('.main__textShadow')


const onScroll = () => {
    const parentPos = scrollableAre.getBoundingClientRect();
    const childPos = scrollableAreContent.getBoundingClientRect();
    const bottomOffset = childPos.bottom - parentPos.bottom;

    textShadow.style.opacity = (bottomOffset <= 0 ? 0 : 1).toString()
}

scrollableAre.addEventListener('scroll', onScroll)

onScroll()