import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
  LocaleConfig,
  Agenda,
  AgendaList,
} from 'react-native-calendars';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import groupBy from 'lodash/groupBy';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { timelineEvents, getDate } from '../mocks/timelineEvents';
import { Button, View, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import NewEventModal from '../components/NewEvent';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import NewCalendarListScreen from '../components/AgendaThing';
import { AntDesign } from '@expo/vector-icons';

const INITIAL_TIME = { hour: new Date().getHours(), minutes: new Date().getMinutes() };
const EVENTS = timelineEvents;

LocaleConfig.locales['cs'] = {
  monthNames: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec'
  ],
  monthNames: [
  'Leden',
  'Únor',
  'Březen',
  'Duben',
  'Květen',
  'Červen',
  'Červenec',
  'Srpen',
  'Září',
  'Říjen',
  'Listopad',
  'Prosinec'
  ],
  monthNamesShort: ['Led.', 'Úno.', 'Bře.', 'Dub.', 'Kvě', 'Čvn.', 'Čvc.', 'Srp', 'Zář.', 'Říj.', 'Lis.', 'Pro.'],
  dayNames: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
  dayNamesShort: ['Ne', 'Po', 'Út', 'Stř', 'Čt', 'Pá', 'So'],
  today: "Dnes"
};

LocaleConfig.defaultLocale = 'cs';

const TimelineCalendarScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [addEventDate, setAddEventDate] = useState();
  const [isAgenda, setIsAgenda] = useState(false)
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start))
  );

  const snapPoints = useMemo(() => ['25%', '70%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const cm = {key: 'cm', color: 'lightblue'};
  const work = {key: 'work', color: 'green'};
  const superPrivate = {key: 'superPrivate', color: 'orange'};

  const marked = {
    [`${getDate(-1)}`]: { marked: true, dots: [cm]},
    [`${getDate()}`]: { marked: true, dots: [cm, work, superPrivate] },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true }
  };

  const onDateChanged = useCallback((date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  }, []);

  const onMonthChange = useCallback((month, updateSource) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  }, []);


  const approveNewEvent = useCallback((_timeString, timeObject) => {
    console.log("Approved")
  }, [eventsByDate]);


  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: handlePresentModalPress,
    onBackgroundLongPressOut: approveNewEvent,
    unavailableHours: [{ start: 0, end: 1 }, { start: 22, end: 24 }],
    overlapEventsSpacing: 5,
    rightEdgeSpacing: 5,
    onEventPress: (event) => eventPress(event)
  };



  const eventPress = (event) => {
    message = `místo: ${event.place} \n čas: ${event.start.split(" ")[1]} - ${event.end.split(" ")[1]} \n účastníci: ${event.attendees}`
    Alert.alert(event.title, message)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <BottomSheetModalProvider>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 10}}>
            <TouchableOpacity onPress={() => console.log("search")}>
              <AntDesign name="search1" size={20} color="black" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 15}}>
              <TouchableOpacity onPress={() => setIsAgenda(!isAgenda)} style={!isAgenda ? {backgroundColor: "#6F9CDE", borderRadius: 3}:{}}>
                <MaterialIcons name="calendar-view-day" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePresentModalPress}>
                <FontAwesome name="calendar-plus-o" size={22} color="black" />
              </TouchableOpacity>
            </View>
            {/*<Button
                onPress={handlePresentModalPress}
                title="+"
                color="black"
  />*/}
              </View>
            <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            >
            <View style={styles.contentContainer}>
              <Text>Přidat událost 🎉</Text>
              <NewEventModal startDates={currentDate}/>
            </View>
          </BottomSheetModal>
    <CalendarProvider
      theme="dark"
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      numberOfDays={1}
      >
      {isAgenda === false ? (
        <>
        <ExpandableCalendar
          firstDay={1}
          markingType="multi-dot"
          leftArrowImageSource={require('../img/previous.png')}
          rightArrowImageSource={require('../img/next.png')}
          markedDates={marked}
          onDayLongPress={handlePresentModalPress}
          />
        <TimelineList
          //renderItem={renderTimeLineListItem}
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          scrollToNow
          initialTime={INITIAL_TIME}
          
          />
          </>
      ):(<>
        <NewCalendarListScreen />
      </>)}
    </CalendarProvider>
    </BottomSheetModalProvider>
    </View>
    </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default TimelineCalendarScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timelineTheme: {
    flex: 1,

  }
});