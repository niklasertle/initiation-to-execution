const { Schema, model } = require("mongoose");

const calendarSchema = require("./Calendar");
const khanBanSchema = require("./KhanBan");
const messageSchema = require("./Message");

const projectSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  calendar: [calendarSchema],
  khanBan: [khanBanSchema],
  messages: [messageSchema],
  startDate: {
    type: String,
    default: Date.now()
  },
  endDate: {
    type: String
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
