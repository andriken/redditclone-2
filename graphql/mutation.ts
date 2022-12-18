import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation( 
        # This Is mutation this has to be called 
        $body: String! 
        $image: String!
        $subreddit_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPost (
            # When Mutation Is called we InsertPost and also defined the fields we wanna return at the bottom.
            body: $body
            image: $image
            subreddit_id: $subreddit_id
            title: $title
            username: $username
        ) {
            # here we return the fields that we are populating after a query call.
            body
            created_at
            image
            subreddit_id
            title
            username
        }
    }
`

export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!) {
        insertSubreddit(topic: $topic) { 
            # insert topic and return other fields too..
            id
            topic
            created_at
        }
    }
`

// these are typescript syntax It's graphql syntax and the exclamatory signs tells these are required fields...


export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
        insertComment(post_id: $post_id, username: $username, text: $text) { 
            # insert topic and return other fields too..
            id
            post_id
            text
            username
        }
    }
`


export const ADD_VOTE = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
        insertVote(post_id: $post_id, username: $username, upvote: $upvote) { 
            # insert topic and return other fields too..
            id
            created_at
            post_id
            upvote
            username
        }
    }
`