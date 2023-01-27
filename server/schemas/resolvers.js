const { AuthenticationError } = require("apollo-server-express");
const { User, ToDo, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find();
    },
    todos: async () => {
      return await ToDo.find();
    },
    // todos: async (parent, { category, name }) => {
    // },
  },
  Mutation: {
    addProject: async (parent, args) => {
      const project = await Project.create(args);
      // const token = signToken(user);
    },
    addToDo: async (parent, args) => {
      const todo = await ToDo.create(args);
    },
    updateProject: async (parent, args, context) => {
      if (context.user) {
        return await Project.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProject: async (parent, args, context) => {
      if (context.user) {
        return await ToDo.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
