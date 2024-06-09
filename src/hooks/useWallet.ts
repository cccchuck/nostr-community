import { useEffect, useState } from 'react'

const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [hasOKXWallet, setHasOKXWallet] = useState(false)

  const connect = async () => {
    if (hasOKXWallet) {
      try {
        await window.okxwallet?.nostr.connect()
        setAddress(window.okxwallet!.nostr.selectedAccount.address)
      } catch (error) {
        setAddress(null)
      }
    }
  }

  const sign = async (message: string): Promise<string | null> => {
    if (address) {
      const publicKey =
        '9f6dbb203718cf9bb4740cea965afb3ba5e72d0b479982761cbfd34ddfdc4538'
      return await window.okxwallet!.nostr.nip04.encrypt(publicKey, message)
    }
    return null
  }

  useEffect(() => {
    setHasOKXWallet(!(window.okxwallet === undefined))
  }, [])

  useEffect(() => {
    setConnected(!!address)
  }, [address])

  return {
    address,
    connected,
    connect,
    sign,
  }
}

export default useWallet
