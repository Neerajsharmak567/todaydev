// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import Link from 'next/link'
// ** Hooks Import
import { useAuth2 } from 'src/hooks/useAuth'
import { isNil } from 'lodash'

const AuthGuard = props => {
  const { children, fallback } = props
  const { auth } = useAuth2()
  const router = useRouter()
  // return auth?.user ? children : <Navigate to='login' />
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (isNil(auth?.user) && isNil(auth?.accessToken)) router.replace('/login')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (!isNil(auth?.user) && !isNil(auth?.accessToken)) return <>{children}</>
  else return <>{fallback}</>
}

export default AuthGuard
