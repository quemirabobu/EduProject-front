import React, { useState } from "react";
import ChatBotButton from "./ChatBotButton";
import ChatBotWindow from "./ChatBotWindow/ChatBotWindow";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const formatTime = () => {
  const time = new Date();
  let hour = time.getHours();
  const minute = String(time.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "오후" : "오전";
  hour = hour % 12 || 12;
  hour = String(hour).padStart(2, "0");

  return `${ampm} ${hour}:${minute}`;
};

const ChatBot = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    const newRoomId = Math.floor(Math.random() * 1000000).toString();
    setRoomId(newRoomId);

    let socket = new SockJS("https://eduventure.site:5443/ws");
    const newStompClient = Stomp.over(() => socket);
    setStompClient(newStompClient);

    newStompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      setConnected(true);

      // 메시지를 보내는 방식을 handleSendMessage 함수와 유사하게 설정
      if (newStompClient && newRoomId) {
        newStompClient.send(
          `/app/sendMessage/${newRoomId}`,
          {},
          JSON.stringify("입장")
        );
      }
    });
  };

  const handleWindow = () => {
    connect();
    setShowWindow(!showWindow);
  };

  return (
    <>
      <ChatBotButton onClick={handleWindow} />
      {showWindow && (
        <ChatBotWindow
          onClose={handleWindow}
          stompClient={stompClient}
          roomId={roomId}
          connected={connected}
        />
      )}
    </>
  );
};

export default ChatBot;
