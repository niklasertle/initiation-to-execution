const { Schema, model } = require("mongoose");

const calendarSchema = require("./Calendar");
const khanBanSchema = require("./KhanBan");
const messageSchema = require("./Message");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  calendar: [calendarSchema],
  khanBan: [khanBanSchema],
  messages: [messageSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
