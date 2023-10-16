import React from "react";
import styled from "styled-components";

const StyledChatBotHeader = styled.div`
  position: relative;
  width: 100%;
  height: 5.5%;
  background-color: #5ac467;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 5%;
  background-color: #ec6b5e;
  border-radius: 50%;
  cursor: pointer;
`;

const ChatBotHeader = ({ onClose }) => {
  return (
    <StyledChatBotHeader>
      <CloseButton onClick={onClose} />
    </StyledChatBotHeader>
  );
};
export default ChatBotHeader;
