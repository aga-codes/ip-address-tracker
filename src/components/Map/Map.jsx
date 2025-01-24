import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./styles.css";
import { useAppContext } from "../../AppProvider";

const Map = () => {
  const { setIpResponse, userSearchValue } = useAppContext();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [ipAddress, setIPAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getIPAddress = useCallback(async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");

      const { ip } = await response.json();
      setIPAddress(ip);
    } catch (error) {
      console.error("Error getting IP address", error.message);
    }
  }, []);

  const getLocation = useCallback(async () => {
    try {
      const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
      const response = await fetch(URL);

      const data = await response.json();
      const { location } = data;
      const { lat, lng } = location;
      const latitude = Math.round((lat + Number.EPSILON) * 100) / 100;
      const longitude = Math.round((lng + Number.EPSILON) * 100) / 100;
      setIpResponse(data);
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error("Error getting map location", error.message);
    }
  }, [API_KEY, ipAddress, setIpResponse]);

  useEffect(() => {
    if (userSearchValue) {
      setIPAddress(userSearchValue);
    }
  }, [userSearchValue]);

  useEffect(() => {
    getIPAddress();
  }, [getIPAddress]);

  useEffect(() => {
    if (ipAddress) {
      getLocation();
    }
  }, [getLocation, ipAddress]);

  //TO DO: FALLBACK IF IP ADDRESS IS NOT RIGHT

  return (
    <>
      {latitude && longitude && (
        <MapContainer
          key={`${latitude}-${longitude}`}
          center={[latitude, longitude]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker key={1} position={[latitude, longitude]} />
        </MapContainer>
      )}
    </>
  );
};

export { Map };
