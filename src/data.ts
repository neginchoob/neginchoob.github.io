import texturesJson from './data/textures.json'
import categoriesJson from './data/categories.json'

export interface Texture {
  id: string
  category: string
  name: string
  code: string
  image: string
}

export interface Category {
  id: string
  name: string
  thumbnail: string
}

export const textures = texturesJson as Texture[]
export const categories = categoriesJson as Category[]

export const img = (path: string) => `${import.meta.env.BASE_URL}textures/${path}`

export const fa = (n: number) => n.toLocaleString('fa-IR')

export const byCategory = (id: string) => textures.filter((t) => t.category === id)
