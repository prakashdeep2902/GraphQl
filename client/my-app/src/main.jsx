import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:5050/graphql",
  cache: new InMemoryCache()
})

const query = `

query getDataFormToDoAndUser {
   getTodos {
    title,
    completed,
    user {
      name
      email
    }
  }

}

`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>

      <App />
    </ApolloProvider>

  </StrictMode>,
)
