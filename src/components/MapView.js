import React, { useContext } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';

import { ChatContext } from '../providers/chat/chat.provider';

const MapView = () => {

  const { chatRooms, selectChatRoom, addChatRoom, loggedUser } = useContext(ChatContext);

  const addMarker = e => {
    const newMarker = {
      "description": "new marker" + chatRooms.length,
      name: "new name" + chatRooms.length,
      "geometry": [
        e.latlng.lat,
        e.latlng.lng
      ],
      id: chatRooms.length,
      createdBy: loggedUser.currentUser.email
    }
    addChatRoom(newMarker);
    setSelectedChatRoom(newMarker);
  }

  const setSelectedChatRoom = chatRoom => {
    selectChatRoom(chatRoom);
    console.log(chatRoom);
  }

  const currentLocation = { lat: 46.7712, lng: 23.6236 };
  const zoom = 5;

  return (
    <Map center={currentLocation} zoom={zoom} onClick={addMarker}>
      <TileLayer
        url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      <Markers setSelectedChatRoom={setSelectedChatRoom} venues={chatRooms} />
    </Map>
  );
}

export default MapView;
