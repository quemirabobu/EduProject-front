import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import React, {
  Outlet,
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
} from "react";
import axios from "axios";
import styled from "styled-components";

function GotoMyClassForStudent() {
  const navi = useNavigate();

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState({});
  const [Teacher, setTeacher] = useState({});
  const [couNoOfUser, setCouNoOfUser] = useState("");
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
          setCouNoOfUser(responseuser.data.item.courseDTO.couNo);

          console.log(responseuser.data.item);
          console.log(responseuser.data.item.userName);
          console.log(responseuser.data.item.id);
          console.log(responseuser.data.item.courseDTO.couNo);

          console.log("위 둘은 로그인한사람의 이름, 아이디번호");
          console.log("이것이 토큰으로 불러온 사람의 데이터이다.");

          console.log("이것은 학생의 코넘버");
          console.log(responseuser.data.item.courseDTO.couNo);

          console.log("이것은 학생의 코넘버");
          console.log("이것은 responseuser.data.item");
          console.log(responseuser.data.item);

          const getClasses = async () => {
            try {
              const response = await axios.post(
                `https://eduventure.site:5443/course/getcourse`,
                { couNo: responseuser.data.item.courseDTO.couNo }, // 요청 본문에 boardNo를 넣어서 보냅니다.
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "ACCESS_TOKEN"
                    )}`,
                  },
                }
              );
              console.log("이것ㄷ은 클래시스");

              console.log(response);
              console.log("이것ㄷ은 클래시스");
              const getTeacher = async () => {
                try {
                  const responseTeacher = await axios.post(
                    `https://eduventure.site:5443/user/getuser`,
                    { id: response.data.item.userDTO.id }, // 요청 본문에 boardNo를 넣어서 보냅니다.
                    {
                      headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                          "ACCESS_TOKEN"
                        )}`,
                      },
                    }
                  );
                  console.log(responseTeacher);
                  console.log("이것은 responseTeacher이다");
                  console.log(responseTeacher.data.item);
                  console.log("이것은 티쳐이다.");
                  if (responseTeacher.data && responseTeacher.data.item) {
                    console.log("getUserQuizHistory한거 가져온다");
                    console.log(responseTeacher.data.item);
                    setTeacher(responseTeacher.data.item);
                  }
                } catch (e) {
                  console.log(e);
                }
              };
              getTeacher();

              if (response.data && response.data.item) {
                console.log("getUserQuizHistory한거 가져온다");
                console.log(response.data.item);
                setCourse(response.data.item);
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

  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      {/*일대일수업*/}
      {/*<p>나의이름은 {userName}</p>*/}
      {/*<p>나의번호는은 {id}</p>*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          paddingTop: "40px",
          paddingLeft: "70px",
        }}
      >
        <h1>1:1 과외수업</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "solid white 2px",
            width: "300px",
            height: "200px",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              marginLeft: "46px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            나의수업 : <span style={{ color: "black" }}> {course.claName}</span>
          </p>
          <p
            style={{
              marginLeft: "46px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            수업정보 : <span style={{ color: "black" }}>{course.couMemo}</span>
          </p>
          <p
            style={{
              marginLeft: "27px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            선생님 이름 :{" "}
            <span style={{ color: "black" }}>{Teacher.userName} 선생님 </span>
          </p>
        </div>
        <button
          style={{
            height: "40px",
            width: "80px",
            marginLeft: "50px",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          onClick={() =>
            (window.location.href = `https://101.79.11.141:9001/demos/dashboard/canvas-designer.html?open=false&sessionid=${course.claName}&publicRoomIdentifier=dashboard&userFullName=${userName}

`)
          }
        >
          입장하기
        </button>
      </div>
    </div>
  );
}

export default GotoMyClassForStudent;
