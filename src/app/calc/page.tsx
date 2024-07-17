'use client'
import useMobile from '@/hooks/useMobile'
import { Options } from '@/types'
import { Input, Select, SelectItem } from '@nextui-org/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

enum CONSTANTS {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  Binance = 'Binance',
  Okx = 'Okx',
}

const CALC_TYPES: Options = [
  {
    key: CONSTANTS.Deposit,
    label: 'Deposit to LnFi',
    value: CONSTANTS.Deposit,
  },
  {
    key: CONSTANTS.Withdraw,
    label: 'Withdraw from LnFi',
    value: CONSTANTS.Withdraw,
  },
]

const CALC_CEXS: Options = [
  {
    key: CONSTANTS.Binance,
    label: CONSTANTS.Binance,
    value: CONSTANTS.Binance,
  },
  {
    key: CONSTANTS.Okx,
    label: CONSTANTS.Okx,
    value: CONSTANTS.Okx,
  },
]

export default function Calculator() {
  const [calcType, setCalcType] = useState(CONSTANTS.Deposit)
  const [calcCEX, setCalcCEX] = useState(CONSTANTS.Binance)
  const [btcAmount, setBtcAmount] = useState('')
  const [satsAmount, setSatsAmount] = useState('')
  const isMobile = useMobile()

  const handleCalculate = (type: 'BTS' | 'STB', value: string) => {
    if (value === '' || Number.isNaN(parseFloat(value))) {
      setBtcAmount('')
      setSatsAmount('')
      return
    }

    let fee = 0
    if (calcType === CONSTANTS.Deposit) {
      if (calcCEX === CONSTANTS.Binance) {
        fee = 100
      } else if (calcCEX === CONSTANTS.Okx) {
        fee = 1000
      }
    }

    if (type === 'BTS' && value !== '') {
      setBtcAmount(value)
      setSatsAmount((parseFloat(value) * 1e8 - fee).toString())
    } else if (type === 'STB' && value !== '') {
      setSatsAmount(value)
      setSatsAmount((parseInt(value) / 1e8 - fee).toString())
    }
  }

  useEffect(() => {
    handleCalculate('BTS', btcAmount)
  }, [calcType, calcCEX])

  return (
    <>
      <div className="pt-24 md:pt-32 max-w-[960px] mx-auto h-screen">
        <p className="mb-24 md:mb-32 px-8 md:px-0 text-3xl md:text-5xl text-center font-bold">
          Lightning Network Calculator
        </p>
        <main className="px-8 md:px-24">
          <Select
            className="mb-12"
            label="Select Calculate Type"
            labelPlacement="outside"
            placeholder="Click to select calculate type"
            defaultSelectedKeys={[calcType]}
            value={calcType}
            onChange={(e) => setCalcType(e.target.value as CONSTANTS)}
          >
            {CALC_TYPES.map((type) => (
              <SelectItem key={type.key as string}>{type.label}</SelectItem>
            ))}
          </Select>
          <Select
            className="mb-8"
            label="Select CEX"
            labelPlacement="outside"
            placeholder="Click to select CEX"
            defaultSelectedKeys={[calcCEX]}
            value={calcCEX}
            onChange={(e) => setCalcCEX(e.target.value as CONSTANTS)}
          >
            {CALC_CEXS.map((cex) => (
              <SelectItem key={cex.key as string}>{cex.label}</SelectItem>
            ))}
          </Select>
          <div
            className={clsx('flex items-center gap-4', {
              'flex-col': isMobile,
              'gap-8': isMobile,
            })}
          >
            <Input
              label="BTC Amount"
              placeholder="0.01"
              labelPlacement="outside"
              value={btcAmount.toString()}
              onChange={(e) => handleCalculate('BTS', e.target.value)}
            />
            <Input
              label="Sats Amount"
              placeholder="1,000,000"
              labelPlacement="outside"
              value={satsAmount.toString()}
              onChange={(e) => handleCalculate('STB', e.target.value)}
            />
          </div>
        </main>
      </div>
    </>
  )
}
