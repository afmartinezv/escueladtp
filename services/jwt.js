'use strict'

import jwt from 'jwt-simple';
import moment from 'moment';

const secret = 'clave_secreta_curso';

// Función para crear un token JWT a partir de un usuario
export function createToken(user) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // Fecha de emisión del token (ahora)
        exp: moment().add(30, 'days').unix() // Fecha de expiración del token (30 días)
    };

    // Codifica el payload utilizando el secreto y devuelve el token resultante
    return jwt.encode(payload, secret);
}

export default {createToken};