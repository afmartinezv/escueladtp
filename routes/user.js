'use strict';

import express from 'express';
import { pruebas, saveUser, loginUser } from '../controllers/user.js';

const api = express.Router();

api.get('/probando-controlador', pruebas);
api.post('/register', saveUser);
api.post('/login', loginUser);

export default api;

