import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://harlingen.stepzen.net/api/lopsided-quokka/__graphql",
    headers: {
        Authorization: `APIKey harlingen::stepzen.net+1000::88da527ea139bb7f1aa6ab5e022cc10c9c465b944fb1d59dd86cd7bee6bdcccc`,
    },
    cache: new InMemoryCache(),
});

export default client;