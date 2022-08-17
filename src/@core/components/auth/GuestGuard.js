// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { isNil } from 'lodash'
// ** Hooks Import
import { useAuth2 } from 'src/hooks/useAuth'

const GuestGuard = props => {
  const { children, fallback } = props
  const { auth } = useAuth2()
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (!isNil(auth?.user) && !isNil(auth?.accessToken)) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  // console.log(!auth.loading && auth.user !== null)
  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  //   return fallback
  // }

  return <>{children}</>
}

export default GuestGuard
