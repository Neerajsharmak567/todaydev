import axios from 'axios'
const API_URI = 'http://localhost:4001/api'

const AuthClient = axios.create({
  baseURL: API_URI,
  withCredentials: true
})

export const AuthClientPrivate = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

export default AuthClient
