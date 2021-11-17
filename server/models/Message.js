const { Schema } = require("mongoose");

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = messageSchema;
