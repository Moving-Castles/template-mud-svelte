export type Entity = {
  [key: string]: any
  name?: string
  counter?: number
  gameConfig?: GameConfig
}

export type Player = {
  [key: string]: any
  name: string
  counter: number
}

export type Entities = {
  [key: string]: Entity
}

export type Players = {
  [key: string]: Player
}

export type GameConfig = {
  increment: number
}

