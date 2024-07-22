import MeetingTypes from '@/components/MeetingTypes'
import React from 'react'

function Home() {
  const now = new Date()
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'  })).format(now)
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})

  const bgImage = ['bg-hero1','bg-hero2','bg-hero3','bg-hero4','bg-hero5']

  return (

    

    <section className='flex size-full flex-col gap-10 text-white'>
        <div
        className={`h-[300px] w-full rounded-[20px] ${bgImage[Math.floor(Math.random() * 5)]} bg-cover`}
        >
          <div className='flex h-full flex-col max-md:px-5 max-md:py-8 lg:p-11 items-end justify-end'>
            
            <div
            className=' flex flex-col gap-2 max-w-96 '
            >
              <h1 className='  text-4xl font-extrabold lg:text-6xl'>
                {time}
              </h1>
              <p className=' text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
            </div>
          </div>
        </div>

        <MeetingTypes />
    </section>
  )
}

export default Home