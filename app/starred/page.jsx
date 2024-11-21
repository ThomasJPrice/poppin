'use client'

import EventCard from '@/components/shared/EventCard'
import { getStarred } from '@/utils/client'
import { populateStarred } from '@/utils/server'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const StarredEvents = () => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true)

      var starred = getStarred()
      starred = starred.filter((item) => item !== '')

      const populatedEvents = await populateStarred(starred)

      setEvents(populatedEvents)
      setIsLoading(false)
    }

    getEvents()
  }, [])


  return (
    <main className='container'>
      <h1 className='text-3xl text-center underline text-secondary'>My Events</h1>

      <div className={`${isLoading ? 'flex justify-center w-full' : ''} mt-8`}>
        {isLoading ? (
          <div className="aspect-square w-[100px] p-4 bounce-container">
            <Image src="/icon.png" alt="Loading..." width={100} height={100} className="bouncing-image" priority />
          </div>
        ) : (
          <>
            {events.length !== 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {events.map((event, index) => (
                  <EventCard event={event} key={event + index} />
                ))}
              </div>
            ) : <p className="text-center">You have no saved events!</p>}
          </>
        )}
      </div>
    </main>
  )
}

export default StarredEvents