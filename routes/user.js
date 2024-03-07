'use strict';

import express from 'express';
import { pruebas, saveUser, loginUser, updateUser, uploadImage } from '../controllers/user.js';
const api = express.Router();
import md_auth from '../middlewares/authenticated.js';
import multipart from 'connect-multiparty';

const md_upload = multipart({ uploadDir: './uploads/users' });

api.get('/probando-controlador', md_auth.ensureAuth, pruebas);
api.post('/register', saveUser);
api.post('/login', loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, updateUser);
api.post('/upload-image-user/:id', [
    md_auth.ensureAuth, // Middleware para verificar autenticación
    md_upload, // Middleware para manejar la subida de archivos
    uploadImage // Controlador para la función de subida de imagen de usuario
]);

export default api;

