// ** React Imports
import { forwardRef, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Multiple from './components/Multiple'

// ** Styled Component - upload file
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Auto complete data
import { task, taskType } from 'src/@fake-db/autocomplete'

/// ** Upload file import
import FileUploaderMultiple from './components/FileUploaderMultiple'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

// ** State for radio

const EditTask = () => {
  // Selected Date
  const [basicPicker, setBasicPicker] = useState(new Date())

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
        <Link className='custom-link' href='/projects/tasks'>
          Task
        </Link>
        <Typography color='text.primary' variant='body2'>
          Edit task
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Edit task'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Edit the details below to change the task information.'
      />

      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={task}
                id='autocomplete-outlined'
                defaultValue={task[1]}
                getOptionLabel={option => option.taskName}
                renderInput={params => <TextField {...params} label='Parent task' />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Task Name' placeholder='Task name' defaultValue='User Authentication' />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={taskType}
                id='autocomplete-outlined'
                getOptionLabel={option => option.taskTypeName}
                defaultValue={taskType[1]}
                renderInput={params => <TextField {...params} label='Task type' />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                rows={4}
                multiline
                label='Description'
                id='textarea-outlined-static'
                defaultValue='This is the description of the task'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Multiple defaultValue={name[1]} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='full-width'>
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
            <Grid item xs={12} sm={6} md={4} className='full-width'>
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label='Estimation (Hours)' placeholder='Estimation (Hours)' defaultValue='6' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DropzoneWrapper>
                <FileUploaderMultiple />
              </DropzoneWrapper>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
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

export default EditTask
