import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeProvider, theme, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Create a new Apollo Client instance with some config
const client = new ApolloClient({
  uri: `${process.env.SERVER_URI}`,
  // Defining a typePolicy to take the incoming data when merging
  // to avoid possible data errors warned by Apollo
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    }
  })
})

// Wrap our app with the Apollo Provider, passing the client instance as prop
function AppWrapped() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <AppWrapped />, 
  document.getElementById('root')
);
