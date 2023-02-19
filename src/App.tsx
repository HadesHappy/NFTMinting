import './App.css';
import Item1 from './components/Item1'
import Item2 from './components/Item2'
import Item3 from './components/Item3'
import Connect from './components/Connect'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react'
import { ogStartTime, wlStartTime, publicStartTime, admin, owner } from './utils/constants'
import { mint, withdraw, getSupply, getContractBalance } from './contract/contract'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [address, setAddress] = useState<string>('')
  const [ogTimer, setOgTimer] = useState<number>(0)
  const [wlTimer, setWlTimer] = useState<number>(0)
  const [publicTimer, setPublicTimer] = useState<number>(0)
  const [ogList, setOgList] = useState<string | null>(null)
  const [wlList, setWlList] = useState<string | null>(null)
  const [count, setCount] = useState<number>(0)
  const [balance, setBalance] = useState<number>(0)

  const { getItem } = useLocalStorage()

  enum Status {
    Empty,
    BeforeAll,
    OGLive,
    WLLive,
    PublicLive,
  }

  const [status, setStatus] = useState<Status>(Status.Empty)
  const calculateTimeLeft = () => {
    const differenceWithOg = Math.floor((ogStartTime.getTime() - new Date().getTime()) / 1000);
    const differenceWithWl = Math.floor((wlStartTime.getTime() - new Date().getTime()) / 1000);
    const differenceWithPublic = Math.floor((publicStartTime.getTime() - new Date().getTime()) / 1000);

    if (differenceWithOg > 0) {
      setStatus(Status.BeforeAll)
      setOgTimer(differenceWithOg)
      setWlTimer(differenceWithWl)
      setPublicTimer(differenceWithPublic)
    }
    else if (differenceWithOg <= 0 && differenceWithWl > 0) {
      setStatus(Status.OGLive)
      setOgTimer(differenceWithWl)
      setWlTimer(differenceWithWl)
      setPublicTimer(differenceWithPublic)
    }
    else if (differenceWithOg <= 0 && differenceWithPublic > 0) {
      setStatus(Status.WLLive)
      setWlTimer(differenceWithPublic)
      setPublicTimer(differenceWithPublic)
    }
    else {
      setStatus(Status.PublicLive)
      setPublicTimer(Math.abs(differenceWithPublic))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft()
    }, 1000);

    return () => clearTimeout(timer);
  });

  const readWallets = async () => {
    const text = await fetch('/wallets.txt').then((res) => res.text())
    setWlList(text)
    const text1 = await fetch('/torstenOG.txt').then((res) => res.text())
    setOgList(text1)

  }

  const readCount = async () => {
    const res = await getSupply()
    setCount(res || 0)
    const adminBalance = await getContractBalance()
    setBalance(adminBalance || 0)
  }

  useEffect(() => {
    readWallets()
    readCount()
    const value = getItem('address')
    if (value)
      setAddress(value)
  }, [])

  const withdrawClick = async () => {
    await withdraw()
    const adminBalance = await getContractBalance()
    setBalance(adminBalance || 0)
  }

  const onClick = async () => {
    if (address === null)
      toast.error('Connect your wallet first.');
    else {
      let status1 = ogList?.toLowerCase().includes(address)
      let status2 = wlList?.toLowerCase().includes(address)
      let response
      if (status === Status.OGLive && status1) {
        response = await mint(true, false, '0.027')
      }
      else if (status === Status.WLLive && status2) {
        response = await mint(false, true, '0.029')
      }
      else if (status === Status.PublicLive) {
        response = await mint(false, false, '0.029')
      }
      else {
        toast.error('Invaild')
      }
      if (response && response.status === '200') {
        toast.success('Mint Suceed.')
        await readCount()
      }
      else {
        toast.error('Mint Failed.')
      }
    }
  }

  return (
    <div className="flex flex-col mb-5">
      <div className='background'></div>
      <div className='gradient'></div>
      <div className='relative lg:mt-10 mt-5 flex flex-col items-center lg:items-end'>
        <Connect setAddress={setAddress} />
      </div>
      <div className='flex flex-row items-center justify-center text-white font-bold text-4xl lg:py-10 py-5'>
        Torsten Sharks
      </div>
      <div className='flex lg:flex-row flex-col justify-center items-center gap-5'>
        <div className='bg-[#1f2628] lg:w-[550px] lg:h-[550px] w-[340px] border border-gray-500 rounded-xl p-5'>
          <img className='w-full rounded-xl' src='/extra/promo.gif' alt='gif' />
        </div>
        <div className='bg-[#1f2628] opacity-80 lg:w-[550px] lg:h-[550px] w-[340px] border border-gray-500 rounded-xl p-5'>
          <div className='flex flex-col gap-5 text-gray-400'>
            <Item1 status={status} timer={ogTimer} />
            <Item2 status={status} timer={wlTimer} />
            <Item3 status={status} timer={publicTimer} />
            <div className='flex flex-col items-center justify-center'>
              <div className='bg-cyan-700 text-white rounded-md w-[100px] text-center py-3 mt-2 cursor-pointer' onClick={onClick}>Mint</div>
            </div>
            <div className='text-center -mt-3'>
              Minted {count} / 5400
            </div>
          </div>
        </div>
      </div>
      {
        address === admin.toLowerCase() || address === owner.toLowerCase() ?
          <div className='flex flex-row items-center justify-center mt-5 cursor-pointer gap-5'>
            <div className='text-white text-center py-3 bg-cyan-700 w-[100px] rounded-md' onClick={withdrawClick}>
              Withdraw
            </div>
            <div className='text-white'>Balance: {balance} ETH</div>
          </div>
          :
          <>
          </>
      }
      <div className='flex flex-col items-center justify-center'>
        <div className='text-gray-500 mt-20 border border-cyan-700 rounded-md w-[300px] text-center'>
          Made by Torsten Labs
        </div>
      </div>

      <Toaster toastOptions={{
        className: '',
        style: {
          borderRadius: '10px',
          background: '#cd5c9b',
          color: '#fff',
        }
      }} />
    </div>
  );
}

export default App;
