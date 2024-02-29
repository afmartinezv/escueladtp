'use strict'

import { Schema as _Schema, model } from 'mongoose';
var Schema = _Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

export default model('User', UserSchema);