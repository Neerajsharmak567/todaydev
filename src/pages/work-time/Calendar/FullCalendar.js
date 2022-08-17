// ** React Import
import { useEffect, useRef } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

const Calendar = props => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
}

export default Calendar
