// ** React Imports
import { createContext, useEffect, useState } from 'react'
// ** Next Import
import Router, { useRouter } from 'next/router'
// import dotenv from 'react-dotenv'
// dotenv.config()
// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// import { useNavigate } from 'react-router-dom'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // console.log('Children------->', children)
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  // const navigate = useNavigate()
  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    // router.push('/home')
    // const initAuth = async () => {
    //   setIsInitialized(true)
    //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    //   if (storedToken) {
    //     setLoading(true)
    //     await axios
    //       .get(authConfig.meEndpoint, {
    //         headers: {
    //           Authorization: storedToken
    //         }
    //       })
    //       .then(async response => {
    //         setLoading(false)
    //         setUser({ ...response.data.userData })
    //       })
    //       .catch(() => {
    //         localStorage.removeItem('userData')
    //         localStorage.removeItem('refreshToken')
    //         localStorage.removeItem('accessToken')
    //         setUser(null)
    //         setLoading(false)
    //       })
    //   } else {
    //     setLoading(false)
    //   }
    // }
    // initAuth()
  }, [])

  const handleLogin = (params, errorCallback) => {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + authConfig.loginEndpoint, params, { headers })
      .then(res => {
        console.log('res auth context---------->', res)
        // if (res && res.data && res.data.user && res.data.user.role === 1) {
        // }
        const accessTokenObj = {
          email: res.data.user.email,
          refreshToken: res.data.user.refreshToken,
          user: {
            id: res.data.user.user.id,
            firstName: res.data.user.user.firstName,
            middleName: res.data.user.user.middleName,
            lastName: res.data.user.user.lastName,
            status: res.data.user.user.status,
            role: res.data.user.user.roles[0].title.toLowerCase(),
            roleId: res.data.user.user.roles[0].id
          },
          userId: res.data.user.userId
        }
        // console.log('accessTokenObj', { ...accessTokenObj.user })
        const returnUrl = router.query.returnUrl
        window.localStorage.setItem('accessToken', res.data.accessToken)
        window.localStorage.setItem('userData', JSON.stringify(res.data.user))
        setUser({ ...accessTokenObj.user })
        // setUser({ ...res.data.user })
        // await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        // console.log('redirectURL', redirectURL)

        router.replace(redirectURL)
        // Router.push({
        //   pathname: '/home'
        // })
        // return navigate('/home')

        // window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
      })
      // .then(() => {
      //   axios
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
      //       }
      //     })
      //     .then(async response => {
      //       const returnUrl = router.query.returnUrl
      //       setUser({ ...response.data.userData })
      //       await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
      //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      //       router.replace(redirectURL)
      //     })
      // })
      .catch(err => {
        console.log('eeeeeeeerrrrrr', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken')
    // window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
