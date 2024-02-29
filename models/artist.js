'use strict'

import { Schema as _Schema, model } from 'mongoose';
var Schema = _Schema;

var ArtistSchema = Schema({
    name: String,
    descripcion: String,
    image: String
   
});

export default model('Artist', ArtistSchema);