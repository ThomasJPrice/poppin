'use client'

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

const SearchFilters = ({ filters, setFilters, handleSearch }) => {
  function handleSearchChange(e) {
    setFilters({
      ...filters,
      search: e.target.value
    })
  }

  function handleLocationChange(e) {
    if (e === 'current') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          // only set filters if the pos is there
          if (pos?.coords) {
            setFilters({
              ...filters,
              location: {
                lat: pos?.coords.latitude,
                long: pos?.coords.longitude
              }
            })
          } else {
            toast.error('Please allow location access in your browser/system settings!')
          }
        })
      } else {
        toast.error('Please allow location access in your browser/system settings!')
      }
    } else {
      setFilters({
        ...filters,
        location: e
      })
    }

  }

  return (
    <div>
      {/* top filters - searchbar, location, search button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <Input type='text' onChange={handleSearchChange} value={filters.search} placeholder='Search events...' className='w-full' />
        </div>

        <Select onValueChange={handleLocationChange} value={filters.location?.lat ? 'current' : filters.location}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Location</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="london">London</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => handleSearch()} className="w-full md:w-auto" variant='secondary'>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  )
}

export default SearchFilters