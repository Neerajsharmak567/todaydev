// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

// ** Styled Component - upload file
import FileDownloadIcon from '@mui/icons-material/FileDownload'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const LabelStyle = {
  fontWeight: '600',
  mb: 1,
  fontSize: '15px'
}

const ViewSubTaskDialogue = () => {
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
      <Tooltip title='View' arrow>
        <IconButton onClick={() => setShow(true)}>
          <VisibilityOutlinedIcon />
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
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 12 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 4 }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                  Nested subtask:
                  <Typography variant='span' sx={{ color: 'text.primary' }}>
                    {' '}
                    Prototype
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant='body1' component='' sx={{ ...LabelStyle }}>
                  Parent task:
                </Typography>
                <Typography variant='body2' component='' sx={{}}>
                  User Authentication
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
                  Sub task:
                </Typography>
                <Typography variant='body2' component='' sx={{}}>
                  User Authentication
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
                  asperiores, esse ex quia, nostrum reiciendis dolor sit dolores. Explicabo laborum vel, temporibus
                  facere doloremque ratione repellendus tenetur.
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
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewSubTaskDialogue
