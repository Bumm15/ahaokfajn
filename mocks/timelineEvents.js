import { CalendarUtils} from 'react-native-calendars';

const EVENT_COLOR = '#e6add8';
const today = new Date();
export const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
console.log(getDate())

export const timelineEvents = [
  {
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  },
  {
    start: `${getDate()} 01:15:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Neco A',
    place: "Tu a tam",
    summary: 'Popis pro Neco A',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 01:30:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Neco B',
    summary: 'Popis pro Neco B',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 01:45:00`,
    end: `${getDate()} 02:45:00`,
    title: 'Neco C',
    summary: 'Popis pro Neco C',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 02:40:00`,
    end: `${getDate()} 03:10:00`,
    title: 'Neco D',
    summary: 'Popis pro Neco D',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 3:00:00}`,
    end: `${getDate()} 4:00:00`,
    title: 'Neco E',
    summary: 'Popis pro Neco E',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 04:30:00`,
    end: `${getDate()} 05:30:00`,
    title: 'Neco F',
    summary: 'Popis pro Neco F',
    color: EVENT_COLOR
  },
  {
    start: `${getDate(1)} 12:00:00`,
    end: `${getDate(1)} 13:30:00`,
    title: 'Soukromý event',
    summary: 'K babi na oběd',
    color: 'lightblue'
  },
  {
    start: `${getDate(2)} 06:00:00`,
    end: `${getDate(3)} 06:00:00`,
    title: 'Mám službu v práci',
    summary: 'Ostatní vidí jako že nemáš čas',
    color: 'orange'
  }
];