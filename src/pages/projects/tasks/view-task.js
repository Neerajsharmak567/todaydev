import React, { useEffect, useState } from 'react'

import Link from 'next/link'

// ** MUI Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { deepOrange, deepPurple } from '@mui/material/colors'

import Editor from './components/editor'

import AttachFileIcon from '@mui/icons-material/AttachFile'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    renderCell: ({ row }) => <Typography variant='body2'>{row.name}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'calendar',
    headerName: 'Calendar',
    minWidth: 300,
    renderCell: ({ row }) => <Typography variant='body2'>{row.calendar}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'role',
    headerName: 'Role',
    minWidth: 250,
    renderCell: ({ row }) => <Typography variant='body2'>{row.role}</Typography>
  }
]

const rows = [
  {
    id: 1,
    name: 'Jackie Peralez',
    calendar: 'None',
    role: 'Client'
  },
  {
    id: 2,
    name: 'Eric Suggs',
    calendar: 'Standard Calendar',
    role: 'Project Manager'
  },
  {
    id: 3,
    name: 'Michele Santiago',
    calendar: 'Project Manager',
    role: 'Developer'
  }
]

const LabelStyle = {
  fontWeight: '600',
  mb: 1,
  fontSize: '15px'
}

const ViewTask = () => {
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
          <Link className='custom-link' href='/projects/tasks'>
            Task
          </Link>
          <Typography color='text.primary' variant='body2'>
            View task
          </Typography>
        </Breadcrumbs>

        <CardContent>
          <Box className='card-header'>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' component='h1' sx={{ mb: 1, color: 'text.secondary' }}>
                  Task:
                  <Typography variant='h6' component='span' sx={{ color: 'text.primary' }}>
                    {' '}
                    User Authentication
                  </Typography>
                </Typography>

                <Typography
                  variant='body1'
                  sx={{
                    mb: 5
                  }}
                >
                  <Typography variant='span' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Project:{' '}
                  </Typography>{' '}
                  <Typography variant='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    ABC Technologies
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant='body1'
                component=''
                sx={{
                  ...LabelStyle
                }}
              >
                Parent task:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                N/A
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant='body1'
                component=''
                sx={{
                  ...LabelStyle
                }}
              >
                Assigned to:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                John Doe
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant='body1'
                component=''
                sx={{
                  ...LabelStyle
                }}
              >
                Task type:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                Bug
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
              <Typography variant='body2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur recusandae repellendus
                asperiores, esse ex quia, nostrum reiciendis dolor sit dolores. Explicabo laborum vel, temporibus facere
                doloremque ratione repellendus tenetur.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Start Date:
              </Typography>
              <Typography variant='body2'>5/26/2022</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                End Date:
              </Typography>
              <Typography variant='body2' sx={{}}>
                5/26/2022
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Estimated Hour:
              </Typography>
              <Typography variant='body2' sx={{}}>
                8 hr
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Attachments{' '}
              </Typography>
              <Typography variant='body2' sx={{ mb: 1, mt: 2, display: 'flex' }} className='attachment-link'>
                <a href='' target='_blank'>
                  <FileDownloadIcon fontSize='small' sx={{ mr: 1, color: 'secondary.main' }} /> Attachment_file_1
                </a>
                <a href='' target='_blank'>
                  <FileDownloadIcon fontSize='small' sx={{ mr: 1, color: 'secondary.main' }} /> Attachment_file_2
                </a>
                <a href=''>
                  <AttachFileIcon fontSize='small' sx={{ mr: 1, color: 'secondary.main' }} /> Add attachments
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                Comment:
              </Typography>
              <Editor />
              <Box sx={{ textAlign: 'right' }}>
                <Button variant='contained' color='secondary' size='small' sx={{ mr: 1, mt: 3 }}>
                  Save
                </Button>
                <Button size='small' color='secondary' sx={{ mt: 3 }} variant='outlined'>
                  Cancel
                </Button>
              </Box>

              <Box className='comment-wrapper' sx={{ display: 'flex', mt: 4 }}>
                <Avatar sx={{ bgcolor: deepOrange[500], mr: 2, color: 'common.white' }}>AS</Avatar>
                <Box sx={{ width: '100%', borderRadius: '10px', p: 4, bgcolor: 'customColors.tableHeaderBg' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    Adam Smith
                  </Typography>
                  <Typography variant='body2'>This is a comment...</Typography>
                </Box>
              </Box>
              <Box className='comment-wrapper' sx={{ display: 'flex', mt: 4 }}>
                <Avatar sx={{ bgcolor: deepPurple[500], mr: 2, color: 'common.white' }}>JD</Avatar>
                <Box sx={{ width: '100%', borderRadius: '10px', p: 4, bgcolor: 'customColors.tableHeaderBg' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    John Doe
                  </Typography>
                  <Typography variant='body2'>This is my comment...</Typography>
                  <Box
                    sx={{
                      textAlign: 'right'
                    }}
                  >
                    <Button color='secondary' size='small' sx={{ mr: 1, mt: 3 }}>
                      Edit
                    </Button>
                    <Button size='small' color='secondary' sx={{ mt: 3 }}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Link href='/projects/tasks/edit-task'>
            <Button variant='contained' size='medium' sx={{ mr: 1, mt: 3 }}>
              Edit
            </Button>
          </Link>
          <Link href='/projects/tasks'>
            <Button size='medium' sx={{ mt: 3 }} variant='outlined'>
              Back
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  )
}

export default ViewTask
