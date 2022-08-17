// ** React Imports
import { forwardRef, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Radio button

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Auto complete data
import { state, role } from 'src/@fake-db/autocomplete'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

// ** State for radio

const AddProject = () => {
  // ** States
  const [date, setDate] = useState(null)
  const [language, setLanguage] = useState([])

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const [basicPicker, setBasicPicker] = useState(new Date())

  return (
    <Card>
      <Breadcrumbs
        aria-label='breadcrumb'
        px={{
          padding: '1.25rem'
        }}
      >
        <Link className='custom-link' href='/users'>
          Users
        </Link>
        <Typography color='text.primary' variant='body2'>
          Edit user
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Edit user'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Edit the details below to change the user information.'
      />

      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField fullWidth label='First Name' placeholder='First Name' required defaultValue='John' />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField fullWidth label='Middle Name' placeholder='Middle Name' equired defaultValue='E' />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField fullWidth label='Last Name' placeholder='Last Name' required defaultValue='Smith' />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label='Address Line 1'
                placeholder='Address Line 1'
                required
                defaultValue='1939 Norman Street'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label='Address Line 2'
                placeholder='Address Line 2'
                required
                defaultValue='Suite 100'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField fullWidth label='City' placeholder='City' required defaultValue='Los Angles' />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Autocomplete
                options={state}
                id='autocomplete-outlined'
                getOptionLabel={option => option.stateName}
                renderInput={params => <TextField {...params} label='Select State' />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField fullWidth label='Zip' placeholder='Zip' required defaultValue='90014' />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField fullWidth label='Email' placeholder='Email' required defaultValue='john@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField fullWidth label='Phone' placeholder='Phone' required defaultValue='+1 99876543210' />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Autocomplete
                options={role}
                id='autocomplete-outlined'
                getOptionLabel={option => option.roleName}
                renderInput={params => <TextField {...params} label='Select Role' />}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant='body1' sx={{ fontWeight: 600, mb: 2 }}>
                Password:
              </Typography>

              <Link href=''>
                <Button variant='outlined' color='secondary'>
                  Click here to reset the password
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ mt: 4 }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Save
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddProject
