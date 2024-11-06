import { Vector2D, CharacterParams } from '../types'

export const getCharacterType = (char: string): string => {
  if (/[A-Za-z0-9]/.test(char)) return 'ascii'
  if (/[ぁ-んー]/.test(char)) return 'hiragana'
  if (/[ァ-ンー]/.test(char)) return 'katakana'
  if (/[一-龯]/.test(char)) return 'kanji'
  return 'other'
}

export const getCharacterParams = (char: string): CharacterParams => {
  const type = getCharacterType(char)
  switch (type) {
    case 'ascii':
      return { size: 'text-2xl', gravity: 0.15, initialVelocity: -3 }
    case 'hiragana':
    case 'katakana':
    case 'kanji':
      return { size: 'text-3xl', gravity: 0.2, initialVelocity: -3.5 }
    default:
      return { size: 'text-2xl', gravity: 0.15, initialVelocity: -3 }
  }
}

export const calculateNextPosition = (
  currentPos: Vector2D,
  velocity: Vector2D,
  gravity: number
): Vector2D => {
  return {
    x: currentPos.x + velocity.x,
    y: currentPos.y + velocity.y + gravity,
  }
}
