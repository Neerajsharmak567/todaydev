import React, { useState } from 'react'

import Link from 'next/link'

// ** MUI Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { DataGrid } from '@mui/x-data-grid'

// ** Calendar
import Calendar from './Calendar'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'id',
    headerName: 'ID',
    minWidth: 200,
    renderCell: ({ row }) => <Typography variant='body2'>{row.id}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'day',
    headerName: 'Day',
    minWidth: 200,
    renderCell: ({ row }) => <Typography variant='body2'>{row.day}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'date',
    headerName: 'date',
    minWidth: 300,
    renderCell: ({ row }) => <Typography variant='body2'>{row.date}</Typography>
  }
]

const rows = [
  {
    id: 1,
    day: 'Memorial Day',
    date: '04/30/2022'
  },
  {
    id: 2,
    day: 'Independence Day',
    date: '07/04/2022'
  },
  {
    id: 3,
    day: 'Labor Day	',
    date: '09/05/2022'
  }
]

const LabelStyle = {
  fontWeight: '600',
  mb: 1,
  fontSize: '15px'
}

const ViewWorkTime = () => {
  const [pageSize, setPageSize] = useState(10)
  const [value, onChange] = useState(new Date())

  return (
    <>
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
            View work time
          </Typography>
        </Breadcrumbs>

        <CardContent>
          <Box className='card-header'>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant='h6'
                  sx={{
                    mb: 5,
                    color: 'text.secondary'
                  }}
                >
                  Calendar:
                  <Typography variant='span' sx={{ color: 'text.primary' }}>
                    {' '}
                    eKart Resource Calendar
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Work Weeks:
              </Typography>
              <Typography variant='body2' sx={{}}>
                Monday to Friday
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Exception:
              </Typography>

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
          <Link href='/work-time/edit-work-time'>
            <Button variant='contained' size='medium' sx={{ mr: 1, mt: 5 }}>
              Edit
            </Button>
          </Link>
          <Link href='/projects'>
            <Button size='medium' sx={{ mt: 5 }} variant='outlined'>
              Back
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  )
}

export default ViewWorkTime
