import { useState, useEffect } from 'react'
import { displayHours, displayMinutes, displaySeconds } from '../utils/display'

enum Status {
  Empty,
  BeforeAll,
  OGLive,
  WLLive,
  PublicLive,
}

interface IProps {
  status: Status,
  timer: number
}

const Item = ({ status, timer }: IProps) => {
  enum ItemStatus {
    Empty,
    Before,
    Live,
    End
  }
  const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.Empty)
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [themeColor, setThemeColor] = useState<string>('gray')

  useEffect(() => {
    setHours(Math.floor((timer / (60 * 60)) % 24))
    setMinutes(Math.floor((timer / 60) % 60))
    setSeconds(Math.floor(timer % 60))
  }, [timer])

  useEffect(() => {
    if (status === Status.Empty) {
      setItemStatus(ItemStatus.Empty)
    }
    else if (status === Status.BeforeAll) {
      setItemStatus(ItemStatus.Before)
      setThemeColor('gray')
    }
    else if(status === Status.OGLive){
      setItemStatus(ItemStatus.Live)
      setThemeColor('cyan')
    }
    else{
      setItemStatus(ItemStatus.End)
      setThemeColor('gray')
    }
  }, [status])

  return (
    <div className={`border border-${themeColor}-500 rounded-xl p-3 flex flex-row justify-between`}>
      <div className="flex flex-col gap-2">
        <div className='flex flex-row gap-2'>
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
          itemStatus === ItemStatus.End ?
            <div className='text-gray-500 text-md uppercase'>Ended</div>
            :
            <>
              {
                itemStatus === ItemStatus.Before ?
                  <div className='text-cyan-500'>Starts in</div>
                  :
                  <div className='text-cyan-500'>Ended in</div>
              }
            </>
        }
        {
          itemStatus === ItemStatus.End ?
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

export default Item