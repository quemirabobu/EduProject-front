import axios from "axios";
import { async } from "q";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChannelContext } from "../../context/context";

const Container = styled.div`
  width: 90%;
  height: 660px;
  margin: 63px auto 0 auto;
  padding: 25px 45px;
  background: #ececec;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const TitleText = styled.p`
  width: 140px;
  height: 50px;
  margin: 0 10px 0 0;
  border-radius: 30px;
  background: #7f7f7f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
`;

const SelectField = styled.select`
  width: 1500px;
  height: 50px;
  border-radius: 30px;
  border: none;
  padding-left: 25px;
  font-size: 18px;
  outline: none;
  background-color: white;
`;

const InputField = styled.input`
  width: 1500px;
  height: 50px;
  border-radius: 30px;
  border: none;
  padding-left: 25px;
  font-size: 18px;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 260px;
  gap: 20px;
`;

const StyledButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: #5ac467;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  cursor: pointer;
`;

const StreamingCreateItem = ({ classList }) => {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState(""); //강의명 상태관리
  const [couNo, setCouNo] = useState(""); //선택된 couNo 상태 관리
  const { channelInfo, setChannelInfo } = useContext(ChannelContext);

  const onClickCancel = () => {
    navigate(-1);
  };

  const onChangeCouNo = (e) => {
    setCouNo(e.target.value);
  };

  const onChangeLectureTitle = (e) => {
    setLectureTitle(e.target.value);
  };

  const isLectureTitleValid = (title) => {
    const regex = /^[가-힣a-zA-Z0-9-]{3,20}$/;
    return regex.test(title);
  };

  const createChannel = async () => {
    if (!isLectureTitleValid(lectureTitle)) {
      alert(
        '강의명은 3~20자의 한글, 영문, 숫자, 또는 "-" 로 이루어져야 합니다.'
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://eduventure.site:5443/lecture/lecture",
        {
          title: lectureTitle,
          couNo: couNo,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log(response.data.item);
      setChannelInfo(response.data.item);
      sessionStorage.setItem("channelInfo", JSON.stringify(response.data.item));
      navigate("/admin/streaming/setting");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>
        실시간 강의 <span style={{ fontWeight: "lighter" }}>생성</span>
      </h1>
      <InputBox>
        <TitleText>반</TitleText>
        <SelectField value={couNo} onChange={onChangeCouNo}>
          <option value="" disabled selected>
            반 선택
          </option>
          {classList.map((classItem, index) => (
            <option key={index} value={classItem.couNo}>
              {classItem.claName}
            </option>
          ))}
        </SelectField>
      </InputBox>
      <InputBox>
        <TitleText>강의명</TitleText>
        <InputField
          placeholder="3~20자까지의 강의명을 입력해주세요(공백안됨)"
          value={lectureTitle}
          onChange={onChangeLectureTitle}
        />
      </InputBox>
      <ButtonContainer>
        <StyledButton onClick={onClickCancel}>취소하기</StyledButton>
        <StyledButton onClick={createChannel}>채널 생성</StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default StreamingCreateItem;
