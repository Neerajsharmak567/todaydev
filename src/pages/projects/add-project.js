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
import FormControl from '@mui/material/FormControl'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

// Mui Dialog import
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Radio button

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import CardSnippet from 'src/@core/components/card-snippet'
import DialogForm from 'src/views/components/dialogs/DialogForm'
// ** Auto complete data
import toast from 'react-hot-toast'
// api lib
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'

import { isEmpty, isNil } from 'lodash'

// ** State for radio
const defaultProjectValues = {
  project_title: '',
  project_description: '',
  start_date: null,
  end_date: null,
  status: null,
  userId: null,
  resources: [],
  estimationUnit: null
}
const defaultWorkTimeValues = {
  userId: null,
  calendarId: null,
  userName: ''
}
const AddProject = () => {
  const { axiosReq: allStatusReq, response: allStatus, loading } = useAxios()
  const { axiosReq: allUserReq, response: allUser } = useAxios()
  const { axiosReq: allCalendarReq, response: allCalendar } = useAxios()
  const { axiosReq: submitProjectReq, response: projectSubmitRes, error } = useAxios()
  const { axiosReq: updateWorkTimeReq, response: updateWorkTimeRes, error: workTimeError } = useAxios()

  const axiosPrivate = useAxiosPrivate()
  // ** States

  const [selectedResource, setSelectedResource] = useState(null)

  //  Add resourse
  const [resources, setResources] = useState([])
  const [workTimeValue, setWorkTimeValue] = useState(defaultWorkTimeValues)
  const [deleteId, setDeleteId] = useState(null)

  // form data
  const [project, setProject] = useState(defaultProjectValues)

  // ** Dialog

  const [open, setOpen] = useState(false)
  const [workTimeModal, setWorkTimeModal] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setWorkTimeModal(false)
  }

  // handle name changes names
  const handleProjectChange = e => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  // delete resource project
  const getUser = id => {
    if (!isEmpty(allUser)) return allUser.users.filter(x => id === x.id)[0]
  }
  const getStatus = id => {
    if (!isEmpty(allStatus)) return allStatus.status.filter(val => val.id === id)[0]
  }
  const checkUserCalendarExist = id => {
    const user = getUser(id)
    if (isEmpty(user.calendar)) {
      return true
    }
    return false
  }
  const getMappedResourceData = id => {
    let user = getUser(id)
    let mappedData = {
      id: user.id,
      userId: user.id,
      userName: user.firstName,
      calendarName: user.calendar[0].title
    }
    return mappedData
  }

  // confirmed delete functionlity
  const handleResourceDeleteConfirm = () => {
    let filterResource = project.resources.filter(x => x !== deleteId)
    let filterTableResource = resources.filter(x => x.userId !== deleteId)
    setProject({ ...project, resources: filterResource })
    setResources(filterTableResource)
    setOpen(false)
  }
  const handleDeleteClick = id => {
    setDeleteId(id)
    setOpen(true)
  }
  // handle submit project resources
  const handleAddResource = idx => {
    if (isNil(selectedResource)) {
      toast.error('Resource not selected')
    } else if (project.resources.includes(selectedResource)) {
      toast.error('Resource already exists')
    } else if (checkUserCalendarExist(selectedResource)) {
      let user = getUser(selectedResource)
      setWorkTimeValue({ ...workTimeValue, userName: user.firstName, userId: user.id })
      setWorkTimeModal(true)
    } else {
      setResources([...resources, getMappedResourceData(selectedResource)])
      setProject({ ...project, resources: [...project.resources, selectedResource] })
    }
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      renderCell: ({ row }) => <Typography variant='body2'>{row.userName}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'workTime',
      headerName: 'Work Time',
      minWidth: 300,
      renderCell: ({ row }) => <Typography variant='body2'>{row.calendarName}</Typography>
    },

    {
      flex: 0.15,
      minWidth: 200,
      field: 'action',
      minWidth: '200px',
      headerName: 'Action',
      minWidth: 250,
      renderCell: ({ row }) => {
        return (
          <Tooltip title='Delete' arrow>
            <IconButton onClick={() => handleDeleteClick(row.userId)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        )
      }
    }
  ]

  const getAllStatus = async () => {
    await allStatusReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allStatus',
      requestConfig: {}
    })
  }
  const getAllUser = async () => {
    await allUserReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allUser',
      requestConfig: {}
    })
  }
  const getAllCalendar = async () => {
    await allCalendarReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allCalendar',
      requestConfig: {}
    })
  }
  // Submit Project form
  const handleProjectSubmit = async e => {
    e.preventDefault()
    await submitProjectReq({
      axiosInstance: axiosPrivate,
      method: 'POST',
      endpoint: '/project',
      requestConfig: {
        ...project
      }
    })
  }
  const handleUpdateUserWorkTime = async e => {
    e.preventDefault()
    if (isNil(workTimeValue.calendarId)) {
      toast.error('Please select calendar')
    } else {
      await updateWorkTimeReq({
        axiosInstance: axiosPrivate,
        method: 'PUT',
        endpoint: '/workTime',
        requestConfig: {
          ...workTimeValue
        }
      })
      await getAllUser()
    }
  }
  useEffect(() => {
    async function getData() {
      await getAllStatus()
      await getAllUser()
      await getAllCalendar()
    }
    getData()
  }, [])
  useEffect(() => {
    if (!isEmpty(projectSubmitRes)) {
      toast.success(projectSubmitRes.message)
      setProject(defaultProjectValues)
      setSelectedResource(null)
      setResources([])
    }
    if (error) {
      toast.error(error)
    }
  }, [projectSubmitRes, error])
  useEffect(() => {
    if (!isEmpty(updateWorkTimeRes)) {
      toast.success(updateWorkTimeRes.message)
      setWorkTimeValue(defaultWorkTimeValues)
      handleClose()
    }
    if (workTimeError) {
      toast.error(workTimeError)
    }
  }, [updateWorkTimeRes, workTimeError])

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
        <Typography color='text.primary' variant='body2'>
          Add project
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Add project'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Fill in the form to add the project.'
      />

      <form onSubmit={handleProjectSubmit}>
        {loading ? (
          <CircularProgress
            sx={{
              color: 'common.white',
              width: '20px !important',
              height: '20px !important',
              mr: theme => theme.spacing(2)
            }}
          />
        ) : null}
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label='Project Name'
                placeholder='Project name'
                autoComplete='off'
                onChange={handleProjectChange}
                value={project.project_title}
                name='project_title'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} px={{ paddingTop: '15px !important' }}>
              <Autocomplete
                onChange={(e, val) => setProject({ ...project, status: isNil(val) ? val : val.id })}
                options={allStatus ? allStatus.status : []}
                id='autocomplete-outlined'
                name='status'
                getOptionLabel={option => option.title}
                value={isNil(getStatus(project.status)) ? null : getStatus(project.status)}
                renderInput={params => <TextField {...params} label='Select Project Status ' />}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                name='project_description'
                rows={4}
                multiline
                label='Description'
                style={{ width: '100%' }}
                onChange={handleProjectChange}
                value={project.project_description}
              />
            </Grid>
            <Grid item xs={12} sm={6} className='full-width'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                px={{
                  width: '100%'
                }}
              >
                <DatePicker
                  name='start_date'
                  label='Start Date'
                  value={project.start_date}
                  onChange={val => setProject({ ...project, start_date: val })}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} className='full-width'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                px={{
                  width: '100%'
                }}
              >
                <DatePicker
                  name='end_date'
                  label='End Date'
                  value={project.end_date}
                  onChange={val => setProject({ ...project, end_date: val })}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, pt: 2 }}>
                Resource assignment
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              px={{
                paddingTop: '15px !important'
              }}
            >
              <Autocomplete
                options={allUser ? allUser.users : []}
                id='autocomplete-outlined'
                getOptionLabel={option => option.firstName}
                onChange={(event, value) => setSelectedResource(isNil(value) ? value : value.id)}
                value={isNil(getUser(selectedResource)) ? null : getUser(selectedResource)}
                renderInput={params => <TextField {...params} label='Select Resources' />}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button onClick={handleAddResource} size='small' sx={{ mr: 2 }} variant='contained' color='secondary'>
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DataGrid
                autoHeight
                rows={!isEmpty(resources) ? resources : []}
                columns={columns}
                disableSelectionOnClick
                // rowsPerPageOptions={[10, 25, 50]}
                // onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                hideFooter
              />
            </Grid>
          </Grid>
        </CardContent>
        <Grid item xs={12} sm={12}>
          <Typography variant='body2' sx={{ fontWeight: 400 }}>
            Estimation Display Unit
          </Typography>
          <FormControl sx={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            <RadioGroup row name='simple-radio' aria-label='simple-radio' value={project.estimationUnit}>
              <FormControlLabel
                value='2'
                control={<Radio />}
                label='Days'
                onChange={e => setProject({ ...project, estimationUnit: e.target.value })}
              />
              <FormControlLabel
                value='1'
                control={<Radio />}
                label='Hours'
                onChange={e => setProject({ ...project, estimationUnit: e.target.value })}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ pb: 2 }}>{'Delete resources?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to remove the resource.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleResourceDeleteConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={workTimeModal}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        fullWidth
        maxWidth='md'
      >
        <CardSnippet title='Calendar Add Form'>
          <Typography sx={{ mb: 4 }}>Please select the calendar!</Typography>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField disabled fullWidth value={workTimeValue.userName} name='projectName' />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Autocomplete
                options={allCalendar ? allCalendar.calendar : []}
                id='autocomplete-outlined'
                onChange={(event, value) => setWorkTimeValue({ ...workTimeValue, calendarId: value.id })}
                getOptionLabel={option => option.title}
                renderInput={params => <TextField {...params} label='Select Work Calendar' />}
              />
            </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: 'start', pl: 0 }}>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleUpdateUserWorkTime}>
              Submit
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </CardSnippet>
      </Dialog>

      {/* end of the add dialogs form */}
    </Card>
  )
}

export default AddProject
