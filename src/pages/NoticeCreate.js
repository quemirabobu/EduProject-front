import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const NoticeCreate = () => {
  const navi = useNavigate();
  const id = sessionStorage.getItem("id");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [claName, setClaName] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [courseList, setCourseList] = useState([]);

  const getCourseList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.59:8081/course/course-list"
      );
      console.log("반 목록 가져왔다", response);
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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const join = async () => {
        const noticeDTO = {
          id: id,
          claName: claName,
          noticeTitle: noticeTitle,
          noticeContent: noticeContent,
          date: date,
        };
        try {
          const response = await axios.post(
            "http://192.168.0.59:8081/notice/createnotice",
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
            console.log("공지사항 등록 완료", response);
            alert("공지사항 등록이 완료되었습니다.");
            navi("/admin/notice");
          }
        } catch (e) {
          alert("공지사항 등록에 실패하였습니다.");
          navi("/admin/notice");
          console.log("공지사항 등록 실패", e);
        }
      };
      join();
    },
    [id, claName, noticeTitle, noticeContent, date]
  );

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <Title
          subtitle="EduVenture"
          title="수업 공지사항 등록"
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
            <Button sx={styles.button}>취소하기</Button>
            <Button sx={styles.button} type="submit">
              등록하기
            </Button>
          </ButtonContainer>
        </ContentContainer>
      </form>
    </div>
  );
};

export default NoticeCreate;
