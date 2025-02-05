import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

async function getData() {
  const url = "https://jsonplaceholder.typicode.com/todos";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
}

async function startServer() {
  const port = 9090;
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo{
      id:ID!,
      title:String!
      completed:Boolean
    }
     type Query {
       getTodos:[Todo]
      }
    `,
    resolvers: {
      Query: {
        getTodos: async () => await getData(),
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
