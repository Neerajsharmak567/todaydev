import { useEffect, useState } from 'react'
import useRefreshToken from 'src/hooks/axios/useRefreshToken'
import Spinner from 'src/@core/components/spinner'
import { useAuth2 } from 'src/hooks/useAuth'
const PersistAuth = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth } = useAuth2()
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false)
  }, [])
  return loading ? <Spinner /> : children
}
export default PersistAuth
