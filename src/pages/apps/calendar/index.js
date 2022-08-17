// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** CalendarColors
const calendarsColor = {
  'Adam Smith': 'error',
  'John Doe': 'primary',
  'Alex Cooper': 'warning'
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** Vars
  const leftSidebarWidth = 260
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (
    <Card>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            p: '1.6rem'
          }}
        >
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className='custom-link' href='/projects'>
              Projects
            </Link>
            <Typography color='text.primary' variant='body2'>
              Calendar
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <CalendarWrapper
        className='app-calendar'
        sx={{
          // boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
        }}
      >
        <SidebarLeft
          store={store}
          mdAbove={mdAbove}
          dispatch={dispatch}
          calendarsColor={calendarsColor}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          handleAllCalendars={handleAllCalendars}
          handleCalendarsUpdate={handleCalendarsUpdate}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
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
          <Calendar
            store={store}
            dispatch={dispatch}
            direction={direction}
            updateEvent={updateEvent}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            handleSelectEvent={handleSelectEvent}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </Box>
        <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          calendarApi={calendarApi}
          drawerWidth={addEventSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          addEventSidebarOpen={addEventSidebarOpen}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </CalendarWrapper>
    </Card>
  )
}

export default AppCalendar
