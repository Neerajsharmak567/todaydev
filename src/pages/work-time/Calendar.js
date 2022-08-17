// ** React Import
import React, { useState } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Third party Import
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// ** Calendar styling
const calendarStyle = {
  backgroundColor: 'customColors.tableHeaderBg',
  '& .react-calendar__tile': {
    color: 'text.secondary',
    borderRadius: '2px'
  },
  '& .react-calendar__navigation__label__labelText': {
    color: 'text.primary'
  },
  '& button.react-calendar__tile.react-calendar__tile--now.react-calendar__tile--active': {
    backgroundColor: 'primary.light',
    color: 'common.white'
  },
  '& button.react-calendar__tile.react-calendar__tile--now': {
    backgroundColor: 'primary.light',
    color: 'common.white'
  },
  '& button.react-calendar__tile.react-calendar__tile--active:hover': {
    color: 'text.secondary'
  },

  '& button.react-calendar__tile.react-calendar__month-view__days__day:hover': {
    backgroundColor: 'customColors.calendarSelect',
    color: ''
  },
  '& button.react-calendar__tile.react-calendar__tile--active': {
    backgroundColor: 'secondary.light',
    color: 'common.white'
  },
  '& .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus': {
    backgroundColor: 'customColors.calendarSelect'
  },
  '& .react-calendar__month-view__days__day--weekend': {
    color: 'customColors.calendarWeekend'
  },
  '& .react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth': {
    color: 'text.disabled'
  },
  '& .react-calendar__navigation__arrow': {
    backgroundColor: 'customColors.navArCalendar',
    color: 'text.primary'
  }
}

const WorkTimeCalendar = () => {
  // ** State
  const [value, onChange] = useState(new Date())

  return (
    <Box className='calendar-wrapper'>
      <Box className='calendar-container' sx={{ ...calendarStyle }}>
        <Calendar onChange={onChange} value={value} />
      </Box>
      <Box className='calendar-desc'>
        <Box className='details'>
          <Typography variant='body2'>Weekly Off</Typography>
          <Box
            className='color-des weekend'
            sx={{
              backgroundColor: 'customColors.calendarWeekend'
            }}
          ></Box>
        </Box>
        <Box className='details'>
          <Typography variant='body2'>Working Days</Typography>
          <Box
            className='color-des working'
            sx={{
              backgroundColor: 'text.secondary'
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkTimeCalendar
