/**Creating three mandatory fields using Mongoose Schema */

const mongoose = require('mongoose');

const petSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  color:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Pets', petSchema);