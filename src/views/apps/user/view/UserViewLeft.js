// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import Router, { useRouter } from 'next/router'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 400,
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const UserViewLeft = ({ data }) => {
  // console.log('userViewLeft---->', data)
  const router = useRouter()
  const token = localStorage.getItem('accessToken')
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  const [userData, setDataValue] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSpecificUserData()
  }, [])

  const getSpecificUserData = () => {
    setLoading(true)
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + authConfig.userByIdEndpoint + `?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('UseEffect----->', response)
        setLoading(false)
        setDataValue({ ...response.data.user })
      })
      .catch(error => {
        console.log('error', error)
        setDataValue(null)
      })
  }

  // ** States
  const [formValue, setFormValue] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    status: '',
    address_line1: '',
    address_line2: '',
    city: '',
    contact_number: '',
    state: '',
    zip: ''
  })

  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const handleOnChangeEdit = e => {
    const { name, value } = e.target
    setFormValue(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }
  // Submit edit form
  const handleEditSubmit = () => {
    setLoading(true)
    const params = {
      firstName: formValue.firstName ? formValue.firstName : data.firstName,
      middleName: formValue.middleName ? formValue.middleName : data.middleName,
      lastName: formValue.lastName ? formValue.lastName : data.lastName,
      email: JSON.parse(localStorage.getItem('userData')).email
        ? JSON.parse(localStorage.getItem('userData')).email
        : '',
      // role: JSON.parse(localStorage.getItem('userData')).user.roles[0].title === 'Admin' ? 1 : 2,
      address_line1: formValue.address_line1 ? formValue.address_line1 : data.userContact.address_line1,
      address_line2: formValue.address_line2 ? formValue.address_line2 : data.userContact.address_line2,
      city: formValue.city ? formValue.city : data.userContact.city,
      contact_number: formValue.contact_number ? formValue.contact_number : data.userContact.contact_number,
      country: formValue.country ? formValue.country : data.userContact.country,
      state: formValue.state ? formValue.state : data.userContact.state,
      zip: formValue.zip ? formValue.zip : data.userContact.zip
    }
    console.log('===========dataDetails==>', params)
    // console.log('===========dataDetails==>', JSON.parse(localStorage.getItem('userData')).userId)
    axios
      .put(process.env.NEXT_PUBLIC_API_URL + authConfig.editUserProfile + `?id=${userId}`, params, {
        headers: { accept: '*/*', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })
      .then(async res => {
        setLoading(false)
        getSpecificUserData()
        router.push(`/apps/user/view/${userId}`)
        // router.push(`/home`)
        handleEditClose()
      })
  }

  const renderUserAvatar = () => {
    if (data) {
      if (data.avatar.length) {
        return (
          <CustomAvatar alt='User Image' src={data.avatar} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={data.avatarColor}
            sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
          >
            {getInitials(data.fullName)}
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }
  // if (data) {
  if (userData) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 6, display: 'flex', flexDirection: 'column' }}>
              {/* {renderUserAvatar()} */}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {data.fullName}
              </Typography>
            </CardContent>

            {/* <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      1.23k
                    </Typography>
                    <Typography variant='body2'>Task Done</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <StarOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      568
                    </Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent> */}

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    First Name:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.firstName ? userData.firstName : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Middle Name:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.middleName ? userData.middleName : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Last Name:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.lastName ? userData.lastName : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Address Line 1:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.userContact.address_line1
                      ? userData.userContact.address_line1
                      : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Address Line 2:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.userContact.address_line2
                      ? userData.userContact.address_line2
                      : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    City:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.userContact.city ? userData.userContact.city : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    State:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.userContact.state ? userData.userContact.state : 'Not Available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Zip:
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.userContact.zip ? userData.userContact.zip : 'Not Available'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>
                    {JSON.parse(localStorage.getItem('userData')).email
                      ? JSON.parse(localStorage.getItem('userData')).email
                      : 'Not Available'}
                    {/* {data && data.userContact.email ? data.userContact.email : 'Not Available'} */}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Status:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={userData && userData.status ? 'active' : 'deactive'}
                    // color={statusColors[userData.status]}
                    color={statusColors[userData && userData.status ? 'active' : 'inactive']}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {/* {localStorage.getItem('userData').user.roles.title} */}
                    {JSON.parse(localStorage.getItem('userData')).user.roles[0].title}
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Tax ID:</Typography>
                  <Typography variant='body2'>Tax-8894</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>+1 {userData.userContact.contact_number}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Language:</Typography>
                  <Typography variant='body2'>English</Typography>
                </Box> */}
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Country:</Typography>
                  <Typography variant='body2'>{userData.userContact.country}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined'>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='First Name' defaultValue={data.firstName} />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='FirstName'
                        name='firstName'
                        defaultValue={userData.firstName}
                        onChange={e => handleOnChangeEdit(e)}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='MiddleName'
                        name='middleName'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={userData.middleName}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='LastName'
                        name='lastName'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={userData.lastName}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Address Line 1'
                        name='address_line1'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={userData.userContact.address_line1}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Address Line 2'
                        name='address_line2'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={userData.userContact.address_line2}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='City'
                        name='city'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={userData.userContact.city}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Address line1'
                        defaultValue={data.userContact.address_line1}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        disabled
                        type='email'
                        label='Email'
                        name='email'
                        // onChange={e => handleOnChangeEdit(e)}
                        defaultValue={
                          JSON.parse(localStorage.getItem('userData')).email
                            ? JSON.parse(localStorage.getItem('userData')).email
                            : 'Not Available'
                        }
                        // defaultValue={data.userContact.email}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        disabled
                        type='role'
                        label='Role'
                        name='role'
                        onChange={e => handleOnChangeEdit(e)}
                        defaultValue={
                          JSON.parse(localStorage.getItem('userData')).user.roles[0].title
                            ? JSON.parse(localStorage.getItem('userData')).user.roles[0].title
                            : 'Not Available'
                        }
                        // defaultValue={data.userContact.email}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={userData.status ? 'active' : 'incative'}
                          id='user-view-status'
                          labelId='user-view-status-label'
                          name='status'
                          onChange={e => handleOnChangeEdit(e)}
                        >
                          {/* <MenuItem value='pending'>Pending</MenuItem> */}
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Contact'
                        name='contact_number'
                        defaultValue={`+1 ${userData.userContact.contact_number}`}
                        InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                        onChange={e => handleOnChangeEdit(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid> */}
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                {/* <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}> */}
                <Button variant='contained' sx={{ mr: 1 }} onClick={() => handleEditSubmit()}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
