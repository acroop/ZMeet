import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallState, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'

import { useSearchParams } from 'next/navigation'
import CallEndButton from './CallEndButton'
import Loader from './Loader'


type LayoutType = 'grid' | 'speaker-left' | 'speaker-right'

function MeetingRoom() {
  const searchParams = useSearchParams()
  const isPersonalMeet = !!searchParams.get('personal')

  const [layout, setLayout] = useState<LayoutType>('speaker-left')

  const [participants, setParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) {
    return <Loader />
  }

  const CallLayout = () => {

    if (layout === 'grid')
      return (
        <PaginatedGridLayout />
      )
    else if (layout === 'speaker-left')
      return <SpeakerLayout participantsBarPosition="left" />
    else
      return <SpeakerLayout participantsBarPosition="right" />
  }

  return (
    <section className=' text-white pt-4 overflow-hidden relative h-screen w-full'>
      <div className=' relative flex size-full items-center justify-center'>
        <div className=' flex size-full items-center max-w-[1000px]'>
          <CallLayout />
        </div>

        <div className={cn(' hidden ml-2 h-[calc(100vh-80px)] ', { 'show-block': participants })}>
          <CallParticipantsList onClose={() => {
            setParticipants(false)
          }
          } />
        </div>
      </div>

      <div className=' fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5'>
        <CallControls />
        <DropdownMenu>

          <div className=' flex items-center' >
            <DropdownMenuTrigger className=' cursor-pointer rounded-3xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]' >
              <LayoutList size={20} className=' text-white' />
            </DropdownMenuTrigger>
          </div>

          
          <DropdownMenuContent className=' bg-dark-1 border-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className=' cursor-pointer' 
                onClick={() => {
                  setLayout(item.toLowerCase() as LayoutType)
                }}
                > 
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className=' border-dark-1'/>
              </div>
            ))}
            
            
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => {
          setParticipants((prev) => !prev)
        }} >
          <div className=' rounded-3xl cursor-pointer bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className=' text-white' />
          </div>
        </button>
        {!isPersonalMeet && <CallEndButton />}

      </div>

    </section>
  )
}

export default MeetingRoom