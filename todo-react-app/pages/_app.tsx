import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "todomvc-app-css/index.css";

const HOST = process.env.NEXT_PUBLIC_DB_HOST;

const client = new ApolloClient({
  uri: `${HOST}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            merge(existing = [], incoming: any[]) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
