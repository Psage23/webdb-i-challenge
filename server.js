const express = require('express');

const AccountRouter = require("./accounts/router");

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    return  res.send('<h1> Api is working <h1>')
})

module.exports = server;