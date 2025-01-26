import "./styles.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppProvider";

const DisplayInfo = () => {
  const { ipResponse, showErrorPage } = useAppContext();

  const [ipAddress, setIpAddress] = useState("4.2.2.2");
  const [city, setCity] = useState("Charlotte");
  const [timezone, setTimezone] = useState("-05:00");
  const [isp, setISP] = useState("Lumen AS3356");
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (ipResponse) {
      const { isp, ip, location } = ipResponse;
      setISP(isp);
      setIpAddress(ip);
      setLocation(location);
    }
  }, [ipResponse]);

  useEffect(() => {
    if (location) {
      const { city, timezone } = location;

      setCity(city);
      setTimezone(timezone);
    }
  }, [location]);

  const showCorrectUi = () => {
    if (showErrorPage) {
      const ErrorText =
        "❗️Something went wrong while processing the request. Please verify the domain or IP address and try again.";

      return (
        <div id="display-info-container">
          <h1>{ErrorText}</h1>
        </div>
      );
    } else {
      return (
        <div id="display-info-container">
          <div className="info">
            <h2>Ip Address</h2>
            <p>{ipAddress}</p>
          </div>
          <div className="info">
            <h2>city</h2>
            <p>{city}</p>
          </div>
          <div className="info">
            <h2>Timezone</h2>
            <p>{timezone}</p>
          </div>
          <div className="info">
            <h2>ISP</h2>
            <p>{isp}</p>
          </div>
        </div>
      );
    }
  };

  return showCorrectUi();
};

export { DisplayInfo };
