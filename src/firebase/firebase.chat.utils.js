import firebase from 'firebase/app';
import 'firebase/firestore';

export const addChatToDb = chat => firebase.firestore().collection('chats').doc(chat.name.toString()).set(chat);

export const addMessageToDb = (chat, sender, message) => {
    const chatRef = firebase.firestore().collection('chats').doc(chat.toString());
    
    let timestamp = firebase.firestore.Timestamp.now();
    chatRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            message,
            sender,
            timestamp
        })
    }).then(function() {
        console.log("Document successfully updated!");
    }, (error) => console.log(error));

}
