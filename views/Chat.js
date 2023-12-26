import React, { useEffect } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import 'dayjs/locale/cs';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView, Text } from 'react-native';
import { useDB } from '../contexts/dbContext';

/* fix this shit - firestore connection */

function ChatView({ navigation, route }) {
  const { user } = route.params;

  const { messages, loadInitialMessages, loadOlderMessages, sendMessage } = useDB();

  const getCorrentNames = () => {
    switch (user.email) {
      case "pavelmarek25@seznam.cz":
        user.displayName = "Pája"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/39736389_522663618147204_18053955158278144_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=2r1x7VkfccsAX8qg8Qm&_nc_ht=scontent-prg1-1.xx&oh=00_AfBdnFLzu0-FhHueXOsNriTrYNkb3XVrm71volFuJzt2Yg&oe=655FA23F"
        break;
      case "pavliiiicek.m@seznam.cz":
        user.displayName = "Pája - test"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/39736389_522663618147204_18053955158278144_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=2r1x7VkfccsAX8qg8Qm&_nc_ht=scontent-prg1-1.xx&oh=00_AfBdnFLzu0-FhHueXOsNriTrYNkb3XVrm71volFuJzt2Yg&oe=655FA23F"
        break;
      case "vergoj@seznam.cz":
        user.displayName = "Věruška"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/376280953_1936719870033083_798330768131990926_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xcdbN9HFRf8AX_jJEt_&_nc_ht=scontent-prg1-1.xx&oh=00_AfBcTeBeWh1kCfCdHj4499hK-EH6Jh2trRnUUhvK_v--Fg&oe=653F02DA"
        break;
      case "pepek.koutny@seznam.cz":
        user.displayName = "Pepík"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/165219810_1610949709104281_5184610095400762142_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=be3454&_nc_ohc=ZGAzoDlrtowAX-keGUj&_nc_ht=scontent-prg1-1.xx&oh=00_AfCtsslHWV7dwODEl-NW3GKY-9TjBqDDyhcBId-_xN9p3Q&oe=6560AAC8"
        break;
      case "petr.marek.os@email.cz":
        user.displayName = "Peťko"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.18169-1/31326886_2039723526240976_8132042803498628525_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=pkMyTmonUOoAX_vM0hY&_nc_ht=scontent-prg1-1.xx&oh=00_AfArUR52ktQFKteKY7FcM_b3ElJFCiSpWDg5KjqqcuMJ1Q&oe=65607EC6"
        break;
      case "k3160617@gmail.com":
        user.displayName = "Evička"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/311781306_790096362209805_1945969839716533060_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UoEGex4NaeAAX-anCso&_nc_ht=scontent-prg1-1.xx&oh=00_AfA0XIT-Q7CZt9GzjOq3gzPZZleXGYh6NkPCbW61LVRU2g&oe=653EFBDC"
        break;
      case "helagoj@seznam.cz":
        user.displayName = "Helča"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/118343716_684913092111508_1816166792890432603_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=be3454&_nc_ohc=WnODFCQ0fgYAX-x048D&_nc_ht=scontent-prg1-1.xx&oh=00_AfBr4ce1UjCibJM9oQ8k1FR-GBeCmc-e3OfXbeqzX48ilQ&oe=6560ADAF"
        break;
      case "gojtom@seznam.cz":
        user.displayName = "Tomáš"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/90160639_2602931503311114_4400785781115846656_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=mziNJHk8dnYAX_1ivfO&_nc_ht=scontent-prg1-1.xx&oh=00_AfA0uDFGZkqzaoMb31EyQvq0NfkqOQ_yIC7TFF27ypNTGA&oe=6560B5C7"
        break;
      case "jirkaspi9@seznam.cz":
        user.displayName = "Piňďa"
        user.photoURL = "https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/300205502_620020356311846_1395657586509135783_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wOiYOt_FJNQAX9qxewv&_nc_ht=scontent-prg1-1.xx&oh=00_AfC5uGfwJzOVkeCN0RBEtFd2oENsRNcTO7Wkfv5I9YxsfA&oe=653E5D40"
        break;
        
        default:

        break;
    }
  }

  useEffect(() => {
    getCorrentNames()
    const unsubscribe = loadInitialMessages();
    return () => {
      unsubscribe();
    };
  }, []);
  
  const loadOlderMessagesHandler = () => {
    loadOlderMessages();
  };

  const onSend = (newMessages = []) => {
    sendMessage(newMessages.map(m => ({ ...m, user: { ...m.user, name: user.displayName } })));
  };


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Feather style={{ marginRight: 10, marginBottom: 10 }} name="send" size={24} color="blue" />
      </Send>
    );
  };

  const renderLoadEarlier = () => {
    return(
      <Text>Načíst další..</Text>
    )
      
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <GiftedChat
      locale="cs"
      messages={messages}
      onSend={onSend}
      isTyping={true}
      placeholder="Aa.."
      timeFormat="HH:mm"
      dateFormat = 'DD. MM. YYYY'
      scrollToBottom
      renderUsernameOnMessage={true}
      onLoadEarlier={loadOlderMessagesHandler}
      infiniteScroll={true}
      loadEarlier={true}
      renderLoadEarlier={renderLoadEarlier}
      renderSend={renderSend}
      user={{
        _id: user.uid, // Make sure this ID is unique
        name: user.displayName,
        avatar: user.photoURL,
      }}
      // Add other props and callbacks as necessary
      />
      {/*
    
        <GiftedChat
          locale="cs"
          messages={messages}
          placeholder="Aa.."
          timeFormat="HH:mm"
          showAvatarForEveryMessage={true}
          loadEarlier={true}
          renderLoadEarlier={renderLoadEarlier}
          infiniteScroll={true}
          renderUsernameOnMessage={true}
          onSend={onSend}
          renderSend={renderSend}
          //isLoadingEarlier={true}
          user={{
            _id: user?.uid,
            name: user?.displayName,
            avatar: user?.photoURL,
          }}
          // Implement onEndReached function to load older messages when the user scrolls up
          onLoadEarlier={loadOlderMessagesHandler}
        />
    */}
    </SafeAreaView>
    </>

  );
}

export default ChatView;