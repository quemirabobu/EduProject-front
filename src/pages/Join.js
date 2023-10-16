import React, { useState, useCallback, useEffect } from "react";
import styled from "../components/Join/JoinStyled.module.css";
import axios from "axios";
import DaumAddress from "../components/Join/daumAddress";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

const Join = () => {
  const navi = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentTel, setStudentTel] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [busNum, setBusNum] = useState("");
  const [counsel, setCounsel] = useState("");
  const [significant, setSignificant] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentTel, setParentTel] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [school, setSchool] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [chkStuEmail, setChkStuEmail] = useState(false);
  const [chkParEmail, setChkParEmail] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [couNo, setCouNo] = useState("");
  const [claName, setClaName] = useState("");

  const getCourseList = async () => {
    try {
      // const response = await axios.get('/NoticeTest.json');
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      if (response.data && response.data.items) {
        setCourseList(response.data.items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  const changeStuEmail = (e) => {
    setStudentEmail(e.target.value);
    setChkStuEmail(false);
    document.getElementById("chkStuEmailBtn").disabled = false;
  };

  const changeParEmail = (e) => {
    setParentEmail(e.target.value);
    setChkParEmail(false);
    document.getElementById("chkParEmailBtn").disabled = false;
  };

  const stuEmailChk = useCallback(
    (e) => {
      e.preventDefault();
      const chk = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/user/id-check",
            { userId: studentEmail }
          );

          if (response.data && response.data.item.idCheckMsg === "idOk") {
            alert("사용가능한 이메일입니다.");
            setChkStuEmail(true);
            e.target.disabled = true;
          } else {
            alert("중복된 이메일입니다.");
            setChkStuEmail(false);
            document.getElementById("studentEmailInput").focus();
          }
        } catch (e) {}
      };
      chk();
    },
    [studentEmail]
  );

  const parEmailChk = useCallback(
    (e) => {
      e.preventDefault();
      const chk = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/user/id-check",
            { userId: parentEmail }
          );

          if (response.data && response.data.item.idCheckMsg === "idOk") {
            alert("사용가능한 이메일입니다.");
            setChkParEmail(true);
            e.target.disabled = true;
          } else {
            alert("중복된 이메일입니다.");
            setChkParEmail(false);
            document.getElementById("parentEmailInput").focus();
          }
        } catch (e) {}
      };
      chk();
    },
    [parentEmail]
  );

  const cancelJoin = (e) => {
    e.preventDefault();
    if (window.confirm("정말 등록을 취소합니까?")) {
      navi(-1);
    }
  };

  const handleSchoolChange = (e) => {
    const value = e.target.value;
    setSchool(value);
    searchSchool(value);
  };

  const searchSchool = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setSchoolList([]); // 검색어가 없을 때 빈 리스트로 초기화
      return;
    }

    const neisUrl = "https://open.neis.go.kr/hub/schoolInfo?KEY=";
    const KEY = "73cc2130c2024a7d8935ef4bb580679d";
    const neisData = "&Type=json&pIndex=1&pSize=5&SCHUL_NM=";
    const urlSum = `${neisUrl}${KEY}${neisData}${searchTerm}`;

    try {
      const response = await axios.get(urlSum, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (
        response.data &&
        response.data.schoolInfo &&
        response.data.schoolInfo[1] &&
        response.data.schoolInfo[1].row
      ) {
        const schulNamesList = response.data.schoolInfo[1].row.map(
          (item) => item.SCHUL_NM
        );
        setSchoolList(schulNamesList);
      } else {
        setSchoolList([]);
      }
    } catch (e) {
      setSchoolList([]);
      console.log(e);
    }
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!chkStuEmail) {
        alert("학생이메일 중복확인 해주세요.");
        return;
      }

      if (!chkParEmail) {
        alert("부모이메일 중복확인 해주세요.");
        return;
      }

      const join = async () => {
        const userDTO = {
          couNo: couNo,
          userId: studentEmail,
          userPw: studentTel.slice(-4),
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
          userPw: parentTel.slice(-4),
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
          const response = await axios.post(
            "https://eduventure.site:5443/user/join",
            joinDTO
          );
          console.log("뭐 보냄?", response);
          alert("학생 등록이 완료되었습니다.");
          navi("/admin/student");
        } catch (e) {
          console.log(e);
        }
      };
      join();
    },
    [
      couNo,
      chkStuEmail,
      chkParEmail,
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
    ]
  );

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
          <Title subtitle="EduVenture" title="학생 등록" width="400px" />
        </div>

        <form className={styled.joinForm} onSubmit={onSubmit}>
          <div className={styled.joinContent1}>
            <label>학생 성명</label>
            <input
              type="text"
              name="studentName"
              onChange={(e) => setStudentName(e.target.value)}
            ></input>

            <label>생년월일</label>
            <input
              type="date"
              name="birth"
              onChange={(e) => setBirth(e.target.value)}
            ></input>

            <label>학교</label>

            <input
              type="text"
              name="school"
              value={school}
              onChange={handleSchoolChange}
              list="school-list"
              autoComplete="false"
              className={styled.searchSchoolInput}
            ></input>
            <datalist id="school-list">
              {schoolList.map((schoolInfo, index) => (
                <option key={index} value={schoolInfo} />
              ))}
            </datalist>

            <label>학생 연락처</label>
            <input
              type="tel"
              name="studentTel"
              onChange={(e) => setStudentTel(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>

            <label>학생 Email</label>
            <div className={styled.emailDiv}>
              <input
                type="email"
                name="studentEmail"
                onChange={changeStuEmail}
                id="studentEmailInput"
              ></input>
              <button
                className={styled.addressBtn}
                id="chkStuEmailBtn"
                onClick={stuEmailChk}
              >
                중복 확인
              </button>
            </div>

            <label>학부모 성함</label>
            <input
              type="text"
              name="parentName"
              onChange={(e) => setParentName(e.target.value)}
            ></input>

            <label>학부모 연락처</label>
            <input
              type="tel"
              name="parentTel"
              onChange={(e) => setParentTel(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>

            <label>학부모 Email</label>
            <div className={styled.emailDiv}>
              <input
                type="email"
                name="parentEmail"
                onChange={changeParEmail}
                id="parentEmailInput"
              ></input>
              <button
                className={styled.addressBtn}
                id="chkParEmailBtn"
                onClick={parEmailChk}
              >
                중복 확인
              </button>
            </div>

            <label>차량</label>
            <input
              type="number"
              name="busNum"
              onChange={(e) => setBusNum(e.target.value)}
              placeholder="숫자만 입력하세요"
            ></input>
          </div>

          <div className={styled.joinContent2}>
            <label>상담 내용</label>
            <textarea
              className={styled.counsel}
              name="counsel"
              onChange={(e) => setCounsel(e.target.value)}
            ></textarea>

            <label>특이 사항</label>
            <textarea
              className={styled.significant}
              name="significant"
              onChange={(e) => setSignificant(e.target.value)}
            ></textarea>

            <label>반</label>
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

            <label>주소</label>
            <DaumAddress setAddress={setAddress} />

            <label>상세 주소</label>
            <input
              type="text"
              name="detailAddress"
              placeholder="상세 주소를 입력하세요"
              onChange={(e) => setDetailAddress(e.target.value)}
            ></input>

            <div className={styled.joinBtns}>
              <button onClick={cancelJoin}>취소하기</button>
              <button type="submit">등록하기</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Join;
