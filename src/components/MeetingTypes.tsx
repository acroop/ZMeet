
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"

function MeetingTypes() {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateWithTime: new Date(),

        meetingDescription: '',
        link: ''
    })
    const { toast } = useToast()
    const [callDetails, setCallDetails] = useState<Call>()

    const createMeeting = async () => {
        if (!client || !user) {
            return;
        }

        try {

            if (!values.dateWithTime) {
                toast({
                    title: 'Please select a date and time',
                })
                return;
            }

            const id = crypto.randomUUID()
            const call = client.call('default', id)

            if (!call) {
                throw new Error('Failed to create meeting')
            }

            const startsAt = values.dateWithTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.meetingDescription || 'Instant meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call)

            if (!values.meetingDescription) {
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: 'Meeting Created',
            })

        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create meeting",

            })

        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section
            className=' grid grid-cols-1 gap-9 md:grid-cols-2 xl:grid-cols-2'
        >
            <HomeCard
                img="/icons/add-meeting.svg"
                description="Start a new meeting"
                title="New Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-600"
            />
            <HomeCard img="/icons/schedule.svg"
                description="Plan your meeting"
                title="Schedule Meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-blue-600" />
            <HomeCard img="/icons/join-meeting.svg"
                description="Via invitation link"
                title="Join Meeting"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-yellow-500"
            />
            <HomeCard img="/icons/recordings.svg"
                description="Check out your recordings"
                title="View Recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-green-600"
            />

            {
                !callDetails ? (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Create Meeting"

                        handleClick={createMeeting}
                    >
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Add Description</Label>
                            <Textarea className=' border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0' placeholder="Type meeting description." id="description"
                                onChange={(e) => {
                                    setValues({ ...values, meetingDescription: e.target.value })
                                }} />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Add Time</Label>
                            <ReactDatePicker
                                
                                selected={values.dateWithTime}
                                onChange={(date) => setValues({ ...values, dateWithTime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full rounded bg-dark-2 p-2 focus:outline-none"
                            />

                        </div>
                    </MeetingModal>
                ) : (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        className="text-center"

                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink)
                            toast({ title: 'Link Copied' })
                        }}
                        image='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                        buttonText="Copy meeting Link"
                    />
                )
            }
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />


            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type The Link Here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input 
                placeholder='Enter link'
                className=' border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => {
                    setValues({ ...values, link: e.target.value })
                }} 
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypes