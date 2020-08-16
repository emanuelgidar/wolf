import React, { Fragment } from 'react'
import { Marker } from 'react-leaflet';
import { MarkerIcon } from './marker-icon';
import MarkerPopup from './marker-popup.component';

const ChatMarkers = (props) => {
  const { venues, setSelectedChatRoom } = props;

  const markers = venues.map((venue, index) => (
    <Marker onClick={() => setSelectedChatRoom(venue)} key={index} position={venue.geometry} icon={MarkerIcon} >
      <MarkerPopup data={venue} />
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default ChatMarkers;
