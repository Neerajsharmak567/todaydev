// ** React import
import React, { useState, useEffect } from 'react'

// ** Link import
import Link from 'next/link'

// ** MUI import
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

// ** Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Popup import
import SubTask from './subtask-dialog'
import NestedSubTask from './nested-subtask-dialog'
import ViewSubTask from './view-subtask-dialog'
import EditSubTask from './edit-subtask-dialog'
import NestedSubTaskView from './view-nested-subtask-dialog'
import NestedEditSubTask from './nested-edit-subtask-dialog'
import Resource from './resource'

// ** Icons Imports
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import moment from 'moment'
// Axios hooks
import useAxios from 'src/hooks/axios/useAxios'
import useAxiosPrivate from 'src/hooks/axios/useAxiosPrivate'
// Router
import { useRouter } from 'next/router'
// ** Custom components
import CustomChip from 'src/@core/components/mui/chip'
// import {
//   getAPI,
//   getAPIWithAccessToken,
//   updateAPIWithAccessToken,
//   postAPIWithAccessToken
// } from 'src/services/CommonServices'
// // ** Config
// import authConfig from 'src/configs/auth'
// ** Rows Data
// const rows = [
//   {
//     id: 1,
//     name: 'User Authentication',
//     startedOn: '05/26/2022',
//     status: 'completed',
//     statusColor: 'success',
//     endedOn: '05/26/2022',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: '',
//     sub_subtask: ''
//   },
//   {
//     id: 2,
//     name: 'Design Mockup',
//     startedOn: '05/26/2022',
//     status: 'completed',
//     statusColor: 'success',
//     endedOn: '05/26/2022',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: {
//       id: 2.1,
//       name: 'Design Wireframe',
//       startedOn: '05/26/2022',
//       status: 'Completed',
//       statusColor: 'success',
//       endedOn: '05/26/2022'
//     },
//     sub_subtask: {
//       id: 2.2,
//       name: 'Prototype',
//       startedOn: '5/26/2022',
//       status: 'Completed',
//       statusColor: 'success',
//       endedOn: '5/26/2022'
//     }
//   },
//   {
//     id: 3,
//     name: 'Add to Cart Feature	',
//     startedOn: '05/26/2022',
//     status: 'in progress',
//     statusColor: 'warning',
//     endedOn: 'N/A',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: '',
//     sub_subtask: ''
//   },
//   {
//     id: 4,
//     name: 'Featured Products	',
//     startedOn: '05/26/2022',
//     status: 'in progress',
//     statusColor: 'warning',
//     endedOn: 'N/A',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: '',
//     sub_subtask: ''
//   },
//   {
//     id: 5,
//     name: 'Featured Products	',
//     startedOn: '05/26/2022',
//     status: 'in progress',
//     statusColor: 'warning',
//     endedOn: 'N/A',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: '',
//     sub_subtask: ''
//   },
//   {
//     id: 6,
//     name: 'Design Mockup',
//     startedOn: '05/26/2022',
//     status: 'completed',
//     statusColor: 'success',
//     endedOn: '05/26/2022',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: ''
//   },
//   {
//     id: 7,
//     name: 'Design Mockup',
//     startedOn: '05/26/2022',
//     status: 'completed',
//     statusColor: 'success',
//     endedOn: '05/26/2022',
//     action: {
//       viewUrl: '/projects/tasks/view-task',
//       editUrl: '/projects/tasks/edit-task',
//       deleteUrl: '/project/'
//     },
//     subtask: {
//       id: 7.1,
//       name: 'Design Wireframe',
//       startedOn: '05/26/2022',
//       status: 'Completed',
//       statusColor: 'success',
//       endedOn: '05/26/2022'
//     },
//     sub_subtask: {
//       id: 7.2,
//       name: 'Prototype',
//       startedOn: '5/26/2022',
//       status: 'Completed',
//       statusColor: 'success',
//       endedOn: '5/26/2022'
//     }
//   }
// ]

// ** Table Body

const Row = props => {
  const { row } = props

  // ** State
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(false)

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <TableRow>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>
          {row.start_date
            ? new Date(row.start_date).getDate() +
              '/' +
              (new Date(row.start_date).getMonth() + 1) +
              '/' +
              new Date(row.start_date).getFullYear()
            : 'N/A'}
        </TableCell>
        <TableCell>
          <CustomChip
            skin='light'
            size='small'
            sx={{ textTransform: 'capitalize' }}
            label={row.taskStatus.title || 'N/A'}
            color={row.statusColor}
          />
        </TableCell>
        <TableCell>
          {row.end_date
            ? new Date(row.end_date).getDate() +
              '/' +
              (new Date(row.end_date).getMonth() + 1) +
              '/' +
              new Date(row.end_date).getFullYear()
            : 'N/A'}
          {/* {moment(row.end_date).format('mm/dd/yyyy')} */}
        </TableCell>
        <TableCell>
          {/* <Link href={`${row.action.viewUrl}`}> */}
          <Link href={`${'/projects/tasks/view-task'}`}>
            <Tooltip title='View' arrow>
              <IconButton>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Link>
          {/* <Link href={`${row.action.editUrl}`}> */}
          <Link href={`${'/projects/tasks/edit-task'}`}>
            <Tooltip title='Edit' arrow>
              <IconButton>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Resource />
          <Tooltip title='Delete' arrow>
            <IconButton onClick={() => setOpenDialog(true)}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <SubTask />

          {row.subtask ? (
            <Tooltip title='Expand' arrow>
              <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Tooltip>
          ) : null}
        </TableCell>
      </TableRow>

      <TableRow>
        {row.subtask ? (
          <TableCell style={{ border: 'none' }} colSpan={6} className='acc-container'>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{}}>
                <Table size='small' className='indent-body '>
                  <TableBody>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell>{row.subtask.id}</TableCell>
                      <TableCell>{row.subtask.name}</TableCell>
                      <TableCell>{row.subtask.startedOn}</TableCell>
                      <TableCell>
                        <CustomChip
                          skin='light'
                          size='small'
                          sx={{ textTransform: 'capitalize' }}
                          label={row.subtask.status}
                          color={row.subtask.statusColor}
                        />
                      </TableCell>
                      <TableCell>{row.subtask.endedOn}</TableCell>
                      <TableCell>
                        <ViewSubTask />
                        <EditSubTask />
                        <Resource />
                        <Tooltip title='Delete' arrow>
                          <IconButton onClick={() => setOpenDialog(true)}>
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <NestedSubTask />

                        {row.sub_subtask ? (
                          <Tooltip title='Expand' arrow>
                            <IconButton aria-label='expand row' size='small' onClick={() => setOpenSub(!openSub)}>
                              {openSub ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Collapse in={openSub} timeout='auto' unmountOnExit>
                  {row.sub_subtask ? (
                    <Table size='small' className='indent-body indent'>
                      <TableBody>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                          <TableCell>{row.sub_subtask.id}</TableCell>
                          <TableCell>{row.sub_subtask.name}</TableCell>
                          <TableCell>{row.sub_subtask.startedOn}</TableCell>
                          <TableCell>
                            <CustomChip
                              skin='light'
                              size='small'
                              sx={{ textTransform: 'capitalize' }}
                              label={row.sub_subtask.status}
                              color={row.sub_subtask.statusColor}
                            />
                          </TableCell>
                          <TableCell>{row.sub_subtask.endedOn}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: 'flex'
                              }}
                            >
                              <NestedSubTaskView />
                              <NestedEditSubTask />
                              <Resource />
                              <Tooltip title='Delete' arrow>
                                <IconButton onClick={() => setOpenDialog(true)}>
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : null}
                </Collapse>
              </Box>
            </Collapse>
          </TableCell>
        ) : null}
      </TableRow>

      <Dialog open={openDialog} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ pb: 2 }}>{'Remove task?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to remove the task.
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

const CustomTable = () => {
  const { axiosReq: taskAxiosReq, error, response: taskTableData, loading } = useAxios()
  const axiosPrivate = useAxiosPrivate()
  // ** Pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const router = useRouter()
  const projectId = router.query.id
  const getAllProjectTask = async id => {
    await taskAxiosReq({
      axiosInstance: axiosPrivate,
      method: 'GET',
      endpoint: '/allProjectTask',
      requestConfig: {
        params: {
          id: id
        }
      }
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (projectId) {
      async function getData() {
        await getAllProjectTask(projectId)
      }
      getData()
    }
  }, [projectId])

  return (
    <>
      <TableContainer className='accordion-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 100 }}>Id</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Started on</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Status</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Ended on</TableCell>
              <TableCell sx={{ width: 270, minWidth: 270 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (taskTableData &&
                taskTableData.allTask &&
                taskTableData.allTask.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              taskTableData &&
                taskTableData.allTask &&
                taskTableData.allTask.map(row => <Row key={row.id} row={row} />))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={
          taskTableData && taskTableData.allTask && taskTableData.allTask.length !== 0
            ? taskTableData.allTask.length
            : 100
        }
        // count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default CustomTable
