/*
Everything to get/post to the database

*/


import React, { useContext, useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, startAfter, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const FirebaseContext = React.createContext();

export function useDB() {
  return useContext(FirebaseContext);
}


export function DBProvider({ children }) {
  const user = 'jcQtVKCUO4NOZFXEiAizRgWaR0N2' // TODO: change when authContext will be done - prefferably to have whole user thing {}


  /**************** EVENTS ****************/

  function getEventsForMonth(currentMonth) {
    
  }

  function addNewEvent() {

  }

  function deleteEvent(event_id) {

  }

  function updateEvent(event_id, props) {

  }

  /**************** END OF EVENTS ****************/

  /**************** CHAT ****************/
  const [messages, setMessages] = useState([]);
  const [lastVisibleMessage, setLastVisibleMessage] = useState(null);

  const loadInitialMessages = () => {
    const messagesRef = collection(db, "chats");
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        image: doc.data().image,
        user: doc.data().user,
      }));

      setMessages(newMessages);
      setLastVisibleMessage(snapshot.docs[snapshot.docs.length - 1]);
    });

    return unsubscribe;
  };

  const loadOlderMessages = () => {
    if (!lastVisibleMessage) return;

    const messagesRef = collection(db, "chats");
    const q = query(messagesRef, orderBy('createdAt', 'desc'), startAfter(lastVisibleMessage), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const olderMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        image: doc.data().image,
        text: doc.data().text,
        user: doc.data().user,
      }));

      setMessages(prevMessages => [...prevMessages, ...olderMessages]);
      setLastVisibleMessage(snapshot.docs[snapshot.docs.length - 1]);
    });

    return unsubscribe;
  };

  const sendMessage = async (newMessages = []) => {
    const messagesRef = collection(db, 'chats');
    
    for (const message of newMessages) {
      await addDoc(messagesRef, {
        _id: message._id,
        text: message.text,
        createdAt: new Date(),
        user: message.user,
      });
    }
  };

    function getNewChatsCount() {

    }

    /**************** END OF CHAT ****************/

    /**************** NOTIFICATIONS ****************/

    function loadNotifications() {

    }

    function sendNotificationResponse() {

    }

    function getNewNotificationsCount() {

    }

    /**************** END OF NOTIFICATIONS ****************/


    const value = {
        getEventsForMonth,
        addNewEvent,
        loadInitialMessages,
        loadOlderMessages,
        sendMessage,
        loadNotifications,
        sendNotificationResponse,
        getNewNotificationsCount,
        getNewChatsCount,
        deleteEvent,
        updateEvent,
        messages

    };
    
    
    return (
        <FirebaseContext.Provider value={value}>
          {children}
        </FirebaseContext.Provider>
      );
}
