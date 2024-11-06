import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Vector2D } from '../types'
import { getCharacterParams } from '../utils/physics'

type Props = {
  char: string
}

const BouncingCharacter: React.FC<Props> = React.memo(({ char }) => {
  // キャラクターのパラメータをメモ化
  const params = useMemo(() => getCharacterParams(char), [char])

  // ref を使用して DOM 更新を最適化
  const positionRef = useRef<Vector2D>({ x: 0, y: 0 })
  const velocityRef = useRef<Vector2D>({
    x: Math.random() * 2 - 1,
    y: params.initialVelocity,
  })

  // レンダリングのトリガーとなる状態は必要最小限に
  const [isStatic, setIsStatic] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // 物理演算の更新関数をメモ化
  const updatePhysics = useCallback(() => {
    if (isStatic) return

    const pos = positionRef.current
    const vel = velocityRef.current
    const gravity = params.gravity
    const bounce = -0.7
    const friction = 0.99

    const newX = pos.x + vel.x
    const newY = pos.y + vel.y

    // 壁との衝突判定
    if (newX < -100 || newX > 100) {
      vel.x *= bounce
    }

    // 地面との衝突判定
    if (newY > 20) {
      vel.x *= friction
      vel.y *= bounce

      if (Math.abs(vel.y) < 0.5) {
        setIsStatic(true)
      }

      positionRef.current = { x: newX, y: 20 }
    } else {
      vel.y += gravity
      positionRef.current = { x: newX, y: newY }
    }

    // DOM の直接更新で再レンダリングを回避
    if (elementRef.current) {
      elementRef.current.style.transform = `translate(${newX}px, ${newY}px)`
    }
  }, [isStatic, params.gravity])

  useEffect(() => {
    if (isStatic) return

    let animationFrameId: number

    const animate = () => {
      updatePhysics()
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isStatic, updatePhysics])

  // スタイルをメモ化
  const style = useMemo(
    () => ({
      transform: `translate(0px, 0px)`,
      textShadow: isStatic ? 'none' : '0 0 5px rgba(0,0,0,0.3)',
      fontFamily: '"Hiragino Kaku Gothic ProN", "メイリオ", sans-serif',
    }),
    [isStatic]
  )

  return (
    <span
      ref={elementRef}
      className={`inline-block font-bold ${params.size} ${
        isStatic ? 'text-blue-600' : 'text-red-500'
      }`}
      style={style}
    >
      {char}
    </span>
  )
})

BouncingCharacter.displayName = 'BouncingCharacter'

export default BouncingCharacter
