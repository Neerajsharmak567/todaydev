// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from './FullCalendar'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** CalendarColors

const AppCalendar = () => {
  // ** States

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <>
      <CalendarWrapper
        className='app-calendar'
        sx={{
          ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
        }}
      >
        <Box
          sx={{
            pb: 5,
            px: 5,
            pt: 2.25,
            flexGrow: 1,
            borderRadius: 1,
            boxShadow: 'none',
            backgroundColor: 'background.paper',
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          <Calendar />
        </Box>
      </CalendarWrapper>
    </>
  )
}

export default AppCalendar
