'use client'

import { addStarred, checkStarred } from "@/utils/client";
import { Star } from "lucide-react"

const StarButton = ({ id }) => {
  const isStarred = checkStarred(id)

  console.log(isStarred);
  

  return (
    <button onClick={() => addStarred(id)} className="absolute border rounded-full p-[2px] right-6 top-6 bg-card group">
      <Star className={`h-5 w-5 group-hover:fill-foreground ${isStarred && 'fill-foreground'}`} />
    </button>
  )
}

export default StarButton