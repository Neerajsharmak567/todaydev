// ** React Imports
import { forwardRef, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Auto complete data
import { resource, calendar, roles } from 'src/@fake-db/autocomplete'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

// ** State for radio

const AddResource = () => {
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

  // Selected Date
  const [basicPicker, setBasicPicker] = useState(null)

  return (
    <Card>
      <Breadcrumbs
        aria-label='breadcrumb'
        px={{
          padding: '1.25rem'
        }}
      >
        <Link className='custom-link' href='/projects'>
          Projects
        </Link>
        <Link className='custom-link' href='/projects/resources'>
          Resources
        </Link>
        <Typography color='text.primary' variant='body2'>
          Add resource
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Add resource'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Fill in the form to add resource to the project.'
      />

      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Project Name'
                placeholder='Project name'
                defaultValue='Project 1'
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={roles}
                id='autocomplete-outlined'
                getOptionLabel={option => option.role}
                renderInput={params => <TextField {...params} label='Role' />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                rows={4}
                multiline
                label='Description'
                id='textarea-outlined-static'
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={resource}
                id='autocomplete-outlined'
                getOptionLabel={option => option.userName}
                renderInput={params => <TextField {...params} label='Assign to' />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={calendar}
                id='autocomplete-outlined'
                getOptionLabel={option => option.calName}
                renderInput={params => <TextField {...params} label='Select work time' />}
              />
            </Grid>

            <Grid item xs={12} sm={12} className='full-width'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                px={{
                  width: '100%'
                }}
              >
                <DatePicker
                  label='Start Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} className='full-width'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                px={{
                  width: '100%'
                }}
              >
                <DatePicker
                  label='End Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ mt: 5 }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Add resource
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddResource
