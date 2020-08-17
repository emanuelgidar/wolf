import React, { createContext, useState } from 'react';
import { addChatToDb, addMessageToDb } from '../../firebase/firebase.chat.utils' ;

export const ChatContext = createContext({
    loggedUser: null,
    selectedChatRoom: null,
    chatRooms: [],
    selectChatRoom: () => {},
    addChatRoom: () => {},
    messages: []
});

const ChatProvider = ({ children }) => {
    const [loggedUser, setLoggedUser]  = useState(null);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const [chatRooms, setChatRooms]  = useState([]);
    const [messages, setMessages]  = useState([]);

    
    const onUserLoggedIn = user => setLoggedUser(user);
    
    const initChatRooms = chatRooms => setChatRooms(chatRooms); 

    const addChatRoom = chatRoom => addChatToDb(chatRoom);

    const selectChatRoom = chatRoom => {
        setSelectedChatRoom(chatRoom);
    }
    const updateMessages = messages => setMessages(messages);

    const addMessage = (selectedChatRoom, loggedInUser, message) => addMessageToDb(selectedChatRoom.name, loggedInUser.currentUser.email, message);
    
    return <ChatContext.Provider
    value={{
        loggedUser,
        onUserLoggedIn,
        selectedChatRoom,
        selectChatRoom,
        chatRooms,
        addChatRoom,
        initChatRooms,
        addMessage,
        messages,
        updateMessages
    }}
    >
    {children}
    </ChatContext.Provider>
}

export default ChatProvider;
