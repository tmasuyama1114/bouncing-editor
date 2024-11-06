import React, { useState, useCallback } from 'react'
import BouncingCharacter from './BouncingCharacter'
import { Character } from '../types'

const BouncingEditor: React.FC = () => {
  const [composing, setComposing] = useState(false)
  const [composingText, setComposingText] = useState('')
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

  const handleCompositionUpdate = (e: React.CompositionEvent) => {
    setComposingText(e.data || '')
  }

  const handleCompositionEnd = (e: React.CompositionEvent) => {
    setComposing(false)
    setLastKeyWasImeTarget(false)
    const confirmedText = e.data || ''
    setComposingText('')
    setInputValue('')

    if (confirmedText) {
      addChars(confirmedText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // IMEの入力開始をより厳密にチェック
    if (e.key === 'Process' || /^[a-z]$/.test(e.key)) {
      setLastKeyWasImeTarget(true)
      return
    }

    // IME入力中またはIME入力開始の可能性がある場合は処理しない
    if (composing || lastKeyWasImeTarget) {
      return
    }

    // 英数字（大文字）や記号の直接入力の場合のみ処理
    if (e.key.length === 1) {
      e.preventDefault()
      addChars(e.key)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!composing) {
      setLastKeyWasImeTarget(false)
    }
    console.log(e)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (!composing && newValue) {
      addChars(newValue)
      setInputValue('')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🦘 バウンドエディター 🦘
          </h2>
          <p className="text-gray-600">
            文字が跳ねまくって収集つかないエディター
          </p>
          <p className="text-sm text-gray-500 mt-2">
            日本語入力対応！確定したら文字が跳ねます
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={composing ? inputValue : ''}
            onChange={handleInput}
            className={`w-full p-4 border-2 rounded-lg ${
              bounce ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500 transition-colors`}
            placeholder="なんか入力してみてください..."
            onCompositionStart={handleCompositionStart}
            onCompositionUpdate={handleCompositionUpdate}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
          {composing && composingText && (
            <div className="absolute left-4 top-4 pointer-events-none text-gray-600">
              {composingText}
            </div>
          )}
        </div>

        <div className="h-64 border-2 border-gray-200 rounded-lg p-4 overflow-hidden relative">
          {confirmedChars.map((item) => (
            <BouncingCharacter key={item.id} char={item.char} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BouncingEditor
