import { useState, useEffect } from 'react'
import { getSupply } from '../contract/contract'

export const useGetSupply = () => {
  const [count, setCount] = useState<number>(0)

  const getTotalSupply = async() => {
    const amount = await getSupply()
    if(amount){
      setCount(count)
    }
  }
  useEffect(()=>{
    getTotalSupply()
  },[])

  return { count, getTotalSupply }
}