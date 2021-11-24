const { Schema } = require("mongoose");

const calendarSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  dueDate: {
    type: Date,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = calendarSchema;
