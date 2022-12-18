
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import { GET_ALL_POSTS_BY_POST_ID } from '../../graphql/queries';
import Post from '../../components/Post';
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { SubmitHandler } from 'react-hook-form/dist/types';
import { ADD_COMMENT } from '../../graphql/mutation';
import toast from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago'


type FormData = {
    comment: string
}



const PostPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [ addComment ] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_ALL_POSTS_BY_POST_ID, "getPostListByPostId"],
    }); 

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>()

    // console.log(typeof(router.query.postid), "query");

    const { data, error } = useQuery(GET_ALL_POSTS_BY_POST_ID, {
        variables: {
            post_id: +router.query.postid,
        },
    });

    const post: Post = data?.getPostListByPostId[0];


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // post comment here

        if (!session) {
            toast("You'll need to login to Comment!")
            return;
        }


        const notification = toast.loading("Posting your Comment...");

        await addComment({
            variables: {
                post_id: +router.query.postid,
                username: session?.user?.name,
                text: data.comment
            }
        })

        setValue('comment', '');

        toast.success('Comment Successfully posted', { id: notification });
    }

    // const onSubmit = handleSubmit(async (formData) => {
    //     console.log('Jesus');
    // });

  return (
    <div className='mx-auto my-7 max-w-5xl'>
        <Post post={post} />

        <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5
                pl-16'>
            <p className='text-sm'>
                Comment as <span className='text-red-500'>{session?.user?.name}
                </span>
            </p>

        <form onSubmit={handleSubmit(onSubmit)} className='flex space-y-2 flex-col'>
            <textarea
                {...register('comment')}
                disabled={!session}
                className='h-24 rounded-md border border-gray-200
                p-2 pl-4 outline-none disabled:bg-gray-50'
                placeholder={session ? 'what are your thoughts?' : "Please sign in to comment"} 
            />
            <button
                // disabled={!session}
                className='rounded-full bg-red-500 p-3 font-semibold text-white 
                    disabled:bg-gray-200'
                type='submit'>Comment</button>
        </form>

        </div>

        <div className='-my-5 round-b-md border border-t-0 border-gray-300 bg-white py-5
            px-10'>
            <hr className='py-2' />

            {post?.comments.map(comment => (
                <div className='relative flex items-center space-x-2 space-y-5' key={comment.id}>
                    <hr className='absolute top-10 h-16 left-7 z-0 border' />
                    <div className='z-50'>
                        <Avatar seed={comment.username} />
                    </div>

                    <div className='flex flex-col'>
                        <p className='py-2 text-x2 text-gray-400'>
                            <span className='font-semibold text-gray-600'>{comment.username}</span>{' '}
                            <TimeAgo date={comment.created_at} />
                        </p>
                        <p>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default PostPage;