import { useState, useEffect } from 'react'

export const useMetamaskStatus = () => {
  const [isMetamaskInstalled, setIsmetamaskInstalled] = useState<boolean>(false);
  useEffect(() => {
    if ((window as any).ethereum) {
      // check if Metamask wallet is installed
      setIsmetamaskInstalled(true)
    }
  }, [])

  return { isMetamaskInstalled }
}