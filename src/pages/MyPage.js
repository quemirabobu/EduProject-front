import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Title from "../components/Title";

const Container = styled.div`
  margin: 30px 60px;
`;

const TitleContainer = styled.div`
  padding: 20px 0px 20px 50px;
`;

const Input = styled.input`
  margin: 10px 0px 25px 0px;
  background-color: white;
  width: 415px;
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: large;
  padding-left: 15px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 10px;
  border: none;
  background-color: #171a2b;
  font-size: medium;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

/* global daum */
const loadKakaoMapScript = (callback) => {
  const script = document.createElement("script");
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.onload = () => callback();
  document.head.appendChild(script);
};

const MyPage = () => {
  const navi = useNavigate();
  const initialUserName = sessionStorage.getItem("userName");
  const initialUseType = sessionStorage.getItem("userType");
  const [id, setId] = useState("");
  const [userJoinId, setUserJoinId] = useState(""); // 부모 (Join: 자식)
  const [userId, setUserId] = useState("");
  const [userName, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userBus, setUserBus] = useState("");
  const [userAddressDetail, setUserAddressDetail] = useState("");
  const [userConsultContent, setUserConsultContent] = useState("");
  const [userSpecialNote, setUserSpecialNote] = useState("");
  const [studentInfo, setStudentinfo] = useState({});
  const [initialData, setInitialData] = useState({});

  const [courseList, setCourseList] = useState([]);
  const [couNo, setCouNo] = useState("");
  const [claName, setClaName] = useState("");

  const getCourseList = async () => {
    try {
      console.log("리스트 가져온다");
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      console.log("응답에 리스트 담겨있나?", response.data.items);
      if (response.data.items) {
        setCourseList(response.data.items);
        await getUserInfo(response.data.items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (courseListFromServer) => {
    try {
      const user = {
        userId: sessionStorage.getItem("userId"),
      };
      const userresponse = await axios.post(
        "https://eduventure.site:5443/user/getuser",
        user
      );

      const userData = userresponse.data.item;
      console.log("유저 정보 좀 보자", userData);

      if (userresponse.data && userresponse.data.item) {
        setInitialData(userData);
        setId(userData.id);
        setUserId(userData.userId);
        setCouNo(userData.couNo);

        console.log("반 리스트 있음?", courseList);

        const selectedCourse = courseListFromServer.find(
          (course) => course.couNo === userData.couNo
        );
        console.log("같은 반 번호 찾음?", selectedCourse);

        if (selectedCourse) {
          setClaName(selectedCourse.claName);
        }

        setUserType(userData.userType);
        setUsername(userData.userName);
        setUserBirth(userData.userBirth);
        setUserTel(userData.userTel);
        setUserAddress(userData.userAddress);
        setUserAddressDetail(userData.userAddressDetail);
        setUserSchool(userData.userSchool);
        setUserBus(userData.userBus);
        setUserConsultContent(userData.userConsultContent);
        setUserSpecialNote(userData.userSpecialNote);
        setUserJoinId(userData.userJoinId);
      }

      if (userresponse.data.item.userJoinId) {
        const student = {
          id: userresponse.data.item.userJoinId,
        };
        const studentresponse = await axios.post(
          "https://eduventure.site:5443/user/getstudent",
          student
        );

        if (studentresponse.data && studentresponse.data.item) {
          setStudentinfo(studentresponse.data.item);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  const changeUserId = useCallback((e) => {
    const idCheckBtn = document.getElementById("btnIdCheck");
    setUserId(e.target.value);
    idCheckBtn.disabled = false;
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const update = async () => {
        const userDTO = {
          id: id,
          userId: userId,
          userJoinId: userJoinId,
          userName: userName,
          userTel: userTel,
          userBirth: userBirth,
          couNo: couNo,
          userSchool: userSchool,
          userAddress: userAddress,
          userAddressDetail: userAddressDetail,
          userBus: userBus,
          userType: userType,
          userConsultContent: userConsultContent,
          userSpecialNote: userSpecialNote,
        };

        console.log(userDTO);

        try {
          const response = await axios.put(
            "https://eduventure.site:5443/user/update",
            userDTO
          );
          console.log(response);
          if (response.data && response.data.statusCode === 200) {
            alert("회원 정보가 수정되었습니다.");
            navi("/");
          }
        } catch (e) {
          console.log(e);
        }
      };

      update();
    },
    [
      id,
      userId,
      userJoinId,
      userName,
      userTel,
      userBirth,
      userSchool,
      couNo,
      claName,
      userAddress,
      userAddressDetail,
      userConsultContent,
      userSpecialNote,
      userBus,
      userType,
      navi,
    ]
  );

  // 주소창 클릭 이벤트
  const openAddressSearch = (e) => {
    e.preventDefault();
    loadKakaoMapScript(() => {
      new daum.Postcode({
        oncomplete: function (data) {
          setUserAddress(data.address); // 주소 넣기
          document.querySelector("input[name=userAddressDetail]").focus(); //상세입력 포커싱
        },
      }).open();
    });
  };

  const onReset = useCallback(() => {
    setUserId(initialData.userId);
    setUsername(initialData.userName);
    setUserTel(initialData.userTel);
    setUserAddress(initialData.userAddress);
    setUserAddressDetail(initialData.userAddressDetail);
    setUserBirth(initialData.userBirth);
    setUserSchool(initialData.userSchool);
    setUserBus(initialData.userBus);
    setCouNo(initialData.couNo);

    const selectedCourse = courseList.items.find(
      (course) => course.couNo === initialData.couNo
    );
    if (selectedCourse) {
      setClaName(selectedCourse.claName);
    }

    setUserConsultContent(initialData.userConsultContent);
    setUserSpecialNote(initialData.userSpecialNote);
    setUserJoinId(initialData.userJoinId);
    setId(initialData.id);
  }, [initialData]);

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
          subtitle={
            initialUseType === "student"
              ? `${initialUserName} 학생의`
              : `${initialUserName}님의`
          }
          title="My Page"
        />
      </TitleContainer>

      <form
        id="modifyForm"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "250px",
        }}
      >
        <Container>
          <div className="label-wrapper">
            <label htmlFor="userName">이름</label>
          </div>
          <Input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            readOnly={true}
          />

          <div className="label-wrapper">
            <label htmlFor="userTel">전화번호</label>
          </div>
          <Input
            type="tel"
            id="userTel"
            name="userTel"
            value={userTel}
            onChange={(e) => setUserTel(e.target.value)}
            placeholder="숫자만 입력하세요"
          />
          <div className="label-wrapper">
            <label htmlFor={userType === "student" ? "userBirth" : "userId"}>
              {userType === "student" ? "생년월일" : "자녀 이름"}
            </label>
          </div>
          {userType === "student" ? (
            <Input
              type="date"
              display={"none"}
              id="userBirth"
              name="userBirth"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
            />
          ) : (
            <Input
              type="text"
              id="userType"
              name="userType"
              required
              value={studentInfo.userName}
              readOnly={true}
            />
          )}

          <div className="label-wrapper">
            <label htmlFor="userSchool">
              {userType === "student" ? "학교" : "자녀 학교"}
            </label>
          </div>
          {userType === "student" ? (
            <Input
              type="text"
              id="userSchool"
              name="userSchool"
              value={userSchool}
              onChange={(e) => setUserSchool(e.target.value)}
            />
          ) : (
            <Input
              type="text"
              id="userSchool"
              name="userSchool"
              value={studentInfo.userSchool}
              onChange={(e) => setUserSchool(e.target.value)}
            />
          )}
        </Container>

        <Container>
          <div className="label-wrapper">
            <label htmlFor="userId">이메일</label>
          </div>
          <Input
            type="text"
            id="userId"
            name="userId"
            required
            value={userId}
            onChange={changeUserId}
            readOnly={true}
          />
          <div className="label-wrapper">
            <label htmlFor="userAddress">주소</label>
          </div>
          {userType === "student" ? (
            <>
              <Input
                type="text"
                id="userAddress"
                name="userAddress"
                value={userAddress}
                onClick={openAddressSearch}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="주소를 검색하세요"
              />
              <div>상세 주소</div>
              <Input
                type="text"
                id="userAddressDetail"
                name="userAddressDetail"
                value={userAddressDetail}
                onChange={(e) => setUserAddressDetail(e.target.value)}
                placeholder="상세 주소를 입력하세요"
              />
            </>
          ) : (
            <>
              <Input
                type="text"
                id="userAddress"
                name="userAddress"
                value={studentInfo.userAddress}
                onClick={openAddressSearch}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="주소를 검색하세요"
              />
              <div>상세 주소</div>
              <Input
                type="text"
                id="userAddressDetail"
                name="userAddressDetail"
                value={studentInfo.userAddressDetail}
                onChange={(e) => setUserAddressDetail(e.target.value)}
                placeholder="상세 주소를 입력하세요"
              />
            </>
          )}

          <div className="label-wrapper">
            <label htmlFor="claName">반</label>
          </div>
          <select
            name="selectclass"
            style={{
              margin: "10px 200px 25px 0px",
              width: "415px",
              height: "40px",
              borderRadius: "10px",
              border: "none",
              fontSize: "large",
              whiteSpace: "pre-line",
              textAlign: "center",
            }}
            value={claName}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setClaName(e.target.value);
              setCouNo(selectedOption.id);
            }}
          >
            <option value="" disabled selected>
              반 선택
            </option>
            {courseList.map((course, index) => (
              <option key={index} value={course.claName} id={course.couNo}>
                {course.claName}
              </option>
            ))}
          </select>

          <div
            style={{
              marginTop: "35px",
              width: "415px",
              height: "40px",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button type="button" onClick={onReset}>
              되돌리기
            </Button>
            <Button type="submit">수정하기</Button>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default MyPage;
