import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const styles = {
  container: {
    display: "flex",
    width: "100%",
  },
  cardContainer: {
    filter: "drop-shadow(0px 0px 5px rgba(0,0,0,0.2))",
  },
  header: {
    width: 220,
    height: 65,
    borderRadius: "30px 30px 0 0",
    background: "#4A4F6B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#ffffff",
  },
  body: {
    width: 220,
    height: 75,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    color: "#171a2b",
  },
  textContainer: {
    display: "flex",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  timeCardContainer: {
    display: "flex",
    paddingTop: 50,
    justifyContent: "center",
    gap: 30,
  },
};

const textStyles = {
  fontSize: 20,
  letterSpacing: 1,
  color: "#171a2b",
};

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 70px;
`;

const StyledButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: #171a2b;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  cursor: pointer;
`;

const DisableButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: #676767;
  color: #8d8d8d;
  border: none;
  border-radius: 30px;
  font-size: 20px;
`;

const AttendCard = ({ isAttend: initialAttend, reloadData }) => {
  const [isAttend, setIsAttend] = useState(initialAttend);
  useEffect(() => {
    setIsAttend(initialAttend);
  }, [initialAttend]);

  const userType = sessionStorage.getItem("userType");
  const userName =
    userType === "student"
      ? sessionStorage.getItem("userName")
      : sessionStorage.getItem("childName");

  const isCourse =
    isAttend.isCourse === true
      ? " 학생의 수업일입니다."
      : " 학생의 수입일이 아닙니다.";

  const handleCheckIn = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/attendance/enter",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("입실 내용 왔다", response);
      if (response.data && response.data.item) {
        setIsAttend(response.data.item);
      }
      reloadData();
    } catch (e) {
      console.log("입실 여부 안오는데?", e);
      alert(e.response.data.errorMessage);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/attendance/exit",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      if (response.data && response.data.item) {
        setIsAttend(response.data.item);
        console.log("퇴실 내용 왔다", response);
      }
      reloadData();
    } catch (e) {
      console.log("퇴실 여부 안오는데?", e);
      alert(e.response.data.errorMessage);
    }
  };

  const buttonStatus =
    userType === "student" ? (
      !isAttend.isCourse ? (
        <DisableButton disabled>비활성화</DisableButton>
      ) : !isAttend.attStart && !isAttend.attFinish ? (
        <StyledButton onClick={handleCheckIn}>입실하기</StyledButton>
      ) : isAttend.attStart && !isAttend.attFinish ? (
        <StyledButton onClick={handleCheckOut}>퇴실하기</StyledButton>
      ) : (
        <DisableButton disabled>비활성화</DisableButton>
      )
    ) : (
      <></>
    );

  return (
    <>
      <div style={styles.textContainer}>
        <p style={textStyles}>
          오늘은 <span style={{ fontSize: 25 }}>{userName}</span>
          {isCourse}
        </p>
      </div>
      <div style={styles.timeCardContainer}>
        <div style={styles.cardContainer}>
          <div style={styles.header}>입실 시간</div>
          {isAttend.attStart ? (
            <div style={styles.body}>{isAttend.attStart.slice(11, 16)}</div>
          ) : (
            <div style={styles.body} />
          )}
        </div>
        <div style={styles.cardContainer}>
          <div style={styles.header}>퇴실 시간</div>
          {isAttend.attFinish ? (
            <div style={styles.body}>{isAttend.attFinish.slice(11, 16)}</div>
          ) : (
            <div style={styles.body} />
          )}
        </div>
      </div>
      <ButtonContainer>{buttonStatus}</ButtonContainer>
    </>
  );
};

export default AttendCard;
