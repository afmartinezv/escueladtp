'use strict'

import { Schema as _Schema, model } from 'mongoose';
var Schema = _Schema;

var UserSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    artist: {type: Schema.ObjectId, ref: 'Artist'}
});

export default model('Album', AlbumSchema);