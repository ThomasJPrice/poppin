import { getEventDetails } from "@/utils/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, CalendarDays, Clock, Info, MapPin, Pin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDate, getLocation, getTime } from "@/utils/client"
import VenueDetails from "@/components/shared/VenueDetails"

const EventDetails = async (props) => {
  const params = await props.params

  const eventDetails = await getEventDetails(params.id)

  return (
    <main className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* left side */}
      <div className="col-span-1 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-normal'>{eventDetails.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <Image src={eventDetails?.images[0].url} width={1600} height={900} alt={`Image for ${eventDetails?.name}`} className="rounded-[0.3rem] h-64 w-full object-cover mb-4" />

            <div className="flex justify-between gap-2 mb-6 flex-wrap">
              <p className="flex gap-2 items-center flex-1">
                <CalendarDays className="flex-shrink-0" />
                <span>{getDate(eventDetails.dates)}</span>
              </p>

              <p className="flex gap-2 items-center flex-1">
                <Clock className="flex-shrink-0" />
                <span>{getTime(eventDetails.dates)}</span>
              </p>

              <p className="flex gap-2 items-center flex-1">
                <MapPin className="flex-shrink-0" />
                <span>{getLocation(eventDetails._embedded.venues)}</span>
              </p>
            </div>

            <section id='venue'>
              <div className="w-full bg-border h-[1px] my-4" />
              <h2 className="font-normal text-xl">About the Venue</h2>

              <VenueDetails venue={eventDetails._embedded.venues[0]} />
            </section>
          </CardContent>
        </Card>
      </div>

      {/* right side */}
      <div className="col-span-1 flex flex-col gap-4">
        {/* please note */}
        {eventDetails.pleaseNote && (
          <div className="flex gap-2 items-center p-2 border rounded-[0.3rem] bg-[#4169E1]/20 border-[#4169E1] text-[#4169E1]">
            <Info className="w-4 h-4 flex-shrink-0" />
            <p className="line-clamp-4">{eventDetails.pleaseNote}</p>
          </div>
        )}

        {/* seatmap */}
        {eventDetails.seatmap && (
          <Card className="relative">
            <CardHeader className='py-4'>
              <h3 className="font-normal text-xl">Seatmap</h3>
            </CardHeader>

            <CardContent>
              <Image src={eventDetails.seatmap.staticUrl} fill alt="Seatmap" className="w-full h-full !relative rounded-[0.3rem]" />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className='py-4'>
            <h3 className="font-normal text-xl">Tickets</h3>
          </CardHeader>

          <CardContent>
            {eventDetails?.priceRanges && <p className="mb-4">{eventDetails.priceRanges[0].min.toFixed(2)} - {eventDetails.priceRanges[0].max.toFixed(2)} {eventDetails.priceRanges[0].currency}</p>}

            <Link href={`${eventDetails.url}`} className="">
              <Button className='w-full'>Buy Tickets</Button>
            </Link>

            {eventDetails.ticketLimit && (
              <p className="text-secondary mt-2">{eventDetails.ticketLimit.info}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default EventDetails