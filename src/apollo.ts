import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

// Create HTTP link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Create auth link (for future authentication if needed)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Add any authentication headers here if needed
      'Content-Type': 'application/json',
    }
  };
});

// Create an Apollo Client instance with enhanced configuration
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: {
            // Enable caching for projects query - always use incoming data
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  connectToDevTools: import.meta.env.DEV, // Enable Apollo DevTools only in development
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;
