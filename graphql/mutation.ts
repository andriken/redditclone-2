import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation( 
        # This Is mutation this has to be called 
        $body: String! 
        $image: String!
        $subreddit: ID!
        $title: String!
        $username: String!
    ) {
        insertPost (
            # When Mutation Is called we InsertPost and also defined the fields we wanna return at the bottom.
            body: $body
            image: $image
            subreddit: $subreddit
            title: $title
            username: $username
        ) {
            # here we return the fields that we are populating after a query call.
            body
            created_at
            image
            subreddit
            title
            username
        }
    }
`
// these are typescript syntax It's graphql syntax and the exclamatory signs tells these are required fields...