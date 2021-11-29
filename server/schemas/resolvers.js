const { AuthenticationError } = require("apollo-server-errors");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");
const { Types } = require("mongoose");

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Not logged in");
    },
    projects: async (parent, { userId }) => {
      return await Project.find({
        users: Types.ObjectId(userId),
      });
    },
    project: async (parent, { projectId }) => {
      // Return everything in each array
      return await Project.findOne({ _id: projectId }).populate([
        "message",
        "calendar",
        "kanban",
        "users",
      ]);
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        return res.status(400).json({ message: "Something is wrong!" });
      }
      const token = signToken(user);
      return { token, user };
    },
    createProject: async (
      parent,
      { title, description, startDate, endDate },
      context
    ) => {
      const project = await Project.create({
        title,
        description,
        startDate,
        endDate,
      });

      const updatedProject = await Project.findOneAndUpdate(
        { _id: project._id },
        { $addToSet: { users: context.user._id } },
        { new: true, runValidators: true }
      );

      return updatedProject;
    },
    addUserToProject: async (parent, { projectId, userId }) => {
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { users: userId } },
        { new: true, runValidators: true }
      );

      return updatedProject;
    },
    deleteProject: async (parent, { projectId }) => {
      await Project.remove({ _id: projectId });

      return { message: "Project deleted successfully" };
    },
    addKanban: async (parent, { projectId, title, description }, context) => {
      const newKanban = {
        title,
        description,
        userId: context.user._id,
      };

      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { kanban: newKanban } },
        { new: true, runValidators: true }
      );

      return updatedProject;
    },
    updateKanbanStatus: async (parent, { projectId, kanbanId, status }) => {
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, kanban: { $elemMatch: { _id: kanbanId } } },
        { $set: { "kanban.$.status": status } },
        { new: true, safe: true, upsert: true }
      );

      return updatedProject;
    },
    deleteKanban: async (parent, { projectId, kanbanId }) => {
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $pull: { kanban: { _id: kanbanId } } },
        { new: true }
      );

      return updatedProject;
    },
    addMessage: async (parent, { projectId, message }, context) => {
      const newMessage = {
        message,
        userId: context.user._id,
      };

      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { calendar: newMessage } },
        { new: true, runValidators: true }
      );

      return updatedProject;
    },
  },
};

module.exports = resolvers;
