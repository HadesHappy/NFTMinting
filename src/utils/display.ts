const displayDays = ({ days }: { days: number }) => {
  if (days < 10 && days > 0) {
    return '0' + days
  }
  else
    return '' + days
}


const displayHours = ({ hours }: { hours: number }) => {
  if (hours < 10 && hours > 0) {
    return '0' + hours
  }
  else
    return '' + hours
}

const displayMinutes = ({ minutes }: { minutes: number }) => {
  if (minutes < 10 && minutes > 0) {
    return '0' + minutes
  }
  else
    return '' + minutes
}

const displaySeconds = ({ seconds }: { seconds: number }) => {
  if (seconds < 10 && seconds > 0) {
    return '0' + seconds
  }
  else
    return '' + seconds
}

export {
  displayDays,
  displayHours,
  displayMinutes,
  displaySeconds
}