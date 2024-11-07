import React, { useState, useCallback } from 'react'
import BouncingCharacter from './BouncingCharacter'
import { Character } from '../types'

const BouncingEditor: React.FC = () => {
  const [composing, setComposing] = useState(false)
  const [confirmedChars, setConfirmedChars] = useState<Character[]>([])
  const [inputValue, setInputValue] = useState('')
  const [bounce, setBounce] = useState(false)
  const [lastKeyWasImeTarget, setLastKeyWasImeTarget] = useState(false)

  const addChars = useCallback((text: string) => {
    const newChars = [...text].map((char) => ({
      id: Date.now() + Math.random(),
      char: char,
    }))
    setConfirmedChars((prev) => [...prev, ...newChars])
    setBounce(true)
    setTimeout(() => setBounce(false), 100)
  }, [])

  const handleCompositionStart = () => {
    setComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent) => {
    setComposing(false)
    setLastKeyWasImeTarget(false)
    const confirmedText = e.data || ''
    setInputValue('')

    if (confirmedText) {
      addChars(confirmedText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // IMEの入力中は処理しない
    if (composing) return

    // Enter キーの処理
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue && !composing) {
        addChars(inputValue)
        setInputValue('')
      }
      return
    }

    // IME入力開始をチェック
    if (e.key === 'Process' || /^[a-z]$/.test(e.key)) {
      setLastKeyWasImeTarget(true)
      return
    }

    // 直接入力（英数字など）の処理
    if (!lastKeyWasImeTarget && e.key.length === 1) {
      e.preventDefault()
      addChars(e.key)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!composing) {
      setLastKeyWasImeTarget(false)
    }
    console.error(e.key)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // IME入力中でない場合のみ、直接入力を処理
    if (!composing && !lastKeyWasImeTarget && newValue) {
      addChars(newValue)
      setInputValue('')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🦘 Bouncing Editor 🦘
          </h2>
          <p className="text-gray-600">
            文字が跳ねまくって収集つかないエディタ
          </p>
          <p className="text-sm text-gray-500 mt-2">
            日本語入力対応！確定したら文字が跳ねます
          </p>
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          className={`w-full p-4 border-2 rounded-lg ${
            bounce ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:border-blue-500 transition-colors`}
          placeholder="文字を入力してEnterを押してね"
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        <div className="h-64 border-2 border-gray-200 rounded-lg p-4 overflow-hidden">
          {confirmedChars.map((item) => (
            <BouncingCharacter key={item.id} char={item.char} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BouncingEditor
