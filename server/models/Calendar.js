const { Schema } = require("mongoose");

const calendarSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  dueDate: {
    type: Date,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = calendarSchema;
