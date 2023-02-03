const { AuthenticationError } = require("apollo-server-express");
const { User, ToDo, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    project: async (parent, { projectId }) => {
      return await Project.findById(_id).populate('toDos');
    },
    projects: async () => {
      return await Project.find().populate('toDos');
    },
    toDos: async () => {
      return await ToDo.find();
    },
    // todos: async (parent, { category, name }) => {
    // },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('projects');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      console.log(user)
      const token = signToken(user);

      return { token, user };
    },
    addProject: async (parent, args) => {
      if (context.user) {
        const project = await Project.create(args);

        await User.findByIdAndUpdate(context.user._id, { $push: {projects: project } });

        return project
      }

      throw new AuthenticationError('Not logged in');
     
      // const token = signToken(user);
      
    },
    addToDo: async (parent, {projectId, description}) => {
      
      const todo = await ToDo.create(description);     
      
      await Project.findByIdAndUpdate(projectId, { $push: {toDos: todo } });

      return todo
    },
    /*updateProject: async (parent, args, context) => {
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
    },*/
    updateToDo: async (parent, { toDoId, description, status }, context) => {
      if (context.user) {
        return await ToDo.findByIdAndUpdate(toDoId, {description: description, status: status});
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteProject: async (parent, { projectId }) => {
      return Profile.findOneAndDelete({ _id: profileId })
      
    },
    deleteToDo: async (parent, { toDoId }) => {
      return Profile.findOneAndDelete({ _id: toDoId })
      
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
