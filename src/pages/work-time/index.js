// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import WorkTimeListing from './work-time-listing'

const WorkTimeList = () => {
  // ** State
  const [pageSize, setPageSize] = useState(10)

  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Work Time</Typography>}
          subtitle={
            <Typography
              variant='body2'
              sx={{
                mt: 1,
                mb: 2
              }}
            >
              Welcome to work time page here you can view, edit and delete user work time information.
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          {/* Table header */}
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
            <TextField size='small' sx={{ mr: 4, mb: 2.5 }} placeholder='Search calendar' />
            <Link href='/work-time/add-work-time'>
              <Button sx={{ mb: 2.5 }} variant='contained'>
                Add Work Time
              </Button>
            </Link>
          </Box>
          <WorkTimeListing />
        </Card>
      </Grid>
    </Grid>
  )
}

export default WorkTimeList
