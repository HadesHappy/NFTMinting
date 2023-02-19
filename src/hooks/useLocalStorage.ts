import { useState } from 'react'

export const useLocalStorage = () => {
  const [value, setValue] = useState<any>(null)
  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, value)
    setValue(value)
  }

  const getItem = (key: string): any => {
    const value = localStorage.getItem(key)
    setValue(value)
    return value
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return { value, setItem, getItem, removeItem }
}