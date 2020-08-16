import React, { useEffect, useRef } from 'react';
import './chat-messages.component.scss';

const ChatMessages = (props) => {
  const { messages } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  messages.forEach(message => {
    return message.formattedTimestamp = message.timestamp.toDate();
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const renderMessages = messages.map((message, index) => (
    <div className="message" key={index} >
      {message.sender}({message.formattedTimestamp.toLocaleString()}) : {message.message}
    </div>
  ));

  return (<div>
    {messages && renderMessages}
    <div ref={messagesEndRef} />
  </div>);
};

export default ChatMessages;

