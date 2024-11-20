export function getLocation(venues) {
  if (!venues) return 'Unknown'

  const city = venues[0]?.city?.name
  const country = venues[0]?.country?.countryCode

  return `${city}, ${country}`
}

export function getDate(dates) {
  const date = new Date(dates?.start?.dateTime)

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return formattedDate
}

export function getTime(dates) {
  const date = new Date(dates?.start?.dateTime)

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true // Ensures AM/PM format
  });

  return formattedTime
}

// starred events stuff
export function checkStarred(id) {
  if (typeof window !== undefined) {
    const starred = localStorage.getItem('starred')?.split(',')

    if (starred.includes(id)) {
      return true
    }

    return false
  }
}

export function addStarred(id) {
  if (typeof window !== undefined) {
    const starred = localStorage.getItem('starred')?.split(',') || []

    starred.push(id)

    localStorage.setItem('starred', starred.join(','))
  }
}