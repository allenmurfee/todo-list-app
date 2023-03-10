const { AuthenticationError } = require("apollo-server-express");
const { User, ToDo, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    project: async (parent, { projectId }) => {
      console.log(await Project.findById(projectId).populate("toDos"));
      return await Project.findById(projectId).populate("toDos");
    },
    projects: async () => {
      return await Project.find().populate("toDos");
    },
    // toDos: async () => {
    //   return await ToDo.find();
    // },
    // todos: async (parent, { category, name }) => {
    // },
    user: async (parent, args, context) => {
      try {
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
    addProject: async (parent, { userId, title, description, deadline }) => {
      //if (context.user) {
      const project = await Project.create(args);

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { projects: { title, description, deadline } },
        },
        { new: true }
      );

      return user;
      //}

      // throw new AuthenticationError('Not logged in');

      // const token = signToken(user);
    },
    addProjectToDb: async (
      parent,
      { title, description, deadline },
      context
    ) => {
      console.log("addProjectToDb route being hit");
      const project = await Project.create({ title, description, deadline });
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { projects: project._id } },
        { new: true }
      );
      console.log(project);
      return project;
      //}
    },
    // addProjectToUser: async (parent, { userId, projectId }) => {
    //   console.log("addProjectToUser route being hit");
    //   console.log(userId);
    //   console.log(projectId);
    //   const project = await User.findByIdAndUpdate(
    //     userId,
    //     { $push: { projects: projectId } },
    //     { new: true }
    //   );
    //   console.log("project", project);
    //   return project;
    // },

    addToDo: async (parent, { projectId, description }) => {
      // const todo = await ToDo.create(description);

      const project = await Project.findByIdAndUpdate(
        projectId,
        { $push: { toDos: { description } } },
        { new: true }
      );
      console.log("project", project);
      return project;
    },

    // Update to do status
    updateToDo: async (parent, { projectId, toDoId, status }) => {
      console.log("****************update to do route firing");
      console.log("project id", projectId);
      console.log("toDo id", toDoId);
      console.log("toDo status", status);

      let changeStatus;
      switch (status) {
        case "notStarted":
          changeStatus = "InProgress";
          break;
        case "InProgress":
          changeStatus = "finished";
          break;
      }
      try {
        const project = await Project.findOneAndUpdate(
          { _id: projectId, "toDos._id": toDoId },
          { $set: { "toDos.$.status": changeStatus } },
          { new: true }
        );
        return project;
      } catch (error) {
        console.log(error);
      }
    },

    //Delete Project from User
    // removeProjectFromUser: async (parent, { userId, projectId }) => {
    //   console.log("**************USER ID", userId);
    //   console.log("hitting removeProjectFromUser route");
    //   const project = await User.findOneAndUpdate(
    //     { _id: userId },
    //     { $pull: { projects: { _id: projectId } } },
    //     { new: true }
    //   );

    //   console.log("*****Project", project);
    //   return project;
    // },

    //Delete Project
    deleteProject: async (parent, { projectId }, context) => {
      console.log("delete project route hitting - projectId:", projectId);
      const project = await Project.findByIdAndDelete(
        { _id: projectId },
        { new: true }
      );
      console.log(context.user._id);
      const user = await User.findByIdAndUpdate(
        context.user._id,
        {
          $pull: { projects:  projectId  },
        },
        { new: true }
      );

      console.log(user);
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
        // console.log("**********************");
        // console.log("correct password below");
        // console.log(correctPw);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        // console.log("Token here");
        // console.log(token);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
