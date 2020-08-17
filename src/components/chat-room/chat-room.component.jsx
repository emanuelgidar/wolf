import React, { useContext, useEffect } from 'react';
import './chat-room.styles.scss';

import { messageSubscriber } from '../../firebase/firebase.chat.utils';
import { ChatContext } from '../../providers/chat/chat.provider';
import AddMessage from '../add-message/add-message.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatRoom = () => {
  const { selectedChatRoom, addMessage, loggedUser, messages, updateMessages } = useContext(ChatContext);

  useEffect(() => {
    if(selectedChatRoom){
      let unsubscribeFromChatRoom = messageSubscriber(selectedChatRoom, updateMessages);
      return unsubscribeFromChatRoom;
    }
  }, [selectedChatRoom])

  const handleSubmit = message => {
    addMessage(selectedChatRoom, loggedUser, message);
  }

  const renderNoChat = () => {
    return (
      <div className="chat-room start-chat-message">{"Click on the map to start a chat, or select a marker to enter one"}</div>
    );
  }

  return (
    !selectedChatRoom ? renderNoChat() :
      <div className="chat-room">
        <h2 className="title">{selectedChatRoom && selectedChatRoom.name}
        </h2>
        <div className="chat-messages">
          <ChatMessages messages={messages} />
        </div>
        <div>
          <AddMessage handleSubmit={handleSubmit} />
        </div>
      </div>);
};

export default ChatRoom;
