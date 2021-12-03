const { Schema } = require("mongoose");

const kanbanSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
});

module.exports = kanbanSchema;
