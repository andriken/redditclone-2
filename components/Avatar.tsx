import { useSession } from 'next-auth/react';
import Image from 'next/image';


type Props = {
    seed?: string
    large?: boolean
}

const Avatar = ({seed, large}: Props) => { // props is of type Props
    const { data: session } = useSession(); 

  return (
    <div className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${large && 'h-20 w-20'}`}>
        <Image fill={true} src={`https://avatars.dicebear.com/api/open-peeps/:${seed || session?.user?.name || 'placeholder'}.svg`}
            alt="" />   
    </div>
  )
}

export default Avatar