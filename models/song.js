'use strict'

import { Schema as _Schema, model } from 'mongoose';
var Schema = _Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});

export default model('Song', SongSchema);