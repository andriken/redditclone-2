import React from 'react'
import Image from 'next/image'
import { 
  BellIcon,
  PlusIcon,
  ChatIcon,
  GlobeIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon, 
  MenuIcon} from '@heroicons/react/outline';
import { BeakerIcon, HomeIcon, ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from 'next-auth/react';


const Header = () => {

  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm space-x-2">
        <div className='relative flex-shrink-0 cursor-pointer'>
            <Image src="/images/reddit-logo.png" alt='' width="90" height="40" />
            
        </div>

        <div className="mx-7 flex items-center xl:min-w-[300px]">
            <HomeIcon className="h-5 w-5" />
            <p className="ml-2 hidden flex-1 lg:inline">Home</p>
            <ChevronDownIcon  className="h-5 w-5" />
            
        </div>

        <form className="flex flex-1 items-center space-x-2
          rounded-sm border border-gray-200 bg-gray-100 py-3 px-1">
          <SearchIcon className="w-6 h-6 text-gray-400" />
          <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Reddit" />
          <button type="submit" hidden />
        </form>

        <div className="space-x-2 text-gray-500 items-center
          hidden lg:inline-flex">
          <SparklesIcon className="icon" />
          <GlobeIcon className="icon" />
          <VideoCameraIcon className="icon" />
          <hr className="h1-10 border border-gray-100" />
          <ChatIcon className="icon" />
          <BellIcon className="icon" />
          <PlusIcon className="icon" />
          <SpeakerphoneIcon className="icon" />
        </div>

        <div className="ml-5 flex items-center lg:hidden">
          <MenuIcon className="icon" />
        </div>

      {
        session ? (
          <div onClick={() => signOut()} className="hidden items-center lg:flex space-x-2 border
          border-gray-100 p-2 cursor-pointer">
          <div className="relative h-5 w-5 flex-shrink-0">
            <img src="/images/reddit-auth-logo.png" alt="" />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />

        </div>
        ) : 
        ( <div onClick={() => signIn()} className="hidden items-center lg:flex space-x-2 border
          border-gray-100 p-2 cursor-pointer">
            <div className="relative h-5 w-5 flex-shrink-0">
              <img src="/images/reddit-auth-logo.png" alt="" />
            </div>

            <p className="text-gray-400">Sign In</p>
          </div> )

      }

    </div>
  )
}

export default Header