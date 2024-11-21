'use client'

import { addStarred, checkStarred, removeStarred } from "@/utils/client";
import { Star } from "lucide-react"
import { useState } from "react";

const StarButton = ({ id }) => {
  const [isStarred, setIsStarred] = useState(checkStarred(id))

  function toggleStarred() {
    if (isStarred) {
      removeStarred(id)
      setIsStarred(false)
    } else {
      addStarred(id)
      setIsStarred(true)
    }
  }
  

  return (
    <button onClick={() => toggleStarred()} className="absolute border rounded-full p-[2px] right-6 top-6 bg-card group">
      <Star className={`h-5 w-5 group-hover:fill-foreground ${isStarred && 'fill-foreground'}`} />
    </button>
  )
}

export default StarButton