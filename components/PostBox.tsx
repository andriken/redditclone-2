import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar';
import { PhotographIcon, LinkIcon } from '@heroicons/react/outline';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutation';
import client from '../apollo-client'; // client to query Graphql
import { GET_SUBREDDIT_BY_TOPIC, GET_ALL_POSTS } from '../graphql/queries'; // custom grphql query 
import toast from 'react-hot-toast';



type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}


type Props = {
    subreddit?: string 
}


const PostBox = ({ subreddit }: Props) => {
    const { data: session } = useSession(); 

    const [addPost] = useMutation(ADD_POST, {
        refetchQueries : [GET_ALL_POSTS, 'getPostList']
    });
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const [ imageBoxOpen, setImageBoxOpen ] = useState<boolean>(false); // with typeScript making sure the type It returns Is boolean.

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading('Creating New Post...')
        console.log(formData)

        try {
            console.log("starting...");


            const { data : { getSubredditListByTopic: subreddit_list }  } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subreddit // we check here If this data subreddit from form exists In database.
                }

            });
            
            console.log(subreddit_list, "getSubredditListByTopic");

            
            const subredditExists = subreddit_list.length > 0; // will be [] of found subreddit's

            console.log(subredditExists, "SubredditExists")

            if (!subredditExists) {
                // create subreddit
                const { data: { insertSubreddit: newSubreddit}} = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })


                console.log('Creating a Post...', formData);
                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                console.log("new post added", newPost)

            } else {
                console.log('Using existing subreddit!');
                console.log(subreddit_list);

                const image = formData.postImage || ''

                const { data: { insertPost: newPost} } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: subreddit_list[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                console.log('New Post was added');
            }

            toast.success('New Post Created...', {
                id: notification
            })

        } catch (error) {
            console.log(error, "Error Detail")
            toast.error("Whoops Something went wrong...");
        }

    });




  return (
    <form
        onSubmit={onSubmit}
        className='sticky top-16 z-50 p-2 border-gray-300 bg-white'>
        <div onClick={() => { !session && toast("Sign In to post please!") }} className='flex space-x-3 items-center'>
            <Avatar />

            <input 
                // below ...register Is a function In a object we destructure It 
                {...register('postTitle', { required: true })}
                disabled={!session}
                type="text"
                className='flex-1 bg-gray-50 p-2 pl-5 outline-none' 
                placeholder={
                    session ? subreddit ? `Create a post in r/${subreddit}` : 'Create a Post by Entering a title' : 'Sign In to Post'
            } /> 


            <PhotographIcon 
                onClick={() => setImageBoxOpen(!imageBoxOpen)}
                className={`h-6 text-gray-300 cursor-pointer
                    ${imageBoxOpen && 'text-blue-300'}`} />
            <LinkIcon className="h-6 text-gray-300" />
        </div>

        {!!watch('postTitle') && (
            <div className='flex flex-col py-2'>
                <div className='flex items-center px-2'>
                    <p className='m-w-[90px]'>Body</p>
                    <input
                        className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                        {...register('postBody')}
                        type="text" placeholder='Text (optional)'
                    />
                </div>


                {!subreddit && (
                    <div className='flex items-center px-2'>
                        <p className='m-w-[90px]'>Subreddit</p>
                        <input
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                            {...register('subreddit', { required: true})}
                            type="text" placeholder='Text (optional)'
                        />
                    </div>
                )}


                {imageBoxOpen && (
                    
                <div className='flex items-center px-2'>
                    <p className='m-w-[90px]'>Image URL:</p>
                    <input
                        className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                        {...register('postImage')}
                        type="text" placeholder='Optional...'
                    />
                </div>
                )}


                {Object.keys(errors).length > 0 && (
                    <div className='space-y-2 py-2 text-red-500'>
                        {errors.postTitle?.type === 'required' && (
                            <p>A Post Title Is required!</p>
                        )}
                        {errors.subreddit?.type === 'required' && (
                            <p>A Subreddit Is required!</p>
                        )}
                    </div>
                )}


                {!!watch('postTitle') && (
                    <button 
                        type='submit'
                        className='w-full rounded-full bg-blue-400 text-white'
                    >
                        Create Post
                    </button>

                )}

            </div>
        )}
    </form>
  )
}

export default PostBox
