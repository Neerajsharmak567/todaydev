// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

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
import Box from '@mui/material/Box'

import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Styled Component - upload file
// import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Source code imports
// import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Import custom component
// import Multiple from './components/Multiple'

// ** Auto complete data
import { task, taskType } from 'src/@fake-db/autocomplete'

/// ** Upload file import
// import FileUploaderMultiple from './components/FileUploaderMultiple'
import toast from 'react-hot-toast'
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

import {
  getAPI,
  getAPIWithAccessToken,
  updateAPIWithAccessToken,
  postAPIWithAccessToken
} from 'src/services/CommonServices'
// ** Config
import authConfig from 'src/configs/auth'

// ** State for radio

const AddTask = () => {
  // Selected Date
  // const [basicPicker, setBasicPicker] = useState(new Date())

  const [basicPicker, setBasicPicker] = useState(null)
  const [projectAllTask, setprojectAllTask] = useState([])
  const [allUser, setAllUser] = useState([])
  const [selectedValue, setSelectedValue] = useState([])
  const [estimateDaysOrHours, setEstimateDaysOrHours] = useState()
  const [allProjectStatus, setAllProjectStatus] = useState([])
  const [loading, setLoading] = useState(false)
  // Add status
  const [projectStatus, setprojectStatus] = useState(null)
  // Selected Date
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // form data
  const [formValue, setFormValue] = useState({
    taskName: '',
    description: ''
  })

  // load after DOM
  useEffect(() => {
    getAllProjectTask()
    getAllUsaer()
    getProjectStatus()
  }, [])

  // Handle Select

  // get All project task
  const getAllProjectTask = async () => {
    setLoading(true)
    try {
      const result = await getAPIWithAccessToken(authConfig.allProjectTaskEndpoint)
      console.log('result-all project task->', result.data)
      if (result) {
        setLoading(false)
        setprojectAllTask(result.data.allTask)
      }
    } catch (error) {
      console.log('error', error)
      setprojectAllTask(null)
    }
  }

  // get All user
  const getAllUsaer = async () => {
    setLoading(true)
    try {
      const result = await getAPIWithAccessToken(authConfig.allUserEndpoint)
      console.log('result-user->', result.data)
      if (result) {
        setLoading(false)
        setAllUser(result.data.users)
      }
    } catch (error) {
      console.log('error', error)
      setAllUser(null)
    }
  }

  // get project Status api
  const getProjectStatus = async () => {
    setLoading(true)
    try {
      const result = await getAPIWithAccessToken(authConfig.allProjectStatusEndpoint)
      console.log('result-allProjectStatusEndpoint->', result.data)
      if (result) {
        setLoading(false)
        setAllProjectStatus(result.data.status)
      }
    } catch (error) {
      console.log('error', error)
      setAllProjectStatus(null)
    }
  }

  // Handle task name change
  const handleNameChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    // console.log('name change=====>', name, 'vaaaa', value)
    // setProTaskName(value)
    setFormValue(prevState => {
      return { ...prevState, [name]: value }
    })
  }
  // handle assign change
  const handleAssignChange = event => {
    console.log('event------asign', event)
    setSelectedValue(event.target.value)
  }
  // handle estimate houror days
  const handleEstimationChange = e => {
    e.preventDefault()
    setEstimateDaysOrHours(e.target.value)
  }

  const handleChangesStatus = (e, status) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log('dfdsfsfsdfsdf---status->', e.target, status)
    setprojectStatus(status.id)
  }

  // add submit task
  const SubmitAddTask = async e => {
    e.preventDefault()
    try {
      const params = {
        task_title: formValue.taskName,
        task_description: formValue.description,
        status: projectStatus,
        projectId: 1,
        parentId: null,
        start_date: startDate,
        end_date: endDate,
        estimations: estimateDaysOrHours,
        taskAssignments: [...selectedValue]
      }
      console.log('parsmzs-->', params)

      setLoading(true)
      const result = await postAPIWithAccessToken(authConfig.addProjectTaskEndpoint, params)
      console.log('result-user->', result.data)
      if (result) {
        setLoading(false)
        toast.success(result.data.message, {
          duration: 3000
        })
        // setAllUser(result.data)
      }
    } catch (error) {
      console.log('error', error)
      // setAllUser(null)
    }
  }
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
          Add task
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Add task'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Fill in the form to add task for the project.'
      />

      <form onSubmit={SubmitAddTask}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Autocomplete
                options={['None']}
                // options={task || [None]}
                id='autocomplete-outlined'
                getOptionLabel={option => option}
                // getOptionLabel={option => option.taskName}
                renderInput={params => <TextField {...params} label='Parent task' />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Autocomplete
                onChange={(event, value) => handleChangesStatus(event, value)}
                options={allProjectStatus || []}
                id='autocomplete-outlined'
                name='status'
                getOptionLabel={option => option.title}
                renderInput={params => <TextField {...params} label='Select Task Status ' />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Task Name'
                placeholder='Task name'
                value={formValue.taskName}
                name='taskName'
                onChange={handleNameChange}
              />
            </Grid>

            {/* <Grid item xs={12} sm={12}>
              <Autocomplete
                options={taskType}
                id='autocomplete-outlined'
                getOptionLabel={option => option.taskTypeName}
                renderInput={params => <TextField {...params} label='Task type' />}
              />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField
                rows={4}
                multiline
                label='Description'
                id='textarea-outlined-static'
                style={{ width: '100%' }}
                name='description'
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <Multiple userData={allUser} /> */}
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='event-calendar'>Assign</InputLabel>
                <Select
                  multiple
                  label='Assign'
                  value={selectedValue}
                  labelId='event-user'
                  onChange={handleAssignChange}
                  // onChange={e => setSelectedValue({ ...selectedValue, name: e.target.value })}
                >
                  {allUser &&
                    allUser.map(elem => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.firstName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='full-width'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                px={{
                  width: '100%'
                }}
              >
                {/* <DatePicker
                  label='Start Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField {...params} />}
                /> */}
                <DatePicker
                  label='Start Date'
                  value={startDate}
                  onChange={newValue => setStartDate(newValue)}
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
                  value={endDate}
                  onChange={newValue => setEndDate(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
                {/* <DatePicker
                  label='End Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField {...params} />}
                /> */}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='event-estimate'>Estimation</InputLabel>
                <Select
                  label='Estimation'
                  value={estimateDaysOrHours}
                  labelId='event-user'
                  onChange={handleEstimationChange}
                  // onChange={e => setSelectedValue({ ...selectedValue, name: e.target.value })}
                >
                  <MenuItem key={1} value={1}>
                    Days
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Hours
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label='Estimation (Hours)' placeholder='Estimation (Hours)' />
            </Grid> */}

            {/* <Grid item xs={12} sm={12}>
              <DropzoneWrapper>
                <FileUploaderMultiple />
              </DropzoneWrapper>
            </Grid> */}
          </Grid>
        </CardContent>

        <CardActions sx={{ mt: 4 }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Add task
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddTask
