import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../components/Join/AdminJoinStyled.module.css";

const AdminJoin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userPw, setUserPw] = useState("");
  const [chkUserPw, setChkUserPw] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(userPw === chkUserPw);
  }, [userPw, chkUserPw]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (userPw !== chkUserPw) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const memberDTO = {
        userName: userName,
        userId: userEmail,
        userPw: userPw,
        userTel: userTel,
        userType: "teacher",
      };

      try {
        await axios.post(
          "https://eduventure.site:5443/user/adminjoin",
          memberDTO
        );
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } catch (e) {
        console.error(e);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
    [userName, userEmail, userPw, userTel, chkUserPw, navigate]
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Join with EduVenture</h3>
          </div>
          <input
            type="name"
            placeholder="성명 입력"
            value={userName}
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일 입력"
            value={userEmail}
            name="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="연락처 입력"
            value={userTel}
            name="userTel"
            onChange={(e) => setUserTel(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={chkUserPw}
            onChange={(e) => setChkUserPw(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {!passwordMatch && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  justifyContent: "center",
                }}
              >
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <button type="button" onClick={() => navigate(-1)}>
              뒤로 가기
            </button>
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJoin;
