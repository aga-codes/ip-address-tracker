import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./styles.css";

const Map = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [userIpAddress, setUserIpAddress] = useState("");
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const getUserIpAddress = useCallback(async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");

      const { ip } = await response.json();
      setUserIpAddress(ip);
    } catch (error) {
      console.error("Error getting user IP address", error.message);
    }
  }, []);

  const getUserLocation = useCallback(async () => {
    try {
      const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${userIpAddress}`;
      const response = await fetch(URL);

      const { location } = await response.json();
      const { lat, lng } = location;
      const userLat = Math.round((lat + Number.EPSILON) * 100) / 100;
      const userLng = Math.round((lng + Number.EPSILON) * 100) / 100;
      setUserLat(userLat);
      setUserLng(userLng);
    } catch (error) {
      console.error("Error getting user location", error.message);
    }
  }, [API_KEY, userIpAddress]);

  useEffect(() => {
    getUserIpAddress();
  }, [getUserIpAddress]);

  useEffect(() => {
    if (userIpAddress) {
      getUserLocation();
    }
  }, [getUserLocation, userIpAddress]);

  console.log(userLat);

  return (
    <>
      {userLat && userLng && (
        <MapContainer
          center={[userLat, userLng]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker key={1} position={[userLat, userLng]} />
        </MapContainer>
      )}
    </>
  );
};

export { Map };
