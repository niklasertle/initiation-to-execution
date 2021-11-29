const { Schema, model } = require("mongoose");

const kanbanSchema = require("./Kanban");
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
  kanban: [kanbanSchema],
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
