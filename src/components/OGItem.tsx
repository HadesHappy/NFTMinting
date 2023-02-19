import { ogStartTime, wlStartTime } from '../utils/constants'
import { useState, useEffect } from 'react'
import { displayHours, displayMinutes, displaySeconds } from '../utils/display'

interface IProps{
  
}

const OgItem = () => {
  enum Status {
    Empty,
    Before,
    Live,
    End
  }

  const [status, setStatus] = useState<Status>(Status.Empty)
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [themeColor, setThemeColor] = useState<string>('gray')

  const calculateTimeLeft = () => {
    let differenceWithOg = Math.floor((ogStartTime.getTime() - new Date().getTime()) / 1000);
    let differenceWithWl = Math.floor((wlStartTime.getTime() - new Date().getTime()) / 1000);
    let difference = 0
    if (differenceWithOg > 0 && differenceWithWl > 0) {
      setStatus(Status.Before)
      setThemeColor('gray')
      difference = differenceWithOg
    }
    else if (differenceWithOg <= 0 && differenceWithWl > 0) {
      setStatus(Status.Live)
      setThemeColor('cyan')
      difference = differenceWithWl
    }
    else {
      setThemeColor('gray')
      setStatus(Status.End)
    }
    if (difference > 0) {
      setHours(Math.floor((difference / (60 * 60)) % 24))
      setMinutes(Math.floor((difference / 60) % 60))
      setSeconds(Math.floor(difference % 60))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft()
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={`border border-${themeColor}-500 rounded-xl p-3 flex flex-row justify-between`}>
      <div className="flex flex-col gap-2">
        <div className='flex flex-row gap-2 justify-center items-center'>
          <div className="px-2 py-1 rounded-md text-cyan-500 border border-cyan-500">
            <div className="flex flex-row items-center justify-center">
              Divers (OG)
            </div>
          </div>
        </div>
        <div className="lg:text-lg text-md">Price 0.027 ETH</div>
        <div className="lg:text-md text-sm">
          MAX 2 TOKENS
        </div>
      </div>
      <div className='flex flex-col gap-3 mt-1 items-end'>
        {
          status === Status.End ?
            <div className='text-gray-500 text-md uppercase'>Ended</div>
            :
            <>
              {
                status === Status.Before ?
                  <div className='text-cyan-500'>Starts in</div>
                  :
                  <div className='text-cyan-500'>Ended in</div>
              }
            </>
        }
        {
          status === Status.End ?
            <></>
            :
            <div className='flex flex-row gap-2 h-[60%]'>
              <div className='bg-gray-500 opacity-80 text-white w-10 h-10 text-center py-2 rounded-md'>
                {displayHours({ hours })}
              </div>
              <div className='bg-gray-500 opacity-80 text-white w-10 h-10 text-center py-2 rounded-md'>
                {displayMinutes({ minutes })}
              </div>
              <div className='bg-gray-500 opacity-80 text-white w-10 h-10 text-center py-2 rounded-md'>
                {displaySeconds({ seconds })}
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default OgItem