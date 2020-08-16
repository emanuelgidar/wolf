import React, { useContext } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ChatMarkers from './chat-markers.component';

import { ChatContext } from '../../providers/chat/chat.provider';

const MapView = () => {

  const { chatRooms, selectChatRoom, addChatRoom } = useContext(ChatContext);

  const addMarker = e => {
    const chatRoom = {
      name: chatRooms.length+1,
      geometry: [
        e.latlng.lat,
        e.latlng.lng
      ],
      messages: []
    }
    addChatRoom(chatRoom);
    setSelectedChatRoom(chatRoom);
  }

  const setSelectedChatRoom = chatRoom => {
    selectChatRoom(chatRoom);
  }

  const currentLocation = { lat: 46.7712, lng: 23.6236 };
  const zoom = 5;

  return (
    <Map center={currentLocation} zoom={zoom} onClick={addMarker}>
      <TileLayer
        url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      <ChatMarkers setSelectedChatRoom={setSelectedChatRoom} venues={chatRooms} />
    </Map>
  );
}

export default MapView;
