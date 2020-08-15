import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  const { venues, setSelectedChatRoom } = props;

  const markers = venues.map((venue, index) => (
    <Marker onClick={() => setSelectedChatRoom(venue)} key={index} position={venue.geometry} icon={VenueLocationIcon} >
      <MarkerPopup data={venue}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;
