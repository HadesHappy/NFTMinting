import { ethers } from 'ethers'
import contract from './contract.json'
import { CONTRACT_ADDRESS } from '../utils/constants'

const contractSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  )
  const signer = walletProvider.getSigner()

  const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)
  return contractWithSigner
}

const getContractBalance = async () => {
  try {
    const contractWithSigner: any = contractSigner()
    const balance = await contractWithSigner.totalBalance()
    return ethers.utils.formatEther(balance)
  } catch (error) {
    console.log('error: ', error)
  }
}

const getSupply = async () => {
  try {
    const contractWithSigner: any = contractSigner()
    const amount = await contractWithSigner.totalSupply()
    console.log(Number(amount))
    return Number(amount)
  } catch (error) {
    console.log('error: ', error)
  }
}

const mint = async (status1: boolean, status2: boolean, amount: string) => {
  try {
    const contractWithSigner: any = contractSigner()
    const id = await contractWithSigner.mint(1, status1, status2, { value: ethers.utils.parseEther(amount) })
    if (id) {
      return {
        status: '200'
      }
    }
  } catch (error) {
    console.log('error: ', error)
    return {
      status: '401'
    }
  }
}

const withdraw = async () => {
  try {
    const contractWithSigner: any = contractSigner()

    // send Transaction
    const tx = await contractWithSigner.withdraw()
    const receipt = await tx.wait()

    if (receipt?.status === 1)
      return {
        status: 'success',
        error: ''
      }
    else
      return {
        status: 'failed',
        error: receipt
      }
  } catch (error) {
    return {
      status: 'error',
      error: error
    }
  }
}

export {
  getContractBalance,
  getSupply,
  mint,
  withdraw,
}