import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Title from "../components/Title";

const TitleContainer = styled.div`
  padding: 20px 0px 0px 50px;
`;

const PwChkContainer = styled.div`
  display: flex;
  justify-content: center;
  alignitems: center;
`;

const InputBlock1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 70px 0 0 0;
`;

const InputBlock2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 30px 0 30px;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0px;
  left: 80px;
  font-weight: 600;
  font-size: 18px;
`;

const StyledInput = styled.input`
  margin-top: 30px;
  background-color: white;
  width: 415px;
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: large;
  padding-left: 15px;
`;

const StyledButton = styled.button`
  width: 110px;
  height: 45px;
  border: none;
  background-color: #171a2b;
  font-size: medium;
  color: white;
  border-radius: 25px;
  cursor: pointer;
`;

function ChangePassword() {
  const navi = useNavigate();
  const [pwCheck, setPwCheck] = useState(false);
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userPw, setUserPw] = useState("");
  const [pwValidation, setPwValidation] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!pwValidation) {
        alert("not valid password");
        return;
      }

      if (!pwCheck) {
        alert("not matched password");
        return;
      }

      const update = async () => {
        const userDTO = {
          id: sessionStorage.getItem("id"),
          userPw: userPw,
        };
        try {
          const response = await axios.put(
            "https://eduventure.site:5443/user/updatepassword",
            userDTO
          );
          console.log(response);
          if (response.data && response.data.statusCode === 200) {
            alert("비밀번호가 수정되었습니다.");
            navi("/");
          }
        } catch (e) {
          console.log(e);
        }
      };

      update();
    },
    [userPw, pwCheck, pwValidation, navi]
  );

  const changeUserPwCheck = useCallback((e) => {
    setUserPwCheck(e.target.value);
  }, []);

  useEffect(() => {
    const pwCheckResult = document.getElementById("pwCheckResult");

    if (userPwCheck === userPw) {
      pwCheckResult.style.color = "#5AC467";
      pwCheckResult.textContent = "비밀번호가 일치합니다.";
      setPwCheck(true);
    } else {
      pwCheckResult.style.color = "#FE2F1A";
      pwCheckResult.textContent = "비밀번호가 일치하지 않습니다.";
      setPwCheck(false);
    }
  }, [userPw, userPwCheck]);

  useEffect(() => {
    const pwValidationTag = document.getElementById("pwValidation");

    if (validatePassword(userPw)) {
      setPwValidation(true);
      pwValidationTag.style.display = "none";
    } else {
      setPwValidation(false);
      pwValidationTag.style.display = "block";
    }
  }, [userPw]);

  const changeUserPw = useCallback((e) => {
    setUserPw(e.target.value);
  }, []);

  const validatePassword = (character) => {
    return /^.{1,}$/.test(character);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
        overflow: "hidden",
        backgroundColor: "#e2e2e2",
        position: "relative",
      }}
    >
      <TitleContainer>
        <Title
          subtitle={`${sessionStorage.getItem("userName")}님의`}
          title="비밀번호 수정"
        />
      </TitleContainer>

      <PwChkContainer>
        <form id="modifyForm" onSubmit={onSubmit}>
          <p style={{ fontSize: "25px" }}>
            소중한 개인정보 보호를 위해{" "}
            <span
              style={{
                fontSize: "30px",
                color: "#5AC467",
                fontWeight: "bold",
              }}
            >
              비밀번호를 변경
            </span>
            해주세요.
          </p>

          <InputBlock1>
            <StyledLabel htmlFor="userPw">비밀번호 변경</StyledLabel>
            <StyledInput
              type="password"
              id="userPw"
              name="userPw"
              required
              value={userPw}
              onChange={changeUserPw}
            />
            <p id="pwValidation" style={{ textAlign: "center" }}>
              영문자, 숫자, 특수문자 조합의 9자리 이상으로 설정해주세요.
            </p>
          </InputBlock1>

          <InputBlock2>
            <StyledLabel htmlFor="userPwCheck">비밀번호 확인</StyledLabel>
            <StyledInput
              type="password"
              id="userPwCheck"
              name="userPwCheck"
              required
              value={userPwCheck}
              onChange={changeUserPwCheck}
            />
            <p id="pwCheckResult" style={{ textAlign: "center" }} />
          </InputBlock2>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <StyledButton type="reset">취소하기</StyledButton>
            <StyledButton type="submit">수정하기</StyledButton>
          </div>
        </form>
      </PwChkContainer>
    </div>
  );
}

export default ChangePassword;
