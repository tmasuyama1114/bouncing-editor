import React, { useState, useEffect } from 'react'
import { Vector2D } from '../types'
import { getCharacterParams } from '../utils/physics'

type Props = {
  char: string
}

const BouncingCharacter: React.FC<Props> = ({ char }) => {
  const params = getCharacterParams(char)
  const [position, setPosition] = useState<Vector2D>({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState<Vector2D>({
    x: Math.random() * 2 - 1,
    y: params.initialVelocity,
  })
  const [isStatic, setIsStatic] = useState(false)

  useEffect(() => {
    if (isStatic) return

    const gravity = params.gravity
    const bounce = -0.7
    const friction = 0.99

    const interval = setInterval(() => {
      setPosition((pos) => {
        const newX = pos.x + velocity.x
        const newY = pos.y + velocity.y

        if (newX < -100 || newX > 100) {
          setVelocity((v) => ({ ...v, x: v.x * bounce }))
        }

        if (newY > 20) {
          setVelocity((v) => ({
            x: v.x * friction,
            y: v.y * bounce,
          }))

          if (Math.abs(velocity.y) < 0.5) {
            setIsStatic(true)
          }

          return { x: newX, y: 20 }
        }

        setVelocity((v) => ({ x: v.x, y: v.y + gravity }))

        return { x: newX, y: newY }
      })
    }, 16)

    return () => clearInterval(interval)
  }, [velocity, isStatic, params.gravity])

  return (
    <span
      className={`inline-block font-bold ${params.size} ${
        isStatic ? 'text-blue-600' : 'text-red-500'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        textShadow: isStatic ? 'none' : '0 0 5px rgba(0,0,0,0.3)',
        fontFamily: '"Hiragino Kaku Gothic ProN", "メイリオ", sans-serif',
      }}
    >
      {char}
    </span>
  )
}

export default BouncingCharacter
