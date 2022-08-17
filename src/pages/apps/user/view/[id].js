import { useState } from 'react'
// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
// ** Config
import authConfig from 'src/configs/auth'

const UserView = ({ id, invoiceData }) => {
  const [user, setUser] = useState([])
  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('userData')).userId

  axios
    .get(process.env.NEXT_PUBLIC_API_URL + authConfig.userByIdEndpoint + `?id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log('you called')
      // setUser(res.data.user)  // call multiple times due to munting issue
    })
    .catch(error => {
      console.log(error)
    })

  return <UserViewPage id={id} invoiceData={user} />
  // return <UserViewPage id={id} invoiceData={invoiceData} />
}
export default UserView

export const getStaticPaths = async () => {
  const res = await axios.get('/apps/users/list')
  const userDate = await res.data.allData

  const paths = userDate.map(item => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = res.data.allData

  return {
    props: {
      invoiceData,
      id: params?.id
    }
  }
}
