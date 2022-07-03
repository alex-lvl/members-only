const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type:String, maxlength: 240, required:true},
    date: {type: Date, default: Date.now},
});

MessageSchema
.virtual('date_formatted')
.get(function () {
  return this.date.toDateString();
});

module.exports = mongoose.model('Message', MessageSchema);