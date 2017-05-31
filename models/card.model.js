'use strict';

let mongoose = require ( 'mongoose' ),
    Schema = mongoose.Schema;

let CardSchema = new Schema ({
  name: String,
  text: String,
  rarity: String,
  cost: Number,
  attack: Number,
  health: Number,
  tribe: String
});

mongoose.model('Card', CardSchema);
