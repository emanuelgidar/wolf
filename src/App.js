import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { ChatContext } from './providers/chat/chat.provider';


import './App.css';

const App = () => {

  const { onUserLoggedIn } = useContext(ChatContext);


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
      }
      onUserLoggedIn(userAuth);
      // this.setState({ currentUser: userAuth });
    });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/homepage' component={Homepage} />
        <Route
          exact
          path='/'
          render={() =>
            this.state.currentUser ? (
              <Redirect to='/homepage' />
            ) : (
                <SignInAndSignUpPage />
              )
          }
        />
      </Switch>
    </BrowserRouter>
  );
}




export default App;
