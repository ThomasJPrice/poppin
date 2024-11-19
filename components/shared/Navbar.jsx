import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full container py-4">
      <div>
        <Link href={'/'}>
          <Image src='/logo.png' width={177.16} height={50} className="max-h-[50px] object-contain" alt="Poppin' Logo" />
        </Link>
      </div>

      <div>
        <Link href='https://github.com/ThomasJPrice/poppin' target="_blank">
          <Button variant='outline'>
            GitHub
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar