import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { useSelector } from 'react-redux'

export const useAuth = () => useContext(AuthContext)

export const useAuth2 = () => {
  const auth = useSelector(state => state.auth)
  return { auth }
}
