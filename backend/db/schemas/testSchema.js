import mongoose from 'mongoose';

export const testSchema = new mongoose.Schema({
    automaticallyUpdatingDate: {type: Date, default: Date.now()},
    items: {type: Array, default: []},
    itemsLen: {type: Number, default: function(){return this.items.length}}
})