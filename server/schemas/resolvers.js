const { AuthenticationError } = require("apollo-server-errors");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        // Find all projects where the user._id is in the users array
        const projects = await Project.findAll({ users: context.user._id });

        return { user, projects };
      }
      throw new AuthenticationError("Not logged in");
    },
    projects: async (parent, { userId }) => {
      return await Project.findOne({ users: context.user._id });
    },
    project: async (parent, { projectId }) => {
      // Return everything in each array
      return await Project.findOne({ _id: projectId }).populate([
        "message",
        "calendar",
        "khanBan",
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
    createProject: async (parent, { title, description, startDate, endDate }, context) => {
      const project = await Project.create({ title, description, startDate, endDate});

      const updatedProject = await Project.findOneAndUpdate(
        { _id: project._id },
        { $addToSet: { users: context.user._id } },
        { new: true, runValidators: true }
      );

      return updatedProject;
    },
    updateProject: async (parent, args) => {
      // Update the project with the ID and return
    },
    addUserToProject: async (parent, args) => {
      // Find project by ID
      // Push the new user ID into users array
    },
    deleteProject: async (parent, args) => {
      // Delete a project by ID
    },
    addCalendar: async (parent, args, context) => {
      // Get the project
      // Create a calendar event
      // Push into calendar array on project
    },
    updateCalendar: async (parent, args) => {
      // Find project by ID
      // Find calendar event in array on the project
      // Update the isComplete from false to true
    },
    deleteCalendar: async (parent, args) => {
      // Delete calendar event by ID
    },
    addKhanBan: async (parent, args, context) => {
      // Get project by ID
      // Add Khan Ban post to array
      // Return the project
    },
    updateKhanBan: async (parent, args, context) => {
      // Get project by ID
      // Get khanBan event by ID
      // Update the status
      // Return project
    },
    deleteKhanBan: async (parent, args) => {
      // Get project by ID
      // Remove KhanBan by ID from the array
      // Return project
    },
    addMessage: async (parent, args, context) => {
      // Get project by ID
      // Add message to the array
      // Return project
    },
  },
};

module.exports = resolvers;
