import { firestore } from './firebase.utils';

export const addChat = chat => firestore.collection('chats').doc(chat.name.toString()).set(chat);
