// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Custom Components Imports
import ResourcesListing from './resources-listing'

const Resources = () => {
  // ** State
  const [value, setValue] = useState('')

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className='custom-link' href='/projects'>
              Projects
            </Link>
            <Typography color='text.primary' variant='body2'>
              Resources
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h5'>Resources list</Typography>
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
                ABC Technology
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
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
              <TextField size='small' value={value} sx={{ mr: 4, mb: 2.5 }} placeholder='Search resource' />
              <Link href='/projects/resources/add-resource'>
                <Button sx={{ mb: 2.5 }} variant='contained'>
                  Add resource
                </Button>
              </Link>
            </Box>
            <ResourcesListing />
          </Card>
        </Grid>

        <Grid item xs={12} md={12}></Grid>
      </Grid>
    </>
  )
}

export default Resources
