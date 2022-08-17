// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import AlarmOffIcon from '@mui/icons-material/AlarmOff'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const ProjectData = [
  {
    color: 'success',
    stats: '2,450',
    icon: <FolderCopyOutlinedIcon />,
    title: 'Total projects'
  },
  {
    color: 'info',
    stats: '245',
    icon: <LibraryAddCheckOutlinedIcon />,
    title: 'Completed'
  },
  {
    stats: '20',
    color: 'warning',
    title: 'In progress',
    icon: <RotateLeftIcon />
  },
  {
    icon: <AlarmOffIcon />,
    stats: '0',
    color: 'error',
    title: 'Out of schedule'
  }
]

const renderStats = () => {
  return ProjectData.map((project, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={project.color} sx={{ mr: 4 }} className='overviewIcon'>
          {project.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {project.stats}
          </Typography>
          <Typography variant='caption'>{project.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const ProjectOverview = () => {
  return (
    <Card>
      <CardHeader
        sx={{
          pb: 4.25
        }}
        title='Project Overview'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectOverview
