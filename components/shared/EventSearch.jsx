'use client'

import Image from "next/image"
import { useState } from "react"
import SearchFilters from "./SearchFilters"
import { searchEvents } from "@/utils/server"

const EventSearch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState(false)

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    date: ''
  })

  async function handleSearch() {
    setIsLoading(true)

    await searchEvents(filters)

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
            <div>results</div>
          </>
        )}
      </div>
    </section>
  )
}

export default EventSearch