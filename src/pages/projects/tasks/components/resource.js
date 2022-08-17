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

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const ViewSubTaskDialogue = () => {
  // ** States
  const [show, setShow] = useState(false)

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  const LabelStyle = {
    fontWeight: 600,
    mb: 1,
    fontSize: '15px'
  }

  return (
    <>
      <Tooltip title='Resource' arrow>
        <IconButton onClick={() => setShow(true)}>
          <PersonOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 12, px: { xs: 8, sm: 12 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' sx={{ lineHeight: '2rem', fontWeight: 600, color: 'text.secondary' }}>
                  Resource:
                  <Typography
                    variant='span'
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    {' '}
                    John Doe
                  </Typography>
                </Typography>
                <Typography sx={{ lineHeight: '2rem', fontWeight: 600, color: 'text.secondary' }}>
                  Project:
                  <Typography
                    variant='span'
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    {' '}
                    User Authentication
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </Box>
          <Grid container>
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
                  Task assigned:
                </Typography>
                <Typography variant='body2' component='' sx={{}}>
                  User Authentication
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
                  asperiores, esse ex quia, nostrum reiciendis dolor sit dolores.
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
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewSubTaskDialogue
