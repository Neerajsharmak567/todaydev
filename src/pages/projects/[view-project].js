import React, { useEffect, useState } from 'react'

import Link from 'next/link'

// ** MUI Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { DataGrid } from '@mui/x-data-grid'
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'

// ** Icons Imports

const LabelStyle = {
  fontWeight: '600',
  mb: 1,
  fontSize: '15px'
}

// api services

import { isEmpty, isNil } from 'lodash'
import { useRouter } from 'next/router'

const transformData = data => {
  return data.map((val, idx) => {
    return {
      id: idx + 1,
      name: val.firstName + ' ' + val.lastName,
      calendarTitle: val.calendar[0].title
    }
  })
}

const ViewProject = () => {
  // ** state pagination
  const router = useRouter()
  const id = parseInt(router.query.id)
  const [pageSize, setPageSize] = useState(10)
  const [resources, setResources] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const { axiosReq, response: project } = useAxios()
  const [projectById, setProjectById] = useState([])
  // console.log('Query--->', parseInt(router.query.id))

  // get project Status api
  const getProjectById = async id => {
    await axiosReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/project',
      requestConfig: {
        params: { id }
      }
    })
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 150,
      field: 'id',
      headerName: 'Resource ID',
      renderCell: ({ row }) => <Typography variant='body2'>{row.id}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'title',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography variant='body2'>{row.name}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'workTime',
      headerName: 'Work Time',
      renderCell: ({ row }) => <Typography variant='body2'>{row.calendarTitle}</Typography>
    }
    // {
    //   flex: 0.25,
    //   field: 'role',
    //   headerName: 'Start Day',
    //   minWidth: 180,

    //   renderCell: ({ row }) => <Typography variant='body2'>{row.startDay}</Typography>
    // }
  ]
  useEffect(() => {
    if (!isNaN(id)) getProjectById(id)
  }, [id])
  useEffect(() => {
    if (!isEmpty(project)) {
      setProjectById(project.project)
      setResources(transformData(project.project.projectContact))
    }
  }, [project])

  return (
    <>
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
            View project
          </Typography>
        </Breadcrumbs>

        {
          <CardContent>
            <Box className='card-header'>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Typography variant='h6' component='h1' sx={{ mb: 3, color: 'text.secondary' }}>
                    Project:
                    <Typography variant='h6' component='span' sx={{ color: 'text.primary' }}>
                      {' '}
                      {projectById.title}
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
                  Name:
                </Typography>
                <Typography variant='body2' sx={{}}>
                  {projectById.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body1'
                  sx={{
                    ...LabelStyle
                  }}
                >
                  Description:
                </Typography>
                <Typography variant='body2'>{projectById.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant='body1'
                  sx={{
                    ...LabelStyle
                  }}
                >
                  Start Date:
                </Typography>
                <Typography variant='body2'>
                  {new Date(projectById.start_date).getDate() +
                    '/' +
                    (new Date(projectById.start_date).getMonth() + 1) +
                    '/' +
                    new Date(projectById.start_date).getFullYear()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant='body1'
                  sx={{
                    ...LabelStyle
                  }}
                >
                  End Date:
                </Typography>
                <Typography variant='body2' sx={{}}>
                  {new Date(projectById.end_date).getDate() +
                    '/' +
                    (new Date(projectById.end_date).getMonth() + 1) +
                    '/' +
                    new Date(projectById.end_date).getFullYear()}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography
                  variant='body1'
                  sx={{
                    ...LabelStyle
                  }}
                >
                  Resources:
                </Typography>

                <DataGrid
                  autoHeight
                  rows={resources}
                  columns={columns}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                  sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                  hideFooter
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body1'
                  sx={{
                    ...LabelStyle
                  }}
                >
                  Estimation Display Unit:
                </Typography>
                <Typography variant='body2' sx={{}}>
                  {projectById.unit?.title}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          // }))
        }

        <CardActions>
          <Link href='/projects/edit-project'>
            <Button sx={{ mt: 5 }} variant='contained' size='medium'>
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

export default ViewProject
