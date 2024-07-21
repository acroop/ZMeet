'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

function MeetingSetup( {setIsAudioVideoSetupComplete}:{setIsAudioVideoSetupComplete : (value: boolean) => void} ) {

  const [isMicCamEnabled, setIsMicCamEnabled] = useState(false)
  const call = useCall()

  if (!call) {
    throw new Error('call must be enabled')
  }

  useEffect(() => {
    if (isMicCamEnabled) {
      call?.camera.disable()
      call?.microphone.disable()

    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamEnabled, call?.camera, call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className=' text-2xl font-bold' >Meeting Setup</h1>
      <VideoPreview />
      <div className=' flex h-16 items-center justify-center gap-3'>
        <label className=' flex items-center justify-center gap-2 font-medium'>
          <input 
            type="checkbox"
            checked={isMicCamEnabled}
            onChange={(e) => {setIsMicCamEnabled(e.target.checked)}}
          />
            <span> Join Without Mic And Camera </span>
        </label>
        <DeviceSettings />
      </div>
      <Button 
      className=' rounded bg-orange-500 px-4 py-2.5' 
      onClick={
        () => { 
          call.join()
          setIsAudioVideoSetupComplete(true)
        }

      }>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup