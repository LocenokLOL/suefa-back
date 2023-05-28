const socket = io('/mobileController');
    socket.on('rightButtonClickOnMobile', () => {
    moveToRightBlock();
});
    socket.on('leftButtonClickOnMobile', () => {
    moveToLeftBlock();
});
    socket.on('downButtonClickOnMobile', () => {
    moveToDownBlock();
});
    socket.on('upButtonClickOnMobile', () => {
    moveToUpBlock();
});
    socket.on('enterButtonClickOnMobile', () => {
    clickOnCurrentBlock();
});

    function addClass(el, className) {
    if (el.classList) {
    el.classList.add(className);
} else if (!hasClass(el, className)) {
    el.className += " " + className;
}
}

    function removeClass(el, className) {
    if (el.classList) {
    el.classList.remove(className);
} else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
}
}

    function moveToRightBlock() {
    let currentBlock = document.querySelector('.current-block');
    let blockToTheRight = currentBlock.nextElementSibling;
    if (blockToTheRight && blockToTheRight.nodeType === 1) {
    removeClass(currentBlock, 'current-block');
    console.log('удалил класс');
    addClass(blockToTheRight, 'current-block');
}
}
    function moveToLeftBlock() {
    const currentBlock = document.querySelector('.current-block');
    const blockToTheLeft = currentBlock.previousElementSibling;
    if (blockToTheLeft && blockToTheLeft.nodeType === 1) {
    removeClass(currentBlock, 'current-block');
    addClass(blockToTheLeft, 'current-block');
}
}
    function moveToDownBlock() {
    const currentBlock = document.querySelector('.current-block');
    const blockBelow = currentBlock.nextElementSibling;
    if (blockBelow && blockBelow.nodeType === 1) {
    removeClass(currentBlock, 'current-block');
    addClass(blockBelow, 'current-block');
}
}
    function moveToUpBlock() {
    const currentBlock = document.querySelector('.current-block');
    const blockAbove = currentBlock.previousElementSibling
    || currentBlock.previousSibling.previousElementSibling;
    if (blockAbove && blockAbove.nodeType === 1) {
    removeClass(currentBlock, 'current-block');
    addClass(blockAbove, 'current-block');
}
}
    function clickOnCurrentBlock() {
    const currentBlock = document.querySelector('.current-block');
    currentBlock.click();
}

