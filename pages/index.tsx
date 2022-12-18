import Head from 'next/head'
import { NextPage } from 'next'
import PostBox from '../components/PostBox'
import Feed from '../components/Feed'

export const Home: NextPage = () => { // we are saying our Home component Is of type NextPage
  return (
    <div className="max-w-5xl mx-auto my-7">
      <Head>

      </Head>

      {/* Post */}
      <PostBox />

      <div>
          {/* Feed */}
          <Feed />
      </div>  

    </div>
  )
}

export default Home;
