'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { service } from '@/api'
import { QueryUserResponse } from '@/api/type'
import useWallet from '@/hooks/useWallet'

import Logo from '@/assets/logo.jpg'

const buildMessage = () =>
  `Message: This signature only use to validate;\nDate: ${Date.now()};`

const Button = ({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <motion.button
      className="px-4 py-2 bg-purple-500 hover:bg-purple-700 rounded-md"
      whileHover={{ y: 2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default function Verify() {
  const { address, connected, connect, sign } = useWallet()
  const [loading, setLoading] = useState(true)
  const [isBind, setIsBind] = useState(false)
  const [userInfo, setUserInfo] = useState<QueryUserResponse | null>(null)

  const avatarSrc = useMemo(
    () =>
      !userInfo?.avatar
        ? Logo
        : `https://cdn.discordapp.com/avatars/${userInfo?.id}/${userInfo?.avatar}.png`,
    [userInfo]
  )

  const init = async () => {
    const url = new URL(window.location.toString())
    const code = url.searchParams.get('code')

    if (code) {
      const [err, res] = await service.queryUser(code)
      setLoading(false)
      if (err === null && res !== null) setUserInfo(res.data)
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setIsBind(userInfo?.address !== undefined)
  }, [userInfo])

  const handleSign = async () => {
    setLoading(true)
    const message = buildMessage()
    try {
      const signature = await sign(message)
      if (userInfo?.username && signature) {
        const [err, res] = await service.bindUser({
          message,
          signature,
          address: address!,
          username: userInfo!.username,
          avatar: userInfo!.avatar,
        })
        setLoading(false)
        if (err === null && res.data?.address === address) {
          setUserInfo({
            ...userInfo,
            address: res.data.address,
          })
        }
      }
    } catch (error) {
      // User denied sign
      window.alert((error as Error).message)
    }
  }

  return (
    <>
      <div className="pt-24 md:pt-32 max-w-[960px] mx-auto h-screen">
        <p className="mb-24 md:mb-32 px-8 md:px-0 text-3xl md:text-5xl text-center font-bold">
          Welcome to $NOSTR community
        </p>
        {loading ? (
          <div className="text-center">loading...</div>
        ) : (
          <>
            <p className="flex justify-center mb-4">
              <Image
                className="rounded-full"
                width={75}
                height={75}
                src={avatarSrc}
                alt={userInfo?.global_name || '$NOSTR Community'}
              />
            </p>
            <p className="mb-4 text-center">
              Nickname: <b>{userInfo?.global_name || '$NOSTR Community'}</b>
            </p>
            {isBind ? (
              <p className="px-8 md:px-0 text-center break-words">
                Bind address: {userInfo?.address || '-'}
              </p>
            ) : connected ? (
              <>
                <p className="mb-4 text-center">
                  User Address: {address || '-'}
                </p>
                {userInfo?.username && (
                  <div className="flex justify-center">
                    <Button onClick={handleSign}>Sign & Verify</Button>
                  </div>
                )}
              </>
            ) : (
              userInfo?.username && (
                <div className="flex justify-center">
                  <Button onClick={connect}>Connect Wallet</Button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  )
}
