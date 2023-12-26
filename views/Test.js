import { useEffect, useState, useMemo } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { timelineEvents, getDate } from '../mocks/timelineEvents';

export const AppointmentTimeline = ({ navigation }) => {
    // One month ago
    const [startDate, setStartDate] = useState(
      startOfMonth(subMonths(new Date(), 1)),
    )
    // One month ahead
    const [endDate, setEndDate] = useState(endOfMonth(addMonths(new Date(), 1)))
    const appointments = timelineEvents;
    const [groupedAllDayEvents, setGroupedAllDayEvents] = useState([])
    const [groupedEvents, setGroupedEvents] = useState([])
    const [markedDates, setMarkedDates] = useState({})
    const [selectedDate, setSelectedDate] = useState(getDateFormatted(new Date()))
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderIconButton onPress={calendarIconOnPress} icon={calendarIcon} />
        ),
      })
    }, [calendarIcon, calendarIconOnPress, navigation])
  
    const calendarIconOnPress = useCallback(() => setIsDatePickerOpen(true), [])
    const calendarIcon = useMemo(
      () => require('../img/next.png'),
      [],
    )
  
    useEffect(() => {
      if (appointments) {
        const { groupedAllDayEvents: allDay, groupedEvents: grouped } =
          getGroupedEventsByDate(appointments)
        setGroupedAllDayEvents(allDay)
        setGroupedEvents(grouped)
        const marked = getMarkedDatesFromGroupedEvents(allDay, grouped)
        setMarkedDates(marked)
      }
    }, [appointments])
  
    const onPressAppointment = useCallback(
        appointment => {
          navigation.navigate('ViewAppointment', {
            appointmentId: appointment.data.id,
          })
        },
        [navigation],
    )
  
    const onPressToday = useCallback(() => {
      clearSelectedMarkedDate()
      const todayString = getDateFormatted(new Date())
      setSelectedDate(todayString)
    }, [clearSelectedMarkedDate])
  
    const onDateChanged = useCallback(
      date => {
        clearSelectedMarkedDate()
        setSelectedDate(date)
      },
      [clearSelectedMarkedDate],
    )
  
    const clearSelectedMarkedDate = useCallback(() => {
      const markedDatesCopy = cloneDeep(markedDates)
      if (markedDatesCopy[selectedDate]) {
        markedDatesCopy[selectedDate].selected = false
      }
      setMarkedDates(markedDatesCopy)
    }, [markedDates, selectedDate])
  
    const onSelectDate = useCallback(
      date => {
        const { dateString } = date
        const markedDatesCopy = cloneDeep(markedDates)
        if (markedDatesCopy[dateString]) {
          markedDatesCopy[dateString].selected = true
        } else {
          markedDatesCopy[dateString] = {
            selected: true,
          }
        }
        setMarkedDates(markedDatesCopy)
        setSelectedDate(dateString)
        setIsDatePickerOpen(false)
      },
      [markedDates],
    )
  
    const onCancelSelectDate = useCallback(() => {
      setIsDatePickerOpen(false)
    }, [])
  
    const renderArrow = useCallback(
      direction => (direction === 'left' ? <ChevronLeft /> : <ChevronRight />),
      [],
    )
  
    const renderTimelineEvent = useCallback(e => {
      return e.height <= 50 ? (
        <ExtraSmallEventCard title={e.title} />
      ) : e.height <= 100 ? (
        <SmallEventCard event={e} />
      ) : (
        <FullEventCard
          cardWidth={e.width}
          event={e}
          numberOfLines={e.isLessThan90Minutes ? 1 : 2}
        />
      )
    }, [])
  
    const renderTimeLineListItem = useCallback(
      props => {
        const todayString = getDateFormatted(new Date())
        const isToday = props.date[0] === todayString
        console.log('props', props)
        return (
          <View style={styles.timelineContainer}>
            {!isToday && <TodayButton onPress={onPressToday} />}
            {groupedAllDayEvents[props.date] && (
              <AllDayEventsContainer>
                {groupedAllDayEvents[props.date].map(event => (
                  <AllDayCard
                    onPress={() => onPressAppointment(event)}
                    key={event.id}
                    title={event.title}
                  />
                ))}
              </AllDayEventsContainer>
            )}
            <Timeline
              events={props.events}
              date={props.date[0]}
              onEventPress={onPressAppointment}
              timeStep={60}
              theme={styles.timelineTheme}
              format24h={false}
              renderEvent={renderTimelineEvent}
              scrollToFirst={true}
              {...props}
            />
          </View>
        )
      },
      [
        groupedAllDayEvents,
        onPressAppointment,
        onPressToday,
        renderTimelineEvent,
      ],
    )
  
    const onMonthChange = useCallback(date => {
      const localDate = new Date(date.dateString + 'T00:00:00')
      const oneMonthAgo = subMonths(localDate, 1)
      const oneMonthAhead = addMonths(localDate, 1)
      const updatedQueryStartDate = startOfMonth(oneMonthAgo)
      const updatedQueryEndDate = endOfMonth(oneMonthAhead)
      setStartDate(updatedQueryStartDate)
      setEndDate(updatedQueryEndDate)
    }, [])
  
    return (
      <CalendarProvider
        onMonthChange={onMonthChange}
        date={selectedDate}
        disabledOpacity={0.6}
        onDateChanged={onDateChanged}>
        <SelectCalendarDateModal
          selectedDate={selectedDate}
          onClose={onCancelSelectDate}
          onSelectDate={onSelectDate}
          isOpen={isDatePickerOpen}
          setIsOpen={setIsDatePickerOpen}
        />
        <ExpandableCalendar
          todayButtonPosition='right'
          theme={baseCalendarTheme}
          renderArrow={renderArrow}
          initialPosition='closed'
          firstDay={1}
          markedDates={markedDates}
        />
        <TimelineList
          showNowIndicator={true}
          scrollToNow={true}
          events={groupedEvents}
          renderItem={renderTimeLineListItem({
            "date":[
               "2023-12-26"
            ],
            "events":[
               {
                  "color":"white",
                  "data":[
                     "Object"
                  ],
                  "end":"2023-12-26T16:43:00Z",
                  "id":201,
                  "start":"2023-12-26T15:43:00Z",
                  "title":"Nov 4th"
               }
            ],
            "initialTime":"undefined",
            "key":"2023-12-26",
            "numberOfDays":1,
            "onChangeOffset":[
               "Function anonymous"
            ],
            "scrollOffset":900,
            "scrollToFirst":false,
            "scrollToNow":false,
            "showNowIndicator":false,
            "timelineLeftInset":72
         })}
        />
      </CalendarProvider>
    )
  }