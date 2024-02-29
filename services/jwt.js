'use strict'

import jwt from 'jwt-simple';
import moment from 'moment';

var secret = 'clave_secreta_curso';

export function createToken(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()

    };
    return jwt.encode(payload, secret);
};

export default createToken;