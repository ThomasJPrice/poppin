'use server'

import { LOCATIONS } from "./constants";
import geohash from 'ngeohash';

export async function searchEvents(filters) {
  var geopoint = null

  if (typeof filters.location === 'string') {
    var coords = LOCATIONS[filters.location]
    geopoint = coords ? geohash.encode(coords.lat, coords.long) : ''
  } else {
    geopoint = geohash.encode(filters.location.lat, filters.location.long)
  }

  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?page=0&size=20&apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${filters.search}&geoPoint=${geopoint}`)
  
  const events = await data.json()

  if (events.page.totalElements === 0) return null
  
  return events?._embedded.events
}

export async function getEventDetails(id) {
  if (!id) return

  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?&apikey=${process.env.TICKETMASTER_API_KEY}`)

  const eventDetails = await data.json()

  return eventDetails
}