import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./styles.css";
import { useAppContext } from "../../AppProvider";

const Map = () => {
  const { setIpResponse, userSearchValue, showErrorPage, setShowErrorPage } =
    useAppContext();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [ipAddress, setIPAddress] = useState("");
  const [domain, setDomain] = useState("");
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
      const LOCATION_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
      const response = await fetch(LOCATION_URL);

      const data = await response.json();
      const { location } = data;
      const { lat, lng } = location;
      const latitude = Math.round((lat + Number.EPSILON) * 100) / 100;
      const longitude = Math.round((lng + Number.EPSILON) * 100) / 100;
      setIpResponse(data);
      setLatitude(latitude);
      setLongitude(longitude);
      setShowErrorPage(false);
    } catch (error) {
      setShowErrorPage(true);
      console.error("Error getting map location", error.message);
    }
  }, [API_KEY, ipAddress]);

  const getDomainIPAddress = useCallback(async (domain) => {
    try {
      const DOMAIN_URL = `https://dns.google/resolve?name=${domain}`;
      const response = await fetch(DOMAIN_URL);
      const info = await response.json();
      const domainIpAddress = info.Answer[1].data;
      setIPAddress(domainIpAddress);
    } catch (error) {
      setShowErrorPage(true);
      console.log("Error getting domain IP address", error.message);
    }
  }, []);

  const isValidDomain = (domain) => {
    const domainRegex = /^(?!:\/\/)([A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,6}$/;
    return domainRegex.test(domain);
  };

  useEffect(() => {
    if (userSearchValue && !isValidDomain(userSearchValue)) {
      setIPAddress(userSearchValue);
    } else if (isValidDomain(userSearchValue)) {
      setDomain(userSearchValue.toLowerCase());
    } else {
      setShowErrorPage(true);
    }
  }, [setShowErrorPage, userSearchValue]);

  useEffect(() => {
    setShowErrorPage(false);
    getIPAddress();
  }, [getIPAddress]);

  useEffect(() => {
    if (ipAddress) {
      getLocation();
    }
  }, [getLocation, ipAddress]);

  useEffect(() => {
    if (domain) {
      getDomainIPAddress(domain);
    }
  }, [domain, getDomainIPAddress]);

  const showCorrectMapUi = () => {
    if (longitude && latitude && !showErrorPage) {
      return (
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
      );
    }

    if (showErrorPage) {
      return <div id="error-page-container"></div>;
    }
  };

  return showCorrectMapUi();
};
export { Map };
