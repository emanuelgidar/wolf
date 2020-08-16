import firebase, { firestore } from './firebase.utils';

export const addChatToDb = chat => {
    firestore.collection('chats').doc(chat.name.toString()).set(chat);
}

export const addMessageToDb = (chat, sender, message) => {
    const chatRef = firestore.collection('chats').doc(chat.toString());

    let timestamp = firebase.firestore.Timestamp.now();
    chatRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            message,
            sender,
            timestamp
        })
    }).then(function () {
        console.log("Document successfully updated!");
    }, (error) => console.log(error));

}

export const messageSubscriber = (selectedChatRoom, selectChatRoom) => {
    firestore.collection('chats').onSnapshot(response => {
        const chats = response.docs.map(_doc => _doc.data());
        if (selectedChatRoom) {
          const updatedChatRoom = chats.find(chatRoom => chatRoom.name === selectedChatRoom.name);
          if (updatedChatRoom.messages.length > selectedChatRoom.messages.length) {
            selectChatRoom(updatedChatRoom);
          }
        }
      })
}
