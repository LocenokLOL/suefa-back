socket = io('/mobile');
socket.on('connection',()=>{
    console.log('Подключился с мобилки');
    socket.emit('connectFromMobile');
});
function checkPassword() {
    const passwordInput = document.getElementById("password");
    const enteredPassword = passwordInput.value;
    socket.emit('enterPassword',enteredPassword);
}
socket.on('passwordRight',()=>{
    goToPage();
});
socket.on('passwordWrong',()=>{
    alert('неверный код');
});
function goToPage() {
    window.location.href = "mobile.html"; // замените ссылку на ту, которую нужно открыть
}
