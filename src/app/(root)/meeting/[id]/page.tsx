
'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/customHooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

function Meeting({ params: { id } }: { params: { id: string } }) {

  const { user, isLoaded } = useUser()
  const [isAudioVideoSetupComplete, setIsAudioVideoSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading ) return <Loader />
    
  

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isAudioVideoSetupComplete ? (<MeetingSetup setIsAudioVideoSetupComplete={setIsAudioVideoSetupComplete} />) : (<MeetingRoom />)}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting