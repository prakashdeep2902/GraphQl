import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import user from "./user.js";
import todo from "./todo.js";

async function startServer() {
  const port = 5050;
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
     type User{
      id:ID!,
      name:String!,
      username:String!,
      email:String!,
      phone:String!,
      website:String!
     }
  
     type Todo {
      id:ID!,
      title:String!
      completed:Boolean
      user:User
    }
     type Query {
       getTodos:[Todo]
       getAllUsers:[User]
       getUserByID(id:ID!):User
      }
    `,
    resolvers: {
      Todo: {
        user: (todo) => user.find((e) => e.id == todo.id),
      },

      Query: {
        getTodos: () => todo,
        getAllUsers: () => user,
        getUserByID: (parent, { id }) => user.find((e) => e.id == id),
      },
    },
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
}

startServer();
