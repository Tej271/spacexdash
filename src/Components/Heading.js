import React from "react";
import logo from "../assets/images/spacex-logo-copy.png";

function Heading() {
  return (
    <div
      style={{
        // height: 80,
        width: "100%",
        textAlign: "center",
        boxShadow: "0px 2px 2px #888",
      }}
    >
      <img
        src={logo}
        style={{ marginTop: "1%", marginBottom: "1%" }}
        width="20%"
        alt="spacex-logo"
      />
    </div>
  );
}

export default Heading;
