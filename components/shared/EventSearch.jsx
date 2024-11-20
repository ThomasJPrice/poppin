'use client'

import Image from "next/image"
import { useState } from "react"
import SearchFilters from "./SearchFilters"
import { searchEvents } from "@/utils/server"
import EventCard from "./EventCard"

const EventSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState(false)

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    date: ''
  })

  async function handleSearch() {
    setIsLoading(true)

    const res = await searchEvents(filters)

    setEvents(res)

    setIsLoading(false)
  }


  return (
    <section id="search" className="w-full">
      <SearchFilters filters={filters} setFilters={setFilters} handleSearch={handleSearch} />

      <div className={`${isLoading ? 'flex justify-center w-full' : ''} mt-8`}>
        {isLoading ? (
          <div className="aspect-square w-[100px] p-4 bounce-container">
            <Image src="/icon.png" alt="Loading..." width={100} height={100} className="bouncing-image" />
          </div>
        ) : (
          <>
            {events ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {events.map((event, index) => (
                <EventCard event={event} key={event + index} />
                ))}
              </div>
            ) : <p className="text-center">Looks like there are no events!</p>}
          </>
        )}
      </div>
    </section>
  )
}

export default EventSearch