import React from "react";
import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";

const ListItem = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  background: #ffffff;
  margin: 20px auto;
  display: flex;
`;

const VideoFrame = styled.div`
  width: 300px;
  height: 180px;
  margin: 0 40px 0 20px;
  background-color: #323232;
  // cursor: pointer;
`;

const StreamingListItem = ({
  id,
  liveThumb,
  lectureName,
  teacherName,
  viewer,
}) => {
  return (
    <ListItem key={id}>
      <VideoFrame>
        <img style={{ width: "300px", height: "180px" }} src={liveThumb} />
      </VideoFrame>
      <div>
        <div style={{ fontSize: "25px" }}>{lectureName}</div>
        <div style={{ marginTop: "40px", fontSize: "20px" }}>
          {teacherName} 선생님
        </div>
        <div style={{ marginTop: "25px", color: "#323232" }}>
          {viewer}명 시청 중
        </div>
      </div>
    </ListItem>
  );
};

export default StreamingListItem;
