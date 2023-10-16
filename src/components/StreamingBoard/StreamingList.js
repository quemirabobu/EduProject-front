import React from "react";
import styled from "styled-components";
import StreamingListItem from "./StreamingListItem";

const Container = styled.div`
  width: 90%;
  height: 660px;
  margin: 20px auto 0 auto;
  background: #ececec;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
`;

const StreamingList = ({ liveData }) => {
  return (
    <Container>
      {liveData.map((item, index) => (
        <StreamingListItem
          key={index}
          id={item.id}
          liveThumb={item.liveThumb}
          lectureName={item.title}
          teacherName={item.teacher}
          viewer={item.userCount}
        />
      ))}
    </Container>
  );
};

export default StreamingList;
