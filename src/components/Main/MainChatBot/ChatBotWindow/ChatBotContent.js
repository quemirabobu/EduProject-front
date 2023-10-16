import React, { forwardRef } from "react";
import styled from "styled-components";

const ChatContentWrapper = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: ${(props) =>
    props.type === "user" ? "flex-end" : "flex-start"};
`;

const MessageBox = styled.div`
  position: relative;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.type === "user" ? "#e6e6e6" : "#5ac467"};
  border-radius: 20px;
  margin-bottom: 15px;
  color: ${(props) => (props.type === "user" ? "black" : "white")};
`;

const TimeStamp = styled.span`
  width: 100px;
  font-size: 12px;
  position: absolute;
  color: #000;
  left: ${(props) => (props.type === "bot" ? "5px" : "unset")};
  right: ${(props) => (props.type === "user" ? "-40px" : "unset")};
  bottom: -25px;
`;

const ChatBotContent = forwardRef(({ chatLog }, ref) => (
  <ChatContentWrapper ref={ref}>
    {chatLog &&
      chatLog.map((chat, index) => (
        <MessageContainer key={index} type={chat.type}>
          <MessageBox type={chat.type}>
            <span style={{ fontSize: "14px" }}>{chat.message}</span>
            <TimeStamp type={chat.type}>{chat.time}</TimeStamp>
          </MessageBox>
        </MessageContainer>
      ))}
  </ChatContentWrapper>
));

export default ChatBotContent;
