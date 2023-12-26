import TimelineCalendarScreen from './views/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import ChatView from './views/Chat';
import NotoficationView from './views/NotificationsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {registerForPushNotificationsAsync, saveTokenToDatabase} from './helpers/NotificationsHelper';
import * as Notifications from 'expo-notifications';
import { DBProvider } from './contexts/dbContext';
import { AppointmentTimeline } from './views/Test';
//import tw from "twrc"

export default function App() {
  // TODO: bottom nav, firebase connection, notifs - in bottom nav and notifs when new or close event, chat, settings, backround tasks 
  const [user, setUser] = useState(null)
  const Stack = createNativeStackNavigator();
  const InsideStack = createBottomTabNavigator();

  //const Tab = createBottomTabNavigator()

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      //user.displayName = "Pája"
      setUser(user)
      console.log(user)
    })


    registerForPushNotificationsAsync().then(token => saveTokenToDatabase(token));

    Notifications.addNotificationReceivedListener(notification => {
      console.log("Notofocation: " + notification);
    });
  
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Response: " + response);
    });
  }, [])

  function InsideLayout() {
    const notificationsCount = 2;
    const newChatCount = 0

    return (
      <InsideStack.Navigator initialRouteName='Kalendář'>
        <InsideStack.Screen name='Chat' component={ChatView} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ), 
          tabBarBadge: newChatCount === 0 ? null : newChatCount,
          }}
          initialParams={{user: user}}
        />
        <InsideStack.Screen name='Kalendář' component={AppointmentTimeline} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" size={size} color={color} />
          )
          }} />
        <InsideStack.Screen name='Oznámení' component={NotoficationView} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          tabBarBadge: notificationsCount === 0 ? null : notificationsCount}}/>
      </InsideStack.Navigator>
    )
  }

  return (
    <DBProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          {user ? (
            <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false}}/>
          ) : (
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DBProvider>
  );
}

