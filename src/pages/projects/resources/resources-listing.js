import React, { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Status color
// active: 'success',
// progress: 'warning',
// completed: 'success'

// Axios hooks
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'
// Router
import { useRouter } from 'next/router'

const TableListing = () => {
  const { axiosReq: resourceAxiosReq, error, response: resourceTableData, loading } = useAxios()
  const axiosPrivate = useAxiosPrivate()

  const [pageSize, setPageSize] = useState(10)

  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const router = useRouter()
  const projectId = router.query.id

  const getAllProjectResource = async id => {
    await resourceAxiosReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/project',
      requestConfig: {
        params: {
          id: id
        }
      }
    })
  }
  // ** Table data

  const rows = [
    {
      id: 1,
      name: 'Jackie B. Peralez',
      email: 'abc@xyz.com',
      workTime: 'Standard Calendar',
      workTimeLink: '/work-time/view-work-time',
      role: 'QA',
      created: '03/25/2022',
      status: 'active',
      statusColor: 'success',
      viewUrl: '/projects/resources/view-resource',
      editUrl: '/projects/resources/edit-resource'
    },
    {
      id: 2,
      name: 'james Hook',
      email: 'abc@xyz.com',
      workTime: 'Standard Calendar',
      workTimeLink: '/work-time/view-work-time',
      role: 'Designer',
      created: '03/25/2022',
      status: 'active',
      statusColor: 'success',
      viewUrl: '/projects/resources/view-resource',
      editUrl: '/projects/resources/edit-resource'
    },
    {
      id: 3,
      name: 'Adam Smith',
      email: 'abc@xyz.com',
      workTime: 'Standard Calendar',
      workTimeLink: '/work-time/view-work-time',
      created: '03/25/2022',
      role: 'Manager',
      status: 'active',
      statusColor: 'success',
      viewUrl: '/projects/resources/view-resource',
      editUrl: '/projects/resources/edit-resource'
    },
    {
      id: 4,
      name: 'Alex Cooper',
      email: 'abc@xyz.com',
      workTime: 'Standard Calendar',
      workTimeLink: '/work-time/view-work-time',
      created: '03/25/2022',
      role: 'Developer',
      status: 'inactive',
      statusColor: 'error',
      viewUrl: '/projects/resources/view-resource',
      editUrl: '/projects/resources/edit-resource'
    }
  ]

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID',
      renderCell: ({ row }) => {
        return <Typography> {row.id}</Typography>
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography variant='body2'>{row.name}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }) => (
        <Typography variant='body2'>
          <Link href={'mailto:' + `${row.email}`}>{row.email}</Link>
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'workTime',
      headerName: 'Work Time',
      renderCell: ({ row }) => (
        <Typography variant='body2'>
          {row.workTimeLink == '' ? `${row.workTime}` : <Link href={`${row.workTimeLink}`}>{row.workTime}</Link>}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'role',
      headerName: 'role',
      renderCell: ({ row }) => <Typography variant='body2'>{row.role}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={row.statusColor}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
        />
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'created',
      headerName: 'Created On',
      renderCell: ({ row }) => <Typography variant='body2'>{row.created}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'action',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={`${row.viewUrl}`}>
              <Tooltip title='View' arrow>
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link href={`${row.editUrl}`}>
              <Tooltip title='Edit' arrow>
                <IconButton>
                  <PencilOutline />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title='Delete' arrow>
              <IconButton onClick={handleClickOpen}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  useEffect(() => {
    if (projectId) {
      async function getData() {
        await getAllProjectResource(projectId)
      }
      getData()
    }
  }, [projectId])

  console.log('resourceTableData->', resourceTableData)

  return (
    <>
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

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ pb: 2 }}>{'Remove resource?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to remove the resource.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableListing
