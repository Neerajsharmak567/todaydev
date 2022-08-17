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
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Tooltip from '@mui/material/Tooltip'

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

// ** Icons Imports

import { useRouter } from 'next/router'
import { isEmpty, isNil } from 'lodash'
// ** Axios hookss
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'
import toast from 'react-hot-toast'
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
const mapProject = data => {
  let mapResources = data.projectContact.map(val => {
    return val.id
  })
  const mappedData = {
    id: data.id,
    project_title: data.title,
    project_description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
    status: data.statusId,
    userId: data.userId,
    resources: mapResources,
    estimationUnit: data.estimationUnitId
  }
  return mappedData
}
const EditProject = () => {
  // ** States
  const router = useRouter()
  const id = parseInt(router.query.id)
  const { axiosReq: getProjectReq, response: project } = useAxios()
  const { axiosReq: getEstimationUnitReq, response: estimationUnit } = useAxios()
  const { axiosReq: allStatusReq, response: allStatus, loading } = useAxios()
  const { axiosReq: allUserReq, response: allUser } = useAxios()
  const { axiosReq: allCalendarReq, response: allCalendar } = useAxios()
  const { axiosReq: updateProjectReq, response: projectUpdateRes, error } = useAxios()
  const { axiosReq: updateWorkTimeReq, response: updateWorkTimeRes, error: workTimeError } = useAxios()

  const [open, setOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [updateProject, setUpdateProject] = useState([])
  const [resources, setResources] = useState([])
  const axiosPrivate = useAxiosPrivate()

  const getStatus = id => {
    if (!isEmpty(allStatus)) return allStatus.status.filter(val => val.id === id)[0]
  }

  const getProjectById = async id => {
    await getProjectReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/project',
      requestConfig: {
        params: { id }
      }
    })
  }

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
  const getAllEstimationUnit = async () => {
    await getEstimationUnitReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allEstimationUnit',
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
  const handleProjectUpdate = async e => {
    e.preventDefault()

    await updateProjectReq({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      endpoint: '/project',
      requestConfig: {
        ...updateProject
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
    }
  }

  const handleAddResource = idx => {
    if (isNil(selectedResource)) {
      toast.error('Resource not selected')
    } else if (updateProject.resources.includes(selectedResource)) {
      toast.error('Resource already exists')
    } else if (checkUserCalendarExist(selectedResource)) {
      let user = getUser(selectedResource)
      setWorkTimeValue({ ...workTimeValue, userName: user.firstName, userId: user.id })
      setWorkTimeModal(true)
    } else {
      setResources([...resources, getMappedResourceData(selectedResource)])
      setUpdateProject({ ...updateProject, resources: [...updateProject.resources, selectedResource] })
    }
  }
  const getMappedResourceData = id => {
    let user = getUser(id)
    let mappedData = {
      id: user.id,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      calendar: user.calendar
    }
    return mappedData
  }
  const checkUserCalendarExist = id => {
    const user = getUser(id)
    if (isEmpty(user.calendar)) {
      return true
    }
    return false
  }
  const getUser = id => {
    if (!isEmpty(allUser)) return allUser.users.filter(x => id === x.id)[0]
  }
  const handleProjectChange = e => {
    const { name, value } = e.target
    setUpdateProject({ ...updateProject, [name]: value })
  }
  const handleResourceDeleteConfirm = () => {
    let filterResource = updateProject.resources.filter(x => x !== deleteId)
    let filterTableResource = resources.filter(x => x.id !== deleteId)

    setUpdateProject({ ...updateProject, resources: filterResource })
    setResources(filterTableResource)
    setOpen(false)
  }
  const handleDeleteClick = id => {
    setDeleteId(id)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'title',
      headerName: 'Name',
      minWidth: 200,
      renderCell: ({ row }) => <Typography variant='body2'>{row.firstName + ' ' + row.lastName}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'workTime',
      headerName: 'Work Time',
      minWidth: 300,
      renderCell: ({ row }) => <Typography variant='body2'>{row.calendar[0].title}</Typography>
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
            <IconButton onClick={() => handleDeleteClick(row.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        )
      }
    }
  ]

  useEffect(() => {
    async function getData() {
      await getAllStatus()
      await getAllUser()
      await getAllCalendar()
      await getAllEstimationUnit()
    }
    getData()
  }, [])
  useEffect(() => {
    if (!isEmpty(projectUpdateRes)) {
      toast.success(projectUpdateRes.message)
    }
    if (error) {
      toast.error(error)
    }
  }, [projectUpdateRes, error])
  useEffect(() => {
    if (!isNaN(id)) getProjectById(id)
  }, [id])
  useEffect(() => {
    if (!isEmpty(project)) {
      setUpdateProject(mapProject(project.project))
      setResources(project.project.projectContact)
    }
  }, [project])

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
          Edit project
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='Edit project'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Edit the details below to change the project information.'
      />

      <form onSubmit={handleProjectUpdate}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                name='project_title'
                fullWidth
                multiline
                InputLabelProps={{ shrink: true }}
                label='Project Name'
                placeholder='Project Name'
                id='textarea-outlined-static'
                required
                value={updateProject.project_title}
                onChange={handleProjectChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Autocomplete
                options={allStatus ? allStatus.status : []}
                id='autocomplete-outlined'
                name='status'
                getOptionLabel={option => option.title}
                value={isNil(getStatus(updateProject.status)) ? null : getStatus(updateProject.status)}
                renderInput={params => <TextField {...params} label='Select Project Status ' />}
                onChange={(e, val) => setUpdateProject({ ...updateProject, status: isNil(val) ? val : val.id })}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                name='project_description'
                rows={4}
                multiline
                InputLabelProps={{ shrink: true }}
                label='Description'
                id='textarea-outlined-static'
                style={{ width: '100%' }}
                required
                placeholder='Description'
                value={updateProject.project_description}
                onChange={handleProjectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} className='full-width'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Start Date'
                  value={updateProject.start_date}
                  onChange={val => setUpdateProject({ ...updateProject, start_date: val })}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} className='full-width'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='End Date'
                  name='end_date'
                  value={updateProject.end_date}
                  onChange={val => setUpdateProject({ ...updateProject, end_date: val })}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 400 }}>
                Resource assignment
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              px={{
                paddingTop: '10px !important'
              }}
            >
              <Autocomplete
                options={allUser ? allUser.users : []}
                id='autocomplete-outlined'
                onChange={(event, value) => setSelectedResource(isNil(value) ? value : value.id)}
                getOptionLabel={option => option.firstName}
                renderInput={params => <TextField {...params} label='Select Resources' />}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button size='small' sx={{ mr: 2 }} variant='contained' color='secondary' onClick={handleAddResource}>
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DataGrid
                autoHeight
                rows={resources}
                columns={columns}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                // onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                hideFooter
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant='body2' sx={{ fontWeight: 400 }}>
                Estimation Display Unit
              </Typography>
              <FormControl sx={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <RadioGroup
                  row
                  name='simple-radio'
                  aria-label='simple-radio'
                  // onChange={handleRadioButton}
                  value={parseInt(updateProject.estimationUnit)}
                >
                  {!isEmpty(estimationUnit) &&
                    estimationUnit.estimationUnits.map((val, id) => {
                      return (
                        <FormControlLabel
                          key={id}
                          value={val.id}
                          control={<Radio />}
                          label={val.title}
                          onChange={e => setUpdateProject({ ...updateProject, estimationUnit: e.target.value })}
                        />
                      )
                    })}
                </RadioGroup>
              </FormControl>
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

      <Dialog open={open} onClose={handleClose} keepMounted aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ pb: 2 }}>{'Delete resources?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to remove the resource.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleResourceDeleteConfirm}>Confirm</Button>
          {/* <Button onClick={handleClose}>Confirm</Button> */}
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default EditProject
