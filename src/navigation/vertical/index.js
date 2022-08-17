// ** Icon imports

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import GridViewIcon from '@mui/icons-material/GridView'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: GridViewIcon,
      path: '/home'
    },
    {
      title: 'Projects',
      icon: FolderOpenOutlinedIcon,
      path: '/projects'
    },
    {
      title: 'Users',
      icon: PeopleAltOutlinedIcon,
      path: '/users'
    },
    {
      title: 'Work Time',
      icon: CalendarBlankOutline,
      path: '/work-time'
    }
  ]
}

export default navigation
