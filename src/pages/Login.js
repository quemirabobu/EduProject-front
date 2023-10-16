import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/Login/LoginStyled.module.css";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const login = async () => {
        const user = {
          userId: userId,
          userPw: userPw,
        };
        let response;
        try {
          response = await axios.post(
            "https://eduventure.site:5443/user/login",
            user
          );
          console.log();
          if (response.data && response.data.item.token) {
            alert(`${response.data.item.userName}님 환영합니다.`);
            sessionStorage.setItem("ACCESS_TOKEN", response.data.item.token);
            sessionStorage.setItem("id", response.data.item.id);
            sessionStorage.setItem("userId", response.data.item.userId);
            sessionStorage.setItem("userName", response.data.item.userName);
            sessionStorage.setItem("userType", response.data.item.userType);
            sessionStorage.setItem("userBus", response.data.item.userBus);

            if (response.data.item.userJoinId) {
              const student = {
                id: response.data.item.userJoinId,
              };

              const studentresponse = await axios.post(
                "https://eduventure.site:5443/user/getstudent",
                student
              );

              if (
                studentresponse.data &&
                studentresponse.data.item &&
                studentresponse.data.item.userName
              ) {
                response.data.item.userType === "student"
                  ? sessionStorage.setItem(
                      "parentName",
                      studentresponse.data.item.userName
                    )
                  : sessionStorage.setItem(
                      "childName",
                      studentresponse.data.item.userName
                    );
              }
            }

            setIsLogin(true);
            navigate("/");
          }
        } catch (e) {
          console.log(e);
          console.log("응답 실패", response);
          if (e.response && e.response.data.errorMessage === "wrong pw") {
            alert("비밀번호가 틀렸습니다.");
            return;
          } else if (
            e.response &&
            e.response.data.errorMessage === "id not exist"
          ) {
            alert("아이디가 존재하지 않습니다.");
            return;
          } else {
            alert("알 수 없는 오류가 발생했습니다.");
            return;
          }
        }
      };
      login();
    },
    [userId, userPw, navigate, setIsLogin]
  );

  const changeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const changeUserPw = useCallback((e) => {
    setUserPw(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={userId}
            onChange={changeUserId}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={userPw}
            onChange={changeUserPw}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" onClick={() => navigate(-1)}>
              뒤로 가기
            </button>
            <button type="submit">로그인</button>
          </div>
        </form>
        <div
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link to="/admin/join">선생님 혹은 관리자이신가요?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
