import axios from 'axios'
import { Item } from '../interfaces'

/**
 * Default Url
 */
const host = 'http://localhost:5000'

/**
 * Get Item list
 */
export const getItems = () => {
  return axios.get(`${host}/items`)
}

/**
 *
 * @param id Get Item by Id
 */
export const getItemById = (id: string) => {
  return axios.get(`${host}/items/${id}`)
}

/**
 *
 * @param id Update Item By Id
 * @param data
 */
export const updateItemById = (id: string, data: Item) => {
  return axios.put(`${host}/items/${id}`, data)
}

/**
 *
 * @param data Create New Item
 */
export const createItem = (data: Item) => {
  return axios.post(`${host}/items`, data)
}

/**
 *
 * @param id delete item
 */
export const deleteItem = (id: string) => {
  return axios.delete(`${host}/items/${id}`)
}
