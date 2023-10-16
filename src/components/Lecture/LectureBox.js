import React from "react";
import styled from "styled-components";

const BoxContainer = styled.div`
  width: 80%;
  height: 250px;
  margin: 80px auto 0;
  position: relative;
  background: #f2f2f2;
  border-radius: ${(props) => props.$borderRadius || "30px"};
`;

const Title = styled.p`
  position: absolute;
  top: 3%;
  left: 4%;
  font-size: 30px;
  font-weight: 700;
  color: #171a2b;
`;

const Content = styled.p`
  position: absolute;
  top: 28%;
  left: 4%;
  right: 4%;
  bottom: 5%;
  font-size: 20px;
  color: #171a2b;
  overflow-y: auto;
  max-height: 60%;
  width: 92%;
`;

const Span = styled.span`
  display: block;
  padding: 10px 0;
`;

const LectureBox = ({ title, content, $borderRadius }) => {
  return (
    <BoxContainer $borderRadius={$borderRadius}>
      <Title>{title}</Title>
      <Content>
        {content.map((line, index) => (
          <Span key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </Content>
    </BoxContainer>
  );
};

export default LectureBox;
