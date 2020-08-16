import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../../providers/chat/chat.provider';
import './chatRoom.styles.scss';
import AddMessage from '../add-message/add-message.component';
import ChatMessages from '../chat-messages/chat-messages.component';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ChatRoom = () => {
  const { selectedChatRoom, addMessage, loggedUser, selectChatRoom } = useContext(ChatContext);

  const shouldUpdateChat = () => !selectedChatRoom;

  let unsubscribeFromChatRoom = null;

  useEffect(() => {
    handleSelectedChatRoomChange();
    return () => unsubscribeFromChatRoom();
  }, [shouldUpdateChat])

  const handleSelectedChatRoomChange = () => {
    unsubscribeFromChatRoom = firebase.firestore().collection('chats').onSnapshot(response => {
      const chats = response.docs.map(_doc => _doc.data());
      if (selectedChatRoom) {
        const newSelectedChatRoom = chats.find(chatRoom => chatRoom.name === selectedChatRoom.name);
        if (newSelectedChatRoom.messages.length > selectedChatRoom.messages.length) {
          selectChatRoom(chats.find(chatRoom => chatRoom.name === selectedChatRoom.name));
        }
      }
    })
  }

  const renderNoChat = () => {
    return (
      <div className="chat-room start-chat-message">{"Click on the map to start a chat, or select a marker to enter one"}</div>
    );
  }

  const handleSubmit = message => {
    addMessage(selectedChatRoom, loggedUser, message);
  }

  return (
    !selectedChatRoom ? renderNoChat() :
      <div className="chat-room">
        <h2 className="title">{selectedChatRoom && selectedChatRoom.name}
        </h2>
        <div className="chat-messages">
          <ChatMessages messages={selectedChatRoom.messages} />
        </div>
        <div>
          <AddMessage handleSubmit={handleSubmit} />
        </div>
      </div>);
};

export default ChatRoom;
