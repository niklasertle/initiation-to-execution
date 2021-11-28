const { Schema, model } = require("mongoose");

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
