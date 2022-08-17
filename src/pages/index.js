// ** React Imports
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  return '/home'
}

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(getHomeRoute())
  }, [])

  return <Spinner />
}

export default Home
