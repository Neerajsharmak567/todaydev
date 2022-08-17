// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import TextField from '@mui/material/TextField'
import TaskListing from './components/task-listing'

const TaskList = () => {
  const router = useRouter()

  const projectName = router.query.projectName
  // Selected Date
  const [basicPicker, setBasicPicker] = useState(null)

  // ** State
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  // ** State pagination
  const [page, setPage] = useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className='custom-link' href='/projects'>
              Projects
            </Link>
            <Typography color='text.primary' variant='body2'>
              Task
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h5'>Task List</Typography>
            <Typography
              variant='body1'
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: 600,
                color: 'text.secondary'
              }}
            >
              Project:{' '}
              <Typography
                variant='span'
                sx={{
                  color: 'text.primary'
                }}
              >
                {projectName || 'N/A'}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <Box
              sx={{
                p: 5,
                pb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <TextField size='small' sx={{ mr: 4, mb: 2.5 }} placeholder='Search task' />
              <Link href='/projects/tasks/add-task'>
                <Button sx={{ mb: 2.5 }} variant='contained'>
                  Add task
                </Button>
              </Link>
            </Box>
            <TaskListing />
          </Card>
        </Grid>
      </Grid>
      <Card></Card>
    </>
  )
}

export default TaskList
