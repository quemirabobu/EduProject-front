import React from "react";
import styled from "styled-components";

const DayBoxWrapper = styled.div`
  width: 15%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const DayBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

const DateText = styled.p`
  font-size: 18px;
  text-align: left;
  color: #171a2b;
  padding: 15px;
  margin: 0;
`;

const EventContainer = styled.div`
  background-color: #ffe600;
  border-radius: 30px;
  padding: 5px;
  margin: 10px 0;
`;

const EventText = styled.p`
  font-size: 18px;
  margin: 10px;
  text-align: left;
  color: #171a2b;
`;

const LectureDayBox = ({ date, day, event }) => {
  return (
    <DayBoxWrapper>
      <DayBoxContainer>
        <DateText>
          {date}({day})
        </DateText>
        {event &&
          event.map((e, index) => (
            <EventContainer key={index}>
              <EventText>{e}</EventText>
            </EventContainer>
          ))}
      </DayBoxContainer>
    </DayBoxWrapper>
  );
};

export default LectureDayBox;
