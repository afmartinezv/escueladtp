/*'use strict'

var express = require ('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

module.exports = app;*/
import express from 'express';
import userRoutes from './routes/user.js';
import fileUpload from 'express-fileupload';

const app = express();


app.use(fileUpload());

const server = express();
const puerto = 4300;

server.set('port', puerto);
server.use(express.json());

server.use('/api', userRoutes);



export default server;