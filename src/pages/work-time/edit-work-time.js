// ** React Imports
import { forwardRef, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'

// MUI Dialog import
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Third party plugin
import Calendar from './Calendar'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Auto complete data
import { weeks } from 'src/@fake-db/autocomplete'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const EditWorkTime = () => {
  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // ** States
  const [value, onChange] = useState(new Date())

  // ** Date Picker
  const [basicPicker, setBasicPicker] = useState(new Date())

  // ** Pagination
  const [pageSize, setPageSize] = useState(10)

  // ** Data grid content
  const columns = [
    {
      flex: 0.12,
      minWidth: 200,
      field: 'id',
      headerName: 'ID',
      minWidth: 200,
      renderCell: ({ row }) => <Typography variant='body2'>{row.id}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'dayName',
      headerName: 'Name',
      minWidth: 200,
      renderCell: ({ row }) => <Typography variant='body2'>{row.dayName}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'date',
      headerName: 'Date',
      minWidth: 300,
      renderCell: ({ row }) => <Typography variant='body2'>{row.date}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 200,
      field: 'action',
      minWidth: '200px',
      headerName: 'Action',
      minWidth: 100,
      renderCell: ({ row }) => {
        return (
          <Tooltip title='Delete'>
            <IconButton onClick={handleClickOpen}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        )
      }
    }
  ]

  const rows = [
    {
      id: 1,
      dayName: 'Memorial Day',
      date: '30/05/2022'
    },
    {
      id: 2,
      dayName: 'Independence Day',
      date: '07/04/2022'
    }
  ]

  return (
    <Card>
      <Breadcrumbs
        aria-label='breadcrumb'
        px={{
          padding: '1.25rem'
        }}
      >
        <Link className='custom-link' href='/work-time'>
          Work time
        </Link>
        <Typography color='text.primary' variant='body2'>
          Edit work time
        </Typography>
      </Breadcrumbs>

      <CardHeader
        title='  Edit Work time'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Edit the details below to change the work time information.'
      />

      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField fullWidth label='Name' placeholder='Name' defaultValue='Project-1' />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, pt: 3 }}>
                Work Weeks
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} className='c-padding'>
              <Autocomplete
                options={weeks}
                id='autocomplete-outlined'
                getOptionLabel={option => option.weekName}
                defaultValue={weeks[0]}
                renderInput={params => <TextField {...params} label='Select Start' />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className='c-padding'>
              <Autocomplete
                options={weeks}
                id='autocomplete-outlined'
                defaultValue={weeks[5]}
                getOptionLabel={option => option.weekName}
                renderInput={params => <TextField {...params} label='Select End' />}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, pt: 3 }}>
                Exception
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className='c-padding'>
              <TextField fullWidth label='Name' placeholder='Name' />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className='calendar-width c-padding'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Select Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button variant='contained' size='small' color='secondary'>
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Calendar />
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

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ pb: 2 }}>{'Remove exception day?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to remove the exception.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default EditWorkTime
