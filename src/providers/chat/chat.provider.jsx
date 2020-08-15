import React, { createContext, useState, useEffect } from 'react';

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

    const addChatRoom = chatRoom => setChatRooms(addRoomToChatRooms(chatRooms, chatRoom));
    const selectChatRoom = chatRoom => setSelectedChatRoom(chatRoom);
    const onUserLoggedIn = user => setLoggedUser(user);
    
    const addRoomToChatRooms = (existingChatRooms, chatRoomToAdd)  => {
        return [...existingChatRooms, chatRoomToAdd];
    }
    return <ChatContext.Provider
    value={{
        loggedUser,
        onUserLoggedIn,
        selectedChatRoom,
        selectChatRoom,
        chatRooms,
        addChatRoom
    }}
    >
    {children}
    </ChatContext.Provider>
}

export default ChatProvider;
