import React, { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PencilOutline from 'mdi-material-ui/PencilOutline'

import IconButton from '@mui/material/IconButton'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import moment from 'moment'
// ** Config
import authConfig from 'src/configs/auth'
// api services
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'
import { isEmpty } from 'lodash'

import toast from 'react-hot-toast'

// ** Status color
// active: 'error',
// progress: 'warning',
// completed: 'success'

const transformData = data => {
  return data.map((item, idx) => {
    return {
      id: idx + 1,
      projectId: item.id,
      title: item.title,
      start_date: item.start_date,
      end_date: item.end_date,
      status: item.projectStatus.title,
      statusColor: getStatusColor(item.projectStatus.title),
      viewUrl: '/projects/view-project',
      editUrl: '/projects/edit-project',
      taskUrl: '/projects/tasks',
      resUrl: '/projects/resources',
      calendarUrl: '/apps/calendar'
    }
  })
}
const getStatusColor = title => {
  let color = ''
  switch (title) {
    case 'Completed':
      color = 'success'
      break
    case 'In Progress':
      color = 'error'
      break
    default:
      color = 'warning'
      break
  }
  return color
}
const TableListing = () => {
  const axiosPrivate = useAxiosPrivate()
  const { axiosReq, response: tableData } = useAxios()
  const { axiosReq: deleteProjectReq, error: deleteProjectReqError, response: deleteProjectRes } = useAxios()
  const [pageSize, setPageSize] = useState(10)
  const [deleteProjectId, setDeleteProjectId] = useState()
  const [rows, setRows] = useState([])

  // ** Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = id => {
    setDeleteProjectId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const getAllProject = async () => {
    await axiosReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allProject',
      requestConfig: {}
    })
  }
  const deleteProject = async () => {
    await deleteProjectReq({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      endpoint: '/project',
      requestConfig: {
        params: {
          id: deleteProjectId
        }
      }
    })
  }

  // ** Table data

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
      field: 'projectName',
      headerName: 'Project Name',
      renderCell: ({ row }) => <Typography variant='body2'>{row.title}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'start_date',
      headerName: 'Started On',
      renderCell: ({ row }) => <Typography variant='body2'>{moment(row.start_date).format('MM-DD-YYYY')}</Typography>
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
      field: 'end_date',
      headerName: 'Ended On',
      renderCell: ({ row }) => <Typography variant='body2'>{moment(row.end_date).format('MM-DD-YYYY')}</Typography>
    },
    {
      flex: 0.17,
      minWidth: 270,
      field: 'action',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href={{
                pathname: 'projects/view-project',
                query: { id: row.projectId } // the data
              }}
            >
              <Tooltip title='View' arrow>
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link
              href={{
                pathname: '/projects/edit-project',
                query: { id: row.projectId } // the data
              }}
            >
              <Tooltip title='Edit' arrow>
                <IconButton>
                  <PencilOutline />
                </IconButton>
              </Tooltip>
            </Link>
            <Link href={`${'/apps/calendar'}`}>
              <Tooltip title='Calendar' arrow>
                <IconButton>
                  <CalendarTodayOutlinedIcon
                    sx={{
                      fontSize: '20px'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Link>

            <Link
              href={{
                pathname: '/projects/tasks',
                query: { projectName: row.title } // the data
              }}
            >
              <Tooltip title='Tasks' arrow>
                <IconButton>
                  <ArticleOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link href={`${'/projects/resources'}`}>
              <Tooltip title='Resources' arrow>
                <IconButton>
                  <PeopleAltOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title='Delete' arrow>
              <IconButton onClick={() => handleClickOpen(row.projectId)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]
  useEffect(() => {
    async function getData() {
      await getAllProject()
    }
    getData()
  }, [])
  useEffect(() => {
    if (!isEmpty(tableData)) {
      setRows(transformData(tableData.allProject))
    }
  }, [tableData])
  useEffect(() => {
    if (!isEmpty(deleteProjectRes)) {
      toast.success(deleteProjectRes.message)
      handleClose()
      getAllProject()
    }
  }, [deleteProjectRes])

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
        <DialogTitle sx={{ pb: 2 }}>{'Delete project?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to delete the project.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteProject}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableListing
