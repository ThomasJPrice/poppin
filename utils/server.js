'use server'

export async function searchEvents(filters) {
  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?page=0&size=20&apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${filters.search}`)

  const events = await data.json()

  console.log(events);
  
  
  
}