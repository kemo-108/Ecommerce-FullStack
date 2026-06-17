import React from "react";
import "../Advertisement/Advertisement.css";
import advertisement from "../../image/image-Advertisement.png";
const Advertisement = () => {
  return (
    <div className="advertisement">
      <h1>Wait for Splice's offers on the occasion of back to school</h1>

      <img src={advertisement} alt="advertisement" />
    </div>
  );
};

export default Advertisement;
