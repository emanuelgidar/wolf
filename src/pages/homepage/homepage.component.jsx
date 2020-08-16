import React from 'react';

import './homepage.styles.scss';
import ChatRoom from '../../components/chat/chatRoom.component';
import MapView from '../../components/map/map-view.component';


const Homepage = ({ currentUser }) => (
    <div className="homepage">
        <MapView />
        <ChatRoom user={currentUser} />
    </div>
);

export default Homepage;
