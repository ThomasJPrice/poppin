import EventSearch from "@/components/shared/EventSearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center container gap-8">
      <Image priority src={'/title.png'} alt="Find out what's Poppin' near you!" width={500} height={300} />

      <EventSearch />
    </main>
  );
}
