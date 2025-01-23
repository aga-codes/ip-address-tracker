import "./styles.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppProvider";

const DisplayInfo = () => {
  const { ipResponse } = useAppContext();

  const [ipAddress, setIpAddress] = useState(123);
  const [location, setLocation] = useState("London");
  const [timezone, setTimezone] = useState("+00:00");
  const [isp, setISP] = useState("BRB");

  useEffect(() => {
    if (ipResponse) {
      const { isp, ip } = ipResponse;
      // const { city, timezone } = ipResponse.location;
      console.log("ip", ip);
      console.log("location", ipResponse.location);
      setISP(isp);
      setIpAddress(ip);
      // setTimezone(timezone);
      // setLocation(city);
    }
  }, [ipResponse]);

  return (
    <div id="display-info-container">
      <div className="info">
        <h2>Ip Address</h2>
        <p>{ipAddress}</p>
      </div>
      <div className="info">
        <h2>Location</h2>
        <p>{location}</p>
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
};

export { DisplayInfo };
