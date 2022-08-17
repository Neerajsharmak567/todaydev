import React from 'react'

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
import Divider from '@mui/material/Divider'

const LabelStyle = {
  fontWeight: '600',
  mb: 1,
  fontSize: '15px'
}

const ViewResource = () => {
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
          <Link className='custom-link' href='/projects/resources'>
            Resources
          </Link>
          <Typography color='text.primary' variant='body2'>
            View resource
          </Typography>
        </Breadcrumbs>

        <CardContent>
          <Box className='card-header'>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' sx={{ mb: 1, color: 'text.secondary' }}>
                  Resource:
                  <Typography
                    variant='span'
                    sx={{
                      color: 'text.primary'
                    }}
                  >
                    {' '}
                    Corrie Amin
                  </Typography>
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    mb: 3,
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
                Role:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                Developer
              </Typography>
            </Grid>{' '}
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant='body1'
                component=''
                sx={{
                  ...LabelStyle
                }}
              >
                Role description:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam rem porro ipsa dolores atque, rerum
                distinctio numquam quae ducimus molestias?
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
                Work time assigned:
              </Typography>
              <Typography variant='body2' component='' sx={{}}>
                Project-1 Calendar
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
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
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant='body1'
                sx={{
                  ...LabelStyle
                }}
              >
                End Date:
              </Typography>
              <Typography variant='body2' sx={{}}>
                N/A
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Link href='/projects/resources/edit-resource'>
            <Button variant='contained' size='medium' sx={{ mr: 1, mt: 5 }}>
              Edit
            </Button>
          </Link>
          <Link href='/projects/resources'>
            <Button size='medium' sx={{ mt: 5 }} variant='outlined'>
              Back
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  )
}

export default ViewResource
