import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { ChatContext } from '../../providers/chat/chat.provider';

import './header.styles.scss';

const Header = () => {
  const { loggedUser } = useContext(ChatContext);

  return (
    <div className='header'>
      <div className='options'>
        {loggedUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
            <Link className='option' to='/signin'>
              SIGN IN
            </Link>
          )}
      </div>
    </div>
  );
};

export default Header;
