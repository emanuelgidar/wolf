import React, { useContext } from 'react';
import { ChatContext } from '../../providers/chat/chat.provider';
import './chatRoom.styles.scss';
import AddMessage from '../add-message/add-message.component';

const ChatRoom = (props) => {
  const { selectedChatRoom } = useContext(ChatContext);
  const { currentUser } = props;
  console.log(currentUser);
  const renderNoChat = () => {
      return (
        <div className="message">{"Click on the map to start a chat"}</div>
      );
  }

  return  (
    !selectedChatRoom ? renderNoChat() :
    <div className="chat-room">
    <div className='poup-text'>{selectedChatRoom && selectedChatRoom.name}
    </div>
    <div>
      <AddMessage></AddMessage>
    </div>
  </div>);
};

export default ChatRoom;
