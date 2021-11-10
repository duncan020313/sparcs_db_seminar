const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    done:{
      type: Boolean,
      default: false
    },
    name: String
  }, {timestamps: true});
  const TodoModel = mongoose.model("todo", schema);
  
  module.exports = TodoModel