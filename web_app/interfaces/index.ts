export type User = {
  id: number
  name: string
}

export type Shop = {
  _id: string
  name: string
  description: string
  phone: string
  address: string
  items: Item[]
}

export type Item = {
  _id: string
  name: string
  category: string
}
