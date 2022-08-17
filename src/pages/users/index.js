// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import UserListing from './user-listing'

// ** Actions Imports
import { fetchData } from 'src/store/apps/permissions'

const UserList = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // ** Hooks
  const {
    control,
    setValue: setFormValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: '' } })
  const dispatch = useDispatch()
  const store = useSelector(state => state.permissions)
  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleEditPermission = name => {
    setFormValue('name', name)
    setEditDialogOpen(true)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>User List</Typography>}
            subtitle={
              <Typography
                variant='body2'
                sx={{
                  mt: 1,
                  mb: 2
                }}
              >
                Welcome to user page here you can view, edit user information and remove users.
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
              <TextField
                size='small'
                value={value}
                sx={{ mr: 4, mb: 2.5 }}
                placeholder='Search user'
                onChange={e => handleFilter(e.target.value)}
              />

              <Box>
                <FormControl size='small' sx={{ mb: 2, mr: 2 }}>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    size='small'
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='employee'>Employee</MenuItem>
                    <MenuItem value='employee'>Client</MenuItem>
                  </Select>
                </FormControl>
                <Link href='/users/add-user'>
                  <Button sx={{ mb: 2.5 }} variant='contained'>
                    Add user
                  </Button>
                </Link>
              </Box>
            </Box>

            <UserListing />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
            <DialogTitle sx={{ pb: 2 }}>{'Remove user?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                Are you sure you want to remove the user.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}

export default UserList
