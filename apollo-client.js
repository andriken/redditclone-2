import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://harlingen.stepzen.net/api/lopsided-quokka/__graphql",
    headers: {
        authorization: `Apikey ${process.env.NEVT_PUBLIC_STEPZEN_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;