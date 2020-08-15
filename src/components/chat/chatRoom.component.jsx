import React, { useContext } from 'react';
import { ChatContext } from '../../providers/chat/chat.provider';
import './chatRoom.styles.scss';
import AddMessage from '../add-message/add-message.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatRoom = (props) => {
  const { selectedChatRoom } = useContext(ChatContext);
  console.log(selectedChatRoom);
  const renderNoChat = () => {
    return (
      <div className="start-chat-message">{"Click on the map to start a chat, or select a marker to enter one"}</div>
    );
  }

  return (
    !selectedChatRoom ? renderNoChat() :
      <div className="chat-room">
        <div className='poup-text'>{selectedChatRoom && selectedChatRoom.name}
        </div>
        <div>
          <ChatMessages />
        </div>
        <div>
          <AddMessage />
        </div>
      </div>);
};

export default ChatRoom;
