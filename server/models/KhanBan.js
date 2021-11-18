const { Schema } = require("mongoose");

const khanBanSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    required: true,
    default: 'To-Do'
  },
});

module.exports = khanBanSchema;
