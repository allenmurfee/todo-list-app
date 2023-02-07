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
        return {};
        // }
      } catch (error) {
        console.log(error);
      }

      // throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    //Add User
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },

    //Add Project
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
      // const todo = await ToDo.create(description);

      const project = await Project.findByIdAndUpdate(
        projectId,
        { $push: { toDos: { description } } },
        { new: true }
      );

      return project;
    },

    // Update to do status
    updateToDo: async (parent, { projectId, toDoId, status }) => {
      console.log("****************update to do route firing");
      console.log("project id", projectId);
      console.log("toDo id", toDoId);
      console.log("toDo status", status);

      try {
        if (status === "notStarted") {
          const project = await Project.findByIdAndUpdate(
            projectId,
            { $set: { toDos: { _id: toDoId, status: "InProgress" } } },
            { new: true }
          );

          return project;
        } else if (status === "InProgress") {
          console.log("firing");
          const project = await Project.findByIdAndUpdate(
            projectId,
            { $set: { toDos: { _id: toDoId, status: "finished" } } },
            { new: true }
          );
          return project;
        }
      } catch (error) {
        console.log(error);
      }
      //   if (status === "notStarted") {
      //     console.log("not started firing");
      //     const project = await ToDo.findByIdAndUpdate(
      //       toDoId,
      //       { $set: { status: "InProgress" } },
      //       { new: true }
      //     );

      //     return project;
      //   } else if (status === "InProgress") {
      //     console.log("in progress firing");
      //     const project = await ToDo.findByIdAndUpdate(
      //       toDoId,
      //       { $set: { status: "finished" } },
      //       { new: true }
      //     );
      //     return project;
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },

    //Delete Project from User
    removeProjectFromUser: async (parent, { userId, projectId }) => {
      console.log("**************USER ID", userId);
      console.log("hitting removeProjectFromUser route");
      const project = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { projects: { _id: projectId } } },
        { new: true }
      );

      console.log("*****Project", project);
      return project;
    },

    //Delete Project
    deleteProject: async (parent, { projectId }) => {
      console.log("delete project route hitting - projectId:", projectId);
      const project = await Project.findOneAndDelete(
        { _id: projectId },
        { new: true }
      );
      return project;
    },

    //Delete To Do
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

    //Login
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
