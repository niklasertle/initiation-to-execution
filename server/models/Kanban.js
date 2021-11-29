const { Schema } = require("mongoose");

const kanbanSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    default: 'To-Do'
  },
});

module.exports = kanbanSchema;
