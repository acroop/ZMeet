
"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function CallEndButton() {

    const call = useCall()
    const router = useRouter()
    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()

    const isMeetingCreator = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

    if (!isMeetingCreator) {
        return null;
    }

  return (
    <Button onClick={async() => {
        await call.endCall()
        router.push('/')
    }} className=' bg-red-500 rounded-3xl'>
        End Call For Everyone
    </Button>
  )
}

export default CallEndButton


