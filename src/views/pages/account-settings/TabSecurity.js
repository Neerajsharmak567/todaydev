// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
// ** Third Party Imports
import toast from 'react-hot-toast'

const TabSecurity = () => {
  const token = localStorage.getItem('accessToken')
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  const [errorShow, setErrorShow] = useState('Password did not match.')
  const [condtion, setCondition] = useState(false)
  const [loading, setLoading] = useState(false)
  const [SuccessMessage, setSuccessMessage] = useState('Changed password successfuly.')

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setCondition(false)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setCondition(false)
    setValues({ ...values, [prop]: event.target.value })
    // if (values && values.newPassword === values.confirmNewPassword) {
    // } else {
    //   setCondition(true)
    // }
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setCondition(false)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }
  // submit change password
  const submitChangePassword = event => {
    event.preventDefault()
    setCondition(false)
    // const params = 'ds'
    const params = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword
    }
    if (values && values.newPassword === values.confirmNewPassword) {
      console.log('dsfasfafa', values)
      // setValues({ ...values, [prop]: event.target.value })
      axios
        .put(process.env.NEXT_PUBLIC_API_URL + authConfig.changePassword, params, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(async response => {
          setLoading(false)
          // console.log('UseEffect----->', response.data.message)
          if (response && response.data && response.data.message) {
            toast.success(response.data.message)
            setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    } else {
      setCondition(true)
    }
  }

  return (
    <form>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                          // error={true}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormHelperText>{condtion ? errorShow : ''}</FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={6} xs={12} sx={{ display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}>
            <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 0, mb: 6 }} />

        {/* <Box sx={{ mb: 11, display: 'flex', alignItems: 'center' }}>
          <Key sx={{ mr: 4 }} />
          <Typography variant='h5'>Two-factor authentication</Typography>
        </Box> */}

        {/* <Box sx={{ mb: 11, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 440,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <CustomAvatar skin='light' variant='rounded' sx={{ mb: 4, width: 48, height: 48 }}>
              <LockOpenOutline />
            </CustomAvatar>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box> */}

        <Box>
          <Button variant='contained' sx={{ mr: 4 }} onClick={submitChangePassword}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
