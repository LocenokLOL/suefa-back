const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{'origin':'*'}});

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/'));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next();
});
const mobile = io.of('/mobile');

let code = null;
let isMobileUp = false;
let firstPlayer = true;

mobile.on('connection',(socket)=>{
    socket.on('joinRoom', () => {
        if (firstPlayer){
            socket.join('firstPlayer');
            firstPlayer = false;
            
        }
        else{
            socket.join('secondPlayer');
            
        }
        
    });


    socket.on('connectFromPC', ()=>{
        console.log('Клиент подключился с компьютера');
    });

    socket.on('connectFromMobile',()=>{
        console.log('Клиент подключился с мобильного устройства');
    });

    socket.on('enterPassword', (enteredPassword) => {
        console.log(`Мобильный клиент ввел пароль: ${enteredPassword}`);
        if(enteredPassword === code){
            mobile.emit('passwordRight');
        } else {
            mobile.emit('passwordWrong');
        }
    });
    socket.on('codeMessage',(password)=>{
       code = password;
    });

    socket.on('downButtonClick', () => {
        console.log('Клиент нажал на кнопку вниз с мобильного устройства');
        mobile.emit('downButtonClickOnMobile');
    });
    socket.on('upButtonClick', () => {
        console.log('Клиент нажал на кнопку вверх с мобильного устройства');
        mobile.emit('upButtonClickOnMobile');
    });
    socket.on('leftButtonClick', () => {
        console.log('Клиент нажал на кнопку влево с мобильного устройства');
        mobile.emit('leftButtonClickOnMobile');
    });
    socket.on('rightButtonClick', () => {
        console.log('Клиент нажал на кнопку вправо с мобильного устройства');
        mobile.emit('rightButtonClickOnMobile');
    });
    socket.on('enterButtonClick', () => {
        console.log('Клиент нажал на кнопку ввода с мобильного устройства');
        mobile.emit('enterButtonClickOnMobile');
    });
    socket.on('disconnecting', () => {
        const rooms = Object.keys(socket.rooms);
        console.log('user is leaving rooms:', rooms);
    });
    socket.on('disconnect', () => {
        console.log('Клиент с мобильного устройства отключился');
    });
    socket.on('backButtonClick',() =>{
        mobile.emit('backButtonClickOnMobile');
    });
    socket.on('pingPongDownButtonClicked',()=>{
        if (socket.rooms.has('firstPlayer')){
            console.log('первый игрок нажал кнопку вниз');
            mobile.emit('firstPingPongDownButtonClickOnMobile');
        }
        if (socket.rooms.has('secondPlayer')){
            console.log('второй игрок нажал кнопку вниз');
            mobile.emit('secondPingPongDownButtonClickOnMobile');
        }
    });
    socket.on('pingPongUpButtonClicked',()=>{
        if (socket.rooms.has('firstPlayer')){
            console.log('первый игрок нажал кнопку вверх');
            mobile.emit('firstPingPongUpButtonClickOnMobile');
        }

        if (socket.rooms.has('secondPlayer')){
            console.log('второй игрок нажал кнопку вверх')
            mobile.emit('secondPingPongUpButtonClickOnMobile');
        }
    });
    socket.on('pingPongUpButtonIsUp',()=>{
        if (socket.rooms.has('firstPlayer'))
            console.log('отжал кнопку');
            mobile.emit('firstPingPongUpButtonIsUpOnMobile');
        if (socket.rooms.has('secondPlayer'))
            mobile.emit('secondPingPongUpButtonIsUpOnMobile');
    });
    socket.on('pingPongDownButtonIsUp',()=>{
        if (socket.rooms.has('firstPlayer'))
            mobile.emit('firstPingPongDownButtonIsUpOnMobile');
        if (socket.rooms.has('secondPlayer'))
            mobile.emit('secondPingPongDownButtonIsUpOnMobile');
    });

});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});








