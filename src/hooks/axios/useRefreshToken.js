import AuthClient from 'src/api'
import { useDispatch } from 'react-redux'
import { setCredentials } from 'src/store/apps/auth'

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    const response = await AuthClient.get('/refresh', {
      withCredentials: true
    })
    dispatch(setCredentials(response.data))
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
