const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

// CORS е функция, която ограничава HTTP заявките с кръстосан произход с други сървъри и посочва кои домейни имат достъп до вашите ресурси.

const socketIO = require('socket.io')(http, {
  //Cross-Origin Resource Sharing (CORS)
    cors: {
        origin: "http://localhost:3000"
    }
});

//функцията app.get() на Express позволява да се дефинира route handler
//за get заявки към даден url 

app.get('/api', (req, res) => {//Express ще извика route handler,когато получи                         //http get заявка към /api
  res.json({
    message: 'Hello world',
  });
});

let users = [];
console.log(users)
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Слуша и записва съобщението в конзолата
  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', data);
  });

    //Слуша за нов потребител, който иска да се присъедини към сървъра
    socket.on('newUser', (data) => {
      //Въвежда новия потребител лъм списъска с потребители
      users.push(data);
      // console.log(users);
      //Изпраща списъка с потрбители на клиента
      socketIO.emit('newUserResponse', users);
    });
