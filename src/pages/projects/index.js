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
import ProjectListing from './project-listing'
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'

import {
  getAPI,
  getAPIWithAccessToken,
  updateAPIWithAccessToken,
  postAPIWithAccessToken
} from 'src/services/CommonServices'

import authConfig from 'src/configs/auth'

const ProjectList = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const { axiosReq, error, response } = useAxios()
  const axiosPrivate = useAxiosPrivate()
  // const hitProject = async id => {
  //   console.log(id)
  //   let res = await axiosReq({
  //     axiosInstance: axiosPrivate,
  //     method: 'GET',
  //     endpoint: '/project',
  //     requestConfig: {
  //       params: {
  //         id
  //       }
  //     }
  //   })
  //   console.log(res)
  // }
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Project List</Typography>}
            subtitle={
              <Typography
                variant='body2'
                sx={{
                  mt: 1,
                  mb: 2
                }}
              >
                Welcome to project page, here you can add, view, and edit the project.
              </Typography>
            }
          />
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
              <TextField size='small' sx={{ mr: 4, mb: 2.5 }} placeholder='Search project' />

              <Link href='/projects/add-project'>
                <Button sx={{ mb: 2.5 }} variant='contained'>
                  Add project
                </Button>
              </Link>
            </Box>
            <ProjectListing />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectList
