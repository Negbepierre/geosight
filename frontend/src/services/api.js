import axios from 'axios'

const BASE_URL = 'https://geosight.onrender.com/api'

export const runAudit = async (data) => {
  const response = await axios.post(`${BASE_URL}/audit/run`, data)
  return response.data
}

export const previewQueries = async (data) => {
  const response = await axios.post(`${BASE_URL}/audit/preview`, data)
  return response.data
}