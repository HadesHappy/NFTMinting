import './App.css';
import Item from './components/Item'
import Connect from './components/Connect'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

function App() {
  const [address, setAddress] = useState<string | null>(null)

  return (
    <div className="flex flex-col mb-5">
      <div className='background'></div>
      <div className='gradient'></div>
      <div className='relative lg:mt-10 mt-5 flex flex-col items-center lg:items-end'>
        <Connect location='top' setAddress={setAddress} />
      </div>
      <div className='flex flex-row items-center justify-center text-white font-bold text-4xl lg:py-10 py-5'>
        TorstenNFT
      </div>
      <div className='flex lg:flex-row flex-col justify-center items-center gap-5'>
        <div className='bg-[#1f2628] opacity-80 lg:w-[550px] lg:h-[550px] w-[340px] border border-gray-500 rounded-xl p-5'>
          <img className='w-full rounded-xl' src='/extra/promo.gif' alt='gif' />
        </div>
        <div className='bg-[#1f2628] opacity-80 lg:w-[550px] lg:h-[550px] w-[340px] border border-gray-500 rounded-xl p-5'>
          <div className='flex flex-col gap-5 text-gray-400'>
            <Item category='OGListed (OG)' price='0.027 ETH' limit='MAX 2 TOKENS' amount={0.027}/>
            <Item category='WhiteListed (WL)' price='0.029 ETH' limit='MAX 2 TOKENS' amount={0.029} />
            <Item category='PUBLIC' price='0.029 ETH' limit='UNLIMITED' amount={0.029} />
            <div className='flex flex-col items-center justify-center'>
              <Connect location='middle' setAddress={setAddress} />
            </div>
          </div>
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
