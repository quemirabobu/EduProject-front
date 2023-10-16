import React, { useState, useCallback, useEffect } from "react";
import styled from "../components/StudentUpdate/StudentUpdateStyled.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

/* global daum */
const loadKakaoMapScript = (callback) => {
  const script = document.createElement("script");
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.onload = () => callback();
  document.head.appendChild(script);
};

const StudentUpdate = () => {
  const { id } = useParams();

  const navi = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [studentTel, setStudentTel] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [busNum, setBusNum] = useState("");
  const [counsel, setCounsel] = useState("");
  const [significant, setSignificant] = useState("");
  const [parentId, setParentId] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentTel, setParentTel] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [school, setSchool] = useState("");

  const [courseList, setCourseList] = useState([]);
  const [couNo, setCouNo] = useState("");
  const [claName, setClaName] = useState("");

  /** 반 목록 가져오기 함수 */
  const getCourseList = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      console.log("반 목록 왔다", response.data);
      setCourseList(response.data.items);
      await getUserInfo(response.data.items);
    } catch (error) {
      console.error("반 목록 안오는데?", error);
    }
  };

  /** 사용자 가져오기 함수 */
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://eduventure.site:5443/user/user/${id}`
      );
      console.log("사용자 왔다", response);

      if (response.data && response.data.item) {
        const userData = response.data.item;

        setStudentName(userData.userName);
        setStudentTel(userData.userTel);
        setStudentEmail(userData.userId);
        setAddress(userData.userAddress);
        setDetailAddress(userData.userAddressDetail);
        setBusNum(userData.userBus);
        setCounsel(userData.userConsultContent);
        setSignificant(userData.userSpecialNote);
        setBirth(userData.userBirth);
        setSchool(userData.userSchool);
        setParentId(userData.parentDTO.id);
        setParentName(userData.parentDTO.userName);
        setParentTel(userData.parentDTO.userTel);
        setParentEmail(userData.parentDTO.userId);
        setCouNo(userData.courseDTO.couNo);
        setClaName(userData.courseDTO.claName);
      }
    } catch (e) {
      console.log("사용자 안오는데?", e);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  const cancelJoin = (e) => {
    e.preventDefault();
    if (window.confirm("수정을 취소할까요?")) {
      navi(-1);
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const update = async () => {
        const userDTO = {
          couNo: couNo,
          userId: studentEmail,
          userName: studentName,
          userTel: studentTel,
          userBus: busNum,
          userBirth: birth,
          userSchool: school,
          userAddress: address,
          userAddressDetail: detailAddress,
          userType: "student",
          userConsultContent: counsel,
          userSpecialNote: significant,
        };
        const parentDTO = {
          couNo: couNo,
          userId: parentEmail,
          userName: parentName,
          userTel: parentTel,
          userBus: busNum,
          userAddress: address,
          userAddressDetail: detailAddress,
          userType: "parent",
          userConsultContent: counsel,
          userSpecialNote: significant,
        };
        const joinDTO = {
          userDTO,
          parentDTO,
        };
        try {
          await axios.put(
            "https://eduventure.site:5443/user/admin/update",
            joinDTO
          );
          alert("정보가 수정되었습니다.");
          navi("/admin/student");
        } catch (e) {
          alert("수정을 실패하였습니다.");
          console.log("수정 실패?", e);
        }
      };
      update();
    },
    [
      id,
      studentEmail,
      studentTel,
      studentName,
      birth,
      school,
      address,
      detailAddress,
      counsel,
      significant,
      parentEmail,
      parentTel,
      parentName,
      busNum,
      couNo,
    ]
  );

  /** 주소창 클릭 이벤트 */
  const openAddressSearch = (e) => {
    e.preventDefault();
    loadKakaoMapScript(() => {
      new daum.Postcode({
        oncomplete: function (data) {
          setAddress(data.address);
          if (document.querySelector("input[name=userAddressDetail]")) {
            document.querySelector("input[name=userAddressDetail]").focus();
          }
        },
      }).open();
    });
  };

  return (
    <>
      <div
        style={{
          height: "auto",
          overflow: "hidden",
          backgroundColor: "#e0e0e0",
          display: "flex",
          position: "relative",
        }}
      >
        <div style={styles.titleContainer}>
          <Title
            subtitle="EduVenture"
            title="학생 조회 및 수정"
            width="400px"
          />
        </div>

        <form className={styled.joinForm} onSubmit={onSubmit}>
          <div className={styled.joinContent1}>
            <label>학생 성명</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              readOnly={true}
            ></input>

            <label>생년월일</label>
            <input
              type="date"
              id="birth"
              name="birth"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            ></input>

            <label>학교</label>
            <input
              type="text"
              id="school"
              name="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            ></input>

            <label>학생 연락처</label>
            <input
              type="studentTel"
              id="studentTel"
              name="studentTel"
              value={studentTel}
              onChange={(e) => setStudentTel(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>

            <label>학생 Email</label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              value={studentEmail}
              readOnly={true}
            ></input>

            <label>학부모 성함</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              readOnly={true}
            ></input>

            <label>학부모 연락처</label>
            <input
              type="tel"
              id="parentTel"
              name="parentTel"
              value={parentTel}
              onChange={(e) => setParentTel(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>

            <label>학부모 Email</label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              value={parentEmail}
              readOnly={true}
            ></input>

            <label>차량</label>
            <input
              type="number"
              id="busNum"
              name="busNum"
              value={busNum}
              onChange={(e) => setBusNum(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>
          </div>

          <div className={styled.joinContent2}>
            <label>상담 내용</label>
            <textarea
              className={styled.counsel}
              id="counsel"
              name="counsel"
              value={counsel}
              onChange={(e) => setCounsel(e.target.value)}
            ></textarea>

            <label>특이 사항</label>
            <textarea
              className={styled.significant}
              id="significant"
              name="significant"
              value={significant}
              onChange={(e) => setSignificant(e.target.value)}
            ></textarea>

            <label>반 이름</label>
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
                console.log(selectedOption);
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

            <label>주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onClick={openAddressSearch}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 검색하세요"
            />

            <label>상세 주소</label>
            <input
              type="text"
              id="detailAddress"
              name="detailAddress"
              value={detailAddress}
              placeholder="상세 주소를 입력하세요"
              onChange={(e) => setDetailAddress(e.target.value)}
            ></input>

            <div className={styled.joinBtns}>
              <button onClick={cancelJoin}>취소하기</button>
              <button type="submit">수정하기</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentUpdate;
