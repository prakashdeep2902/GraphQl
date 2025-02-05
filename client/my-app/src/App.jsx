import { useQuery, gql } from "@apollo/client";
import React from "react";

const query = gql`
  query GetTodosWithUsers {
    getTodos {
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(query);

  console.log(data);
  if (loading) return <h1>Loading...</h1>;
  if (!data || !data.getTodos) return <h1>No data found</h1>;

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.title}> {/* Ensuring key prop */}
              <td>{todo.title}</td>
              <td>{todo.user?.name || "Unknown User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
