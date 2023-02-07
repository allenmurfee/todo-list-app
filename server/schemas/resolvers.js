const { AuthenticationError } = require("apollo-server-express");
const { User, ToDo, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    project: async (parent, { projectId }) => {
      // console.log("************ Project found by ID");
      console.log(await Project.findById(projectId).populate("toDos"));
      return await Project.findById(projectId).populate("toDos");
    },
    projects: async () => {
      return await Project.find().populate("toDos");
    },
    toDos: async () => {
      return await ToDo.find();
    },
    // todos: async (parent, { category, name }) => {
    // },
    user: async (parent, args, context) => {
      try {
        // console.log("Querying user");
        // // console.log(email)
        console.log("CONTEXT***********************");
        console.log(context.user);
        // console.log(context)
        if (context.user) {
          return await User.findById(context.user._id).populate("projects");
        }
        // console.log(await User.findOne(email));
        // // return await User.find()
        // return await User.findOne({ email });

        // }
      } catch (error) {
        console.log(error);
      }

      // throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },
    addProject: async (parent, args) => {
      if (context.user) {
        const project = await Project.create(args);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { projects: project },
        });

        return project;
      }

      // throw new AuthenticationError('Not logged in');

      // const token = signToken(user);
    },
    addToDo: async (parent, { projectId, description }) => {
      const todo = await ToDo.create(description);

      await Project.findByIdAndUpdate(projectId, { $push: { toDos: todo } });

      return todo;
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
    // updateToDo: async (parent, { toDoId, description, status }, context) => {
    //   if (context.user) {
    //     return await ToDo.findByIdAndUpdate(toDoId, {description: description, status: status});
    //   }

    //   // throw new AuthenticationError("Not logged in");
    // },
    deleteProject: async (parent, { projectId }) => {
      console.log("delete project route hitting - projectId:", projectId);
      return Project.findByIdAndDelete(projectId);
    },
    deleteToDo: async (parent, { toDoId, projectId }) => {
      console.log("**************TODO ID", toDoId);
      console.log("hitting deleteToDo route");
      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $pull: { toDos: { _id: toDoId } } },
        { new: true }
      );

      console.log("*****Project", project);
      return project;
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.isCorrectPassword(password);
        console.log("**********************");
        console.log("correct password below");
        console.log(correctPw);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        console.log("Token here");
        console.log(token);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
