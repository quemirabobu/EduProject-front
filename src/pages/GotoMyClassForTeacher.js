import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function GotoMyClassForTeacher() {
  const navi = useNavigate();

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [courseList, setCourseList] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseuser = await axios.post(
          `https://eduventure.site:5443/user/getuserbytoken`,
          {},
          {
            // const response = await axios.post(`https://eduventure.site:5443/quiz/board/${boardNo}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        console.log(responseuser);
        if (responseuser.data && responseuser.data.item) {
          setUser(responseuser.data.item);
          setId(responseuser.data.item.id);
          setUserType(responseuser.data.item.userType);
          setUserName(responseuser.data.item.userName);
          console.log(responseuser.data.item);
          console.log(responseuser.data.item.userName);
          console.log(responseuser.data.item.id);
          console.log("위 둘은 로그인한사람의 이름, 아이디번호");
          console.log("이것이 토큰으로 불러온 사람의 데이터이다.");

          const getClasses = async () => {
            try {
              const response = await axios.get(
                `https://eduventure.site:5443/course/course/${responseuser.data.item.id}`,
                {}, // 요청 본문에 boardNo를 넣어서 보냅니다.
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "ACCESS_TOKEN"
                    )}`,
                  },
                }
              );
              console.log(response);
              if (response.data && response.data.items) {
                console.log("getUserQuizHistory한거 가져온다");
                console.log(response.data.items);
                setCourseList(response.data.items);
              }
            } catch (e) {
              console.log(e);
            }
          };
          getClasses();
        }
      } catch (e) {
        console.log("토큰으로 사람 불러오는거 실패함");
        console.log(e);
      }
    };

    getUser();
    console.log("이게 코스리스트");

    console.log(courseList);
    console.log("이게 코스리스트");
  }, []);

  const handleClassSelection = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleEnterClass = () => {
    if (selectedClass) {
      const url = `https://101.79.11.141:9001/demos/dashboard/canvas-designer.html?open=true&sessionid=${selectedClass}&publicRoomIdentifier=dashboard&userFullName=${user.userName}`;
      window.location.href = url;
    } else {
      alert("수업을 선택해주세요.");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          paddingTop: "40px",
          paddingLeft: "70px",
        }}
      >
        <h1>1:1 과외수업 공부방 만들기</h1>
      </div>

      <div
        id={"selectplace"}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <select
          onChange={handleClassSelection}
          style={{
            height: "80px",
            width: "300px",
            fontSize: "50px",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <option value="">수업 선택하기</option>
          {courseList &&
            courseList.map((item, index) => (
              <option key={index} value={item.claName}>
                {item.claName}
              </option>
            ))}
        </select>

        <button
          style={{
            marginLeft: "10px",
            height: "80px",
            width: "100px",
            fontSize: "40px",
            borderRadius: "13px",
            fontWeight: "bold",
          }}
          onClick={handleEnterClass}
        >
          입장
        </button>
      </div>
    </div>
  );
}

export default GotoMyClassForTeacher;
