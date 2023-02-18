import { useMetamaskStatus } from "../hooks/useMetamaskStatus"
import toast from 'react-hot-toast'

const Connect = ({ location, setAddress }: { location: string, setAddress: any }) => {
  const { isMetamaskInstalled } = useMetamaskStatus()

  const connectWallet = async (): Promise<void> => {
    if (isMetamaskInstalled)
      (window as any).ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts: string[]) => {
          setAddress(accounts[0])
          toast.success('connected address: ' + accounts[0].slice(0, 7) + '...' + accounts[0].slice(-4))
        })
        .catch((error: any) => {
          toast.error(`Something went wrong: ${error}`)
        })
    else
      toast.error('You should install Crypto Wallet first.')
  }

  return (
    <>
      {
        location === 'top' ?
          <div className="lg:mr-20 bg-gray-900 text-white text-center py-3 w-[200px] rounded-lg opacity-90  cursor-pointer" onClick={connectWallet}>
            Connect Wallet
          </div>
          :
          <div className="lg:mt-2 bg-gray-900 text-white text-center py-3 w-[200px] rounded-lg opacity-90  cursor-pointer" onClick={connectWallet}>
            Connect Wallet
          </div>
      }
    </>
  )
}

export default Connect