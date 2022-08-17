// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import FileUploaderMultiple from './FileUploaderMultiple'
import Tooltip from '@mui/material/Tooltip'

// ** Styled Component - upload file
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// ** Date picker
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Auto complete data
import { task, taskType, resource } from 'src/@fake-db/autocomplete'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const SubTaskDialogue = () => {
  // Selected Date
  const [basicPicker, setBasicPicker] = useState(new Date())

  // ** States
  const [show, setShow] = useState(false)
  const [languages, setLanguages] = useState([])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <>
      <Tooltip title='Edit' arrow>
        <IconButton onClick={() => setShow(true)}>
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 12 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Edit subtask
            </Typography>
            <Typography variant='body2'>Edit subtask by filling the given form.</Typography>
          </Box>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  options={task}
                  id='autocomplete-outlined'
                  defaultValue={task[0]}
                  getOptionLabel={option => option.taskName}
                  readOnly
                  renderInput={params => <TextField {...params} label='Parent task' />}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label='Task Name' placeholder='Task name' defaultValue='User Authentication' />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  options={taskType}
                  id='autocomplete-outlined'
                  getOptionLabel={option => option.taskTypeName}
                  defaultValue={taskType[1]}
                  renderInput={params => <TextField {...params} label='Task type' />}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  rows={4}
                  multiline
                  label='Description'
                  id='textarea-outlined-static'
                  defaultValue='This is the description for the subtask.'
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  options={resource}
                  id='autocomplete-outlined'
                  getOptionLabel={option => option.userName}
                  defaultValue={resource[1]}
                  renderInput={params => <TextField {...params} label='Assign' />}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} className='full-width'>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  px={{
                    width: '100%'
                  }}
                >
                  <DatePicker
                    label='Start Date'
                    value={basicPicker}
                    onChange={newValue => setBasicPicker(newValue)}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className='full-width'>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  px={{
                    width: '100%'
                  }}
                >
                  <DatePicker
                    label='End Date'
                    value={basicPicker}
                    onChange={newValue => setBasicPicker(newValue)}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField fullWidth label='Estimation (Hours)' placeholder='Estimation (Hours)' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DropzoneWrapper>
                  <FileUploaderMultiple />
                </DropzoneWrapper>
              </Grid>
            </Grid>

            <Grid item sm={12} sx={{ mt: 8, mb: 5 }}>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Save
              </Button>
              <Button size='large' color='secondary' variant='outlined' className='cancel-button'>
                Cancel
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SubTaskDialogue
