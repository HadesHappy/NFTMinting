import { useMetamaskStatus } from "../hooks/useMetamaskStatus"
import toast from 'react-hot-toast'
import { useLocalStorage } from "../hooks/useLocalStorage"

const Connect = ({ setAddress }: { setAddress: any }) => {
  const { isMetamaskInstalled } = useMetamaskStatus()
  const { setItem } = useLocalStorage()

  const connectWallet = async (): Promise<void> => {
    if (isMetamaskInstalled)
      (window as any).ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts: string[]) => {
          setAddress(accounts[0])
          setItem('address', accounts[0])
          toast.success('connected address: ' + accounts[0].slice(0, 5) + '...' + accounts[0].slice(-5))
        })
        .catch((error: any) => {
          toast.error(`Something went wrong: ${error}`)
        })
    else
      toast.error('You should install Crypto Wallet first.')
  }

  return (
    <div className="lg:mr-20 bg-gray-900 text-white text-center py-3 w-[200px] rounded-lg opacity-90  cursor-pointer" onClick={connectWallet}>
      Connect Wallet
    </div>
  )
}

export default Connect