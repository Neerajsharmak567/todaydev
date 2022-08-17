// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'

// import UserViewRight from 'src/views/apps/user/view/UserViewRight'

const UserView = ({ id, invoiceData }) => {
  // console.log('ddddddddddddddd Check--------------------', id, invoiceData)
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  useEffect(() => {
    // axios
    // .get('/apps/user', { params: { id } })
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + authConfig.userByIdEndpoint + `?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // console.log('response-35---UserViewPage->', response.data.user)
        setData(response.data.user)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [userId])
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewLeft data={data} />
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
            <Link href='/apps/user/list'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserView
