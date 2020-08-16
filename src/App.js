import React, { useEffect, useContext } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import { ChatContext } from './providers/chat/chat.provider';

import './App.css';

const App = () => {

  const { loggedUser, onUserLoggedIn, initChatRooms } = useContext(ChatContext);


  let unsubscribeFromAuth = null;

  useEffect(() => {
    userLoggedIn();
    return () => unsubscribeFromAuth();
  }, [])

  const userLoggedIn = () => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          onUserLoggedIn({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });

        await firestore.collection('chats').onSnapshot(response => {
          const chats = response.docs.map(_doc => _doc.data());
          initChatRooms(chats);
        })
      }
      onUserLoggedIn(userAuth);
    });
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path='/'
          render={() =>
            loggedUser ? (
              <Homepage />
            ) : (
                <SignInAndSignUpPage />
              )
          }
        />
        <Route exact path='/homepage' component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
