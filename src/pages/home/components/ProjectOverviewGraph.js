import React, { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const CrmMonthlyBudget = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      offsetY: -8,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        left: 10,
        top: -24,
        right: 12
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.7,
        opacityFrom: 0.5,
        shadeIntensity: 1,
        stops: [0, 90, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.6,
              color: theme.palette.success.main
            },
            {
              offset: 100,
              opacity: 0.1,
              color: theme.palette.background.paper
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.success.main
      }
    },
    xaxis: {
      type: 'numeric',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    markers: {
      size: 1,
      offsetY: 1,
      offsetX: -5,
      strokeWidth: 4,
      strokeOpacity: 1,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 7,
          seriesIndex: 0,
          dataPointIndex: 7,
          strokeColor: theme.palette.success.main,
          fillColor: theme.palette.background.paper
        }
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title='Project Report'
        action={
          <>
            <IconButton
              size='small'
              aria-label='settings'
              onClick={handleClick}
              aria-controls={open ? 'graph-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <DotsVertical />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id='graph-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Typography variant='body2'>Monthly report</Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Typography variant='body2'> Weekly report</Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Typography variant='body2'> Yearly report</Typography>
              </MenuItem>
            </Menu>
          </>
        }
      />

      <CardContent>
        <ReactApexcharts
          type='area'
          height={300}
          options={options}
          series={[{ name: 'Traffic Rate', data: [0, 85, 25, 125, 90, 250, 200, 350] }]}
        />
      </CardContent>
      <CardActions>
        <Typography
          variant='body2'
          sx={{
            mt: { sm: 3, md: 12 },
            color: 'text.primary',
            fontWeight: 500
          }}
        >
          This month you completed{' '}
          <Typography
            variant='span'
            sx={{
              color: 'primary.main'
            }}
          >
            20 more
          </Typography>{' '}
          project compared to previous month.
        </Typography>
      </CardActions>
    </Card>
  )
}

export default CrmMonthlyBudget
