// @ts-nocheck

'use client'

import { useGetCalls } from '@/customHooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

 

function CallList({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) {

    const { upcomingCalls, endCalls, callRecordings, isLoading } = useGetCalls()
    const router = useRouter();
    
    const [Recording, setRecordings] = useState<CallRecording[]>([])
    const {toast} = useToast();
    const getCalls = () => {
        if (type === 'ended') {
            return endCalls
        } else if (type === 'upcoming') {
            return upcomingCalls
        } else if (type === 'recordings') {
            return callRecordings
        } else {
            return [];
        }

    }
    
    const getNoCalls = () => {
        if (type === 'ended') {
            return 'No Previous Meetings'
        } else if (type === 'upcoming') {
            return 'No Upcoming Meetings'
        } else if (type === 'recordings') {
            return 'No Recordings'
        } else {
            return '';
        }

    }

    useEffect(() => {
        const getRecordings = async() => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
                const recordings = callData
                                    .filter(call => call.recordings.length  > 0)
                                    .flatMap(call => call.recordings)
    
                setRecordings(recordings)
            } catch (error) {
                console.log(error);
                toast({
                    title: 'Try again Later',
                })
                
                
            }
        }

        if (type === 'recordings') {
            getRecordings()
        }
        

    }, [type, callRecordings])

    if (isLoading) return <Loader />
    

    const calls = getCalls()
    const noCalls = getNoCalls()

    return (
        <div
        className=' grid grid-cols-1 gap-5 xl:grid-cols-2'
        >
            {calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording) => (
                <MeetingCard 
                key={(meeting as Call).id}
                icon={
                    type === 'ended' ?
                    '/icons/previous.svg'
                    : type === 'upcoming' ?
                    '/icons/upcoming.svg' :
                    
                    '/icons/recording.svg' 
                }
                title={(meeting as Call).state?.custom?.description?.substring(0, 30)|| meeting?.fileName?.substring(0, 20) || 'Personal Meeting'}
                date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as Call).start_time.toLocaleString()}
                isPreviousMeeting={type === 'ended'}
                buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                buttonText={type === 'recordings' ? 'Play' : 'Start'}
                />
            )): (
                <h1> {noCalls} </h1>
            )}
        </div>
    )
}

export default CallList