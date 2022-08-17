import { useEffect } from 'react'
import { AuthClientPrivate } from 'src/api'
import { getCredentials } from 'src/store/apps/auth'
import useRefreshToken from './useRefreshToken'
import { useSelector } from 'react-redux'
const useAxiosPrivate = () => {
  const auth = useSelector(getCredentials)
  const { accessToken } = auth
  const refresh = useRefreshToken()
  useEffect(() => {
    const requestIntercept = AuthClientPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    const responseIntercept = AuthClientPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return AuthClientPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      AuthClientPrivate.interceptors.response.eject(responseIntercept)
      AuthClientPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [auth, refresh])
  return AuthClientPrivate
}

export default useAxiosPrivate
