import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";
import styled from "styled-components";

const styles = {
  container: {
    width: "100vw",
    height: "calc(100vh - 50px)",
    overflow: "hidden",
    backgroundColor: "#5AC467",
    position: "relative",
  },
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
  button: {
    fontSize: "20px",
    width: "120px",
    height: "50px",
    backgroundColor: "#5AC467",
    borderRadius: "25px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#5AC467",
    },
    mr: 1,
  },
};

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-right: 40px;
  justify-content: flex-end;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 660px;
  margin: 63px auto 0 auto;
  background: #ececec;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 97%;
`;

const StyledTitle = styled.div`
  width: 7%;
  height: ${({ customHeight }) => customHeight || "45px"};
  background-color: #7f7f7f;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  margin-left: 20px;
  width: 93%;
  height: 45px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  white-space: pre-line;
  padding: 20px;
`;

const StyledSelect = styled.select`
  margin-left: 20px;
  width: 93%;
  height: 45px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  white-space: pre-line;
  padding: 0 20px;
`;

const StyledTextArea = styled.textarea`
  margin-left: 20px;
  width: 93%;
  height: 350px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  padding: 20px;
  resize: none;
`;

const NoticeUpdate = () => {
  const navi = useNavigate();
  const { noticeNo } = useParams();
  const id = sessionStorage.getItem("id");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [claName, setClaName] = useState("");
  const [date, setDate] = useState("");
  const [courseList, setCourseList] = useState([]);

  /** 반 목록 불러오는 함수 */
  const getCourseList = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      console.log("반 목록 왔다", response);
      if (response.data && response.data.items) {
        setCourseList(response.data.items);
      }
    } catch (e) {
      console.log("반 목록 안옴?", e);
    }
  };

  /** 공지사항 세부 내용 불러오는 함수 */
  const getNoticeInfo = async (noticeNo) => {
    try {
      console.log("noticeNo?", noticeNo);
      const response = await axios.get(
        `https://eduventure.site:5443/notice/getnotice/${noticeNo}`
      );
      console.log("개별 공지사항 왔다", response);
      if (response.data && response.data.item) {
        const userData = response.data.item;
        setNoticeTitle(userData.noticeTitle);
        setNoticeContent(userData.noticeContent);
        setClaName(userData.claName);
        setDate(userData.date);
      }
    } catch (e) {
      console.log("개별 공지사항 안옴?", e);
    }
  };

  useEffect(() => {
    getNoticeInfo(noticeNo);
    getCourseList();
  }, []);

  /** 공지사항 수정 요청하는 함수 */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const update = async () => {
        const noticeDTO = {
          noticeNo: noticeNo,
          id: id,
          claName: claName,
          noticeTitle: noticeTitle,
          noticeContent: noticeContent,
          date: date,
        };
        try {
          const response = await axios.put(
            "https://eduventure.site:5443/notice/noticeupdate",
            noticeDTO,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (response.data && response.data.statusCode === 200) {
            alert("공지사항 수정이 완료되었습니다.");
            navi("/admin/notice");
          }
        } catch (e) {
          console.log("공지사항 수정 실패?", e);
        }
      };
      update();
    },
    [noticeNo, claName, id, noticeTitle, noticeContent, date]
  );

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <Title
          subtitle="EduVenture"
          title="수업 공지사항 수정"
          color="#ffffff"
        />
      </div>
      <form onSubmit={onSubmit}>
        <ContentContainer>
          <InputContainer>
            <StyledTitle>반</StyledTitle>
            <StyledSelect
              name="selectclass"
              value={claName}
              onChange={(e) => setClaName(e.target.value)}
            >
              <option value="" disabled>
                반 선택
              </option>
              {courseList.map((course, index) => (
                <option key={index} value={course.claName}>
                  {course.claName}
                </option>
              ))}
            </StyledSelect>
          </InputContainer>
          <InputContainer>
            <StyledTitle>날짜</StyledTitle>
            <StyledInput
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <StyledTitle>제목</StyledTitle>
            <StyledInput
              type="text"
              id="noticeTitle"
              name="noticeTitle"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
            />
          </InputContainer>
          <InputContainer>
            <StyledTitle style={{ height: "350px" }}>내용</StyledTitle>
            <StyledTextArea
              type="text"
              id="noticeContent"
              name="noticeContent"
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요"
            />
          </InputContainer>
          <ButtonContainer>
            <Button sx={styles.button} onClick={() => navi("/admin/notice")}>
              취소하기
            </Button>
            <Button sx={styles.button} type="submit" onClick={onSubmit}>
              수정하기
            </Button>
          </ButtonContainer>
        </ContentContainer>
      </form>
    </div>
  );
};

export default NoticeUpdate;
