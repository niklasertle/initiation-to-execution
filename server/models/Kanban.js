const { Schema } = require("mongoose");

const kanbanSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String
  },
});

module.exports = kanbanSchema;
