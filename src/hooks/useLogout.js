import AuthClient from 'src/api'
import { useDispatch } from 'react-redux'
import { logOut } from 'src/store/apps/auth'
import { useRouter } from 'next/router'

const useLogout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const logout = async () => {
    const response = await AuthClient.post(
      '/logout',
      {},
      {
        withCredentials: true
      }
    )
    if (response.status === 204) {
      dispatch(logOut())
      router.push('/login')
    }
  }
  return { logout }
}

export default useLogout
