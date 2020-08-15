import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
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

}



export default App;
