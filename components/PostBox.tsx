import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar';
import { PhotographIcon, LinkIcon } from '@heroicons/react/outline';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutation';


type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}

const PostBox = () => {
    const { data: session } = useSession(); 

    const [] = useMutation(ADD_POST);

    const [ imageBoxOpen, setImageBoxOpen ] = useState<boolean>(false); // with typeScript making sure the type It returns Is boolean.

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => (
        console.log(formData)
    ));
  return (
    <form
        onSubmit={onSubmit}
        className='sticky top-16 z-50 p-2 border-gray-300 bg-white'>
        <div className='flex space-x-3 items-center'>
            <Avatar />

            <input 
                // below ...register Is a function In a object we destructure It 
                {...register('postTitle', { required: true })}
                disabled={!session}
                type="text"
                className='flex-1 bg-gray-50 p-2 pl-5 outline-none' 
                placeholder={
                    session ? 'Create a Post by Entering a title' : 'Sign In to Post'
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

                <div className='flex items-center px-2'>
                    <p className='m-w-[90px]'>Subreddit</p>
                    <input
                        className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                        {...register('subreddit', { required: true})}
                        type="text" placeholder='Text (optional)'
                    />
                </div>


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
