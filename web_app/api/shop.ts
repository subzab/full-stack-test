import axios from 'axios'
import { Shop } from '../interfaces'

/**
 * Default Url
 */
const host = process.env.HOST
/**
 * Get shop list
 */
export const getShops = () => {
  return axios.get(`${host}/shops`)
}

/**
 * Get shop by id
 * @param id
 */
export const getShopById = (id: string) => {
  return axios.get(`${host}/shops/${id}`)
}

/**
 * Create New Shop
 * @param data :Shop
 */
export const createShop = (data: Shop) => {
  return axios.post(`${host}/shops`, data)
}

/**
 *
 * @param id Update existing shop by id
 * @param data :Shop
 */
export const updateShopById = (id: string, data: Shop) => {
  return axios.put(`${host}/shops/${id}`, data)
}
