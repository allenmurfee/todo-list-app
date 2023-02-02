import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AddNew from "./components/AddNew";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import LoginSignup from "./pages/LoginSignup";

import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <TodoListProvider> */}
          <Header />
          <Routes>
            <Route path ="/login" element = {<LoginSignup />} />
            <Route path ="/profile" element = {<Profile />} />
          </Routes>
          <Project />
          <AddNew />
          <Footer />
        {/* </TodoListProvider> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
