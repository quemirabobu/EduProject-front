// import { ncloudchat } from "ncloudchat";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
const ncloudchat = require("ncloudchat");

const MessagesWrapper = styled.div`
  overflow-y: auto;
  height: 85vh;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.userId ? "flex-end" : "flex-start")};
  margin: 10px 30px 25px;
`;

const MessageText = styled.div`
  background-color: ${(props) => (props.userId ? "#e4e4e4" : "#5ac467")};
  color: ${(props) => (props.userId ? "#323232" : "#ffffff")};
  border-radius: 20px;
  padding: 15px 20px;
  max-width: 60%;
  line-height: 1.6;
`;

const TimeStamp = styled.div`
  margin: 10px 5px;
  font-size: 13px;
  color: #888;
`;

const InputContainer = styled.div`
  width: 80%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  right: -2.5vw;
  padding: 10px;
  overflow: hidden;
`;

const InputMessage = styled.input`
  width: 80%;
  height: 80%;
  padding: 0 20px;
  background-color: #ededed;
  border-radius: 30px;
  font-size: 14px;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  width: 10%;
  height: 80%;
  background-color: #5ac467;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  margin-left: 15px;
`;

const MessengerChat = ({ chats, selectedUser, user, channel_id }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(chats);
  const [nc, setNc] = useState(null); // nc를 상태로 관리

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setMessages(chats);
  }, [chats]);

  const sortedMessages = messages.sort(
    (a, b) => new Date(a.sended_at) - new Date(b.sended_at)
  );
  console.log("chat에 관한 data", chats);
  console.log("user:", user);
  console.log("chat:", chats);
  console.log("selectedUser:", selectedUser);
  console.log("userid:", user.id);
  console.log("project_id", user.project_id);
  console.log("channel_id:", channel_id);

  useEffect(() => {
    if (!nc) {
      const chatInstance = new ncloudchat.Chat();
      chatInstance.initialize(user.project_id);
      setNc(chatInstance);
    }

    const connectAndSubscribe = async () => {
      if (!nc) return;
      try {
        await nc.connect({
          id: user.id,
          name: user.name,
        });
        console.log(`아이디 접속 성공:${user.id}${user.name}`);
        await nc.subscribe(channel_id);
        console.log("채널아이디 구독성공:", channel_id);
      } catch (error) {
        console.error("접속 또는 구독 중 오류 발생:", error.message);
      }
    };

    connectAndSubscribe();
  }, [nc, user.id, user.name, channel_id]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!nc) {
      console.error("nc가 초기화되지 않았습니다.");
      return;
    }

    try {
      await nc.sendMessage(channel_id, {
        type: "text",
        message: inputText,
      });
      setInputText("");
    } catch (error) {
      console.error("메시지 보내는거 실패했다.", error.message);
    }
  };

  console.log("입력한 메시지 값:", inputText);
  const formatSendedAt = (sendedAt) => {
    const date = new Date(sendedAt);
    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "오후" : "오전";
    hour = hour % 12 || 12;

    return `${ampm} ${hour}:${minute}`;
  };
  console.log("이건 srotedMessages", sortedMessages);

  return (
    <div>
      <MessagesWrapper>
        {sortedMessages.map((message, index) => (
          <MessageContainer key={index} userId={message.sender.id === user.id}>
            <MessageText userId={message.sender.id === user.id}>
              <div style={{ fontSize: "15px", fontWeight: "bolder" }}>
                {message?.sender?.name}
              </div>
              <div ref={messagesEndRef} style={{ fontSize: "16px" }}>
                {message?.content}
              </div>
            </MessageText>
            <TimeStamp>{formatSendedAt(message?.sended_at)}</TimeStamp>
          </MessageContainer>
        ))}
      </MessagesWrapper>
      <form onSubmit={handleMessageSubmit}>
        <InputContainer>
          <InputMessage
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <SendButton>보 내 기</SendButton>
        </InputContainer>
      </form>
    </div>
  );
};

export default MessengerChat;
