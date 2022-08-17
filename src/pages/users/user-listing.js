import React, { useState } from 'react'

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
// completed: 'success',
// inactive: 'error'

const TableListing = () => {
  const [pageSize, setPageSize] = useState(10)

  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // ** Table data

  const rows = [
    {
      id: 1,
      name: 'Jackie B. Peralez',
      email: 'abc@xyz.com',
      phone: '95478629245',
      role: 'Admin',
      created: '03/25/2022',
      status: 'active',
      statusColor: 'success',
      editUrl: '/users/edit-user'
    },
    {
      id: 2,
      name: 'james Hook',
      email: 'abc@xyz.com',
      phone: '95478629245',
      role: 'Admin',
      created: '03/25/2022',
      status: 'active',
      statusColor: 'success',
      editUrl: '/users/edit-user'
    },
    {
      id: 3,
      name: 'Adam Smith',
      email: 'abc@xyz.com',
      phone: '95478629245',
      created: '03/25/2022',
      role: 'Employee',
      status: 'active',
      statusColor: 'success',
      editUrl: '/users/edit-user'
    },
    {
      id: 4,
      name: 'Alex Cooper',
      email: 'abc@xyz.com',
      phone: '74478621221',
      created: '03/25/2022',
      role: 'Client',
      status: 'inactive',
      statusColor: 'error',
      editUrl: '/users/edit-user'
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
      renderCell: ({ row }) => <Link href={'mailto:' + `${row.email}`}>{row.email}</Link>
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'phone',
      headerName: 'Mobile',
      renderCell: ({ row }) => <Typography variant='body2'>{row.phone}</Typography>
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
      flex: 0.12,
      minWidth: 100,
      field: 'action',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    </>
  )
}

export default TableListing
