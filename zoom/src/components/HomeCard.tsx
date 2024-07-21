import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HomeCardProps {
    title: string
    description: string
    img: string
    className :string
    handleClick: ()=>void

}

function HomeCard({className, title, description, img, handleClick}: HomeCardProps) {
  return (
    <>
    <div
    className={cn(' bg-orange-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}
     onClick={handleClick}
     >
        <div className='flex-center glassmorphism size-12 rounded-[12px]'>

            <Image 
            src={img}
            alt='addmeeting'
            width={27}
            height={27}
            />
        </div>

        <div className='flex flex-col gap-2'>
            <h1 className=' text-2xl font-bold'>
                {title}
            </h1>
            <p className=' text-lg text-white/80'>{description}</p>
        </div>
    </div>
    
    </>
    
  )
}

export default HomeCard