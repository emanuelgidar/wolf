import React, { createContext, useState } from 'react';
import { addChatToDb, addMessageToDb } from '../../firebase/firebase.chat.utils' ;

export const ChatContext = createContext({
    loggedUser: null,
    selectedChatRoom: null,
    chatRooms: [],
    selectChatRoom: () => {},
    addChatRoom: () => {}
});

const ChatProvider = ({ children }) => {
    const [loggedUser, setLoggedUser]  = useState(null);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const [chatRooms, setChatRooms]  = useState([]);

    const addChatRoom = chatRoom => addChatToDb(chatRoom);
    
    const initChatRooms = chatRooms => {
        setChatRooms(chatRooms);
        if(selectedChatRoom){
            selectChatRoom(chatRooms.find(cr=> cr.name === selectedChatRoom.name));
        }
        
    } 
    const selectChatRoom = chatRoom => {
        setSelectedChatRoom(chatRoom);
    }
    const onUserLoggedIn = user => setLoggedUser(user);
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
        addMessage
    }}
    >
    {children}
    </ChatContext.Provider>
}

export default ChatProvider;
