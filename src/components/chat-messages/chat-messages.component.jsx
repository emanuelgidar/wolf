 import React, { useContext } from 'react';
 import { ChatContext } from '../../providers/chat/chat.provider';

const ChatMessages = (props) => {
    const { selectedChatRoom } = useContext(ChatContext);

    const messages = selectedChatRoom.messages.map((message, index) => (
        <div className="message" key={index} >
          {message.sender}:{message.message}
        </div>
      ));

    return (<div className="chat-messages">
        {selectedChatRoom && selectedChatRoom.messages && messages}
    </div>);
};

export default ChatMessages;
