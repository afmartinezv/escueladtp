'use strict';

import express from 'express';
import { pruebas, saveUser, loginUser, updateUser } from '../controllers/user.js';
const api = express.Router();
import md_auth from '../middlewares/authenticated.js';

api.get('/probando-controlador', md_auth.ensureAuth, pruebas);
api.post('/register', saveUser);
api.post('/login', loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, updateUser);

export default api;

