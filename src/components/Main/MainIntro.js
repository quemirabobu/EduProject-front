import React from "react";
import styled from "styled-components";
import ChatBot from "./MainChatBot/ChatBot";

const IntroContainer = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 130px);
`;

const TextContainer = styled.div`
  margin-left: auto;
  margin-top: 200px;
`;

const TitleBox = styled.h1`
  color: #5ac467;
  font-size: 4vw;
  text-align: right;
  transform: translate(-20%, 1em);
`;

const ContentBox = styled.h6`
  margin: 3vw 0;
  font-size: 2vw;
  font-weight: normal;
  text-align: right;
  transform: translate(-20%, 3em);
`;

const MainIntro = () => {
  const userType = sessionStorage.getItem("userType");
  const userName = sessionStorage.getItem("userName");
  const childName = sessionStorage.getItem("childName");

  let greeting;
  let additionalContent;

  if (userType === "student") {
    greeting = `${userName}님 안녕하세요.`;
    additionalContent = `${userName}님의 종합 관리 화면입니다.`;
  } else if (userType === "parent") {
    greeting = `${userName} 학부모님 안녕하세요.`;
    additionalContent = `${childName} 학생의 종합 관리 화면입니다.`;
  } else if (userType === "admin") {
    greeting = `${userName} 관리자님 안녕하세요.`;
  } else if (userType === "teacher") {
    greeting = `${userName} 선생님 안녕하세요.`;
  } else {
    greeting = "간단한 상담을 원하시면 좌측 하단의 챗봇을";
    additionalContent = "자세한 상담을 원하시면 전화 상담을 주세요.";
  }

  return (
    <IntroContainer>
      <TextContainer>
        <TitleBox>
          꿈을 위한 도약, <span style={{ fontSize: "5vw" }}>EduVenture</span>
        </TitleBox>
        <ContentBox>{greeting}</ContentBox>
        {additionalContent && <ContentBox>{additionalContent}</ContentBox>}
      </TextContainer>
      <ChatBot />
    </IntroContainer>
  );
};

export default MainIntro;
