import React from "react";
import styled from "styled-components";
import MapAPI from "./MapAPI";

const MapContainer = styled.div`
  background-color: #323232;
  width: 1000px;
  height: 620px;
  position: relative;
`;

const Map = ({ carNumber }) => {
  return (
    <MapContainer>
      {carNumber ? <MapAPI location={carNumber} /> : null}
    </MapContainer>
  );
};

export default Map;
