import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { getDate, getLocation } from "@/utils/client"
import StarButton from "./StarButton"

const EventCard = ({ event }) => {
  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='text-xl font-normal line-clamp-2'>{event?.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-md text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {getLocation(event?._embedded?.venues)}
          </div>
        </CardDescription>

        <StarButton id={event.id} />
      </CardHeader>

      <CardContent>
        <Image width={1600} height={900} src={event?.images[0].url} className="w-full h-auto object-cover aspect-video rounded-[0.3rem]" alt={`Image for ${event?.name}`} />
      </CardContent>

      <CardFooter className='flex justify-between'>
        <span className="text-md font-semibold">{getDate(event?.dates)}</span>
        <Link href={`/events/${event?.id}`}>
          <Button variant='outline'>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EventCard