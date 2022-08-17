import axios from 'axios'

// const CommonServices =()=>{
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
// get API without Authentication
export const getAPI = urlSegment => {
  return axios.get(API_BASE_URL + urlSegment)
}
export const getAPIWithAccessToken = urlSegment => {
  const token = localStorage.getItem('accessToken')
  return axios.get(API_BASE_URL + urlSegment, { headers: { Authorization: `Bearer ${token}` } })
}
// post api with authentication
export const postAPIWithAccessToken = (urlSegment, params = {}) => {
  console.log('urlSegment-->', API_BASE_URL + urlSegment, 'dsfsdfsfs', params)
  const token = localStorage.getItem('accessToken')
  return axios.post(API_BASE_URL + urlSegment, params, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
// put api with authentication
export const updateAPIWithAccessToken = (urlSegment, params = {}) => {
  const token = localStorage.getItem('accessToken')
  return axios.put(API_BASE_URL + urlSegment, params, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
// delete api with authentication
export const deleteAPIWithAccessToken = (urlSegment, id) => {
  const token = localStorage.getItem('accessToken')
  return axios.delete(API_BASE_URL + urlSegment + `?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

// }
export const getAPIByIdWithAccessToken = (urlSegment, id) => {
  // console.log('urlSegment-sdsdsd->', API_BASE_URL + urlSegment + `?id=${id}`)
  const token = localStorage.getItem('accessToken')
  return axios.get(API_BASE_URL + urlSegment + `?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
}

// export default CommonServices
