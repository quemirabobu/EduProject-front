import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import LectureBox from "../components/Lecture/LectureBox";
import LectureCalendar from "../components/Lecture/LectureCalendar";
import axios from "axios";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

const getMonthWeek = () => {
  const time = new Date();
  const month = time.getMonth() + 1;
  const today = time.getDate();
  const firstDay = new Date(time.setDate(1)).getDay();
  const week = Math.ceil((today + firstDay) / 7);
  return `${month}월 ${week}주차`;
};

const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const [notices, setNotices] = useState([]);

  const getTimetable = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/timetable/student/list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("개별 시간표 들어왔다.", response);
      if (response.data && response.data.items) {
        setLectures(response.data.items);
      }
    } catch (e) {
      console.log("개별 시간표 안들어옴?", e);
    }
  };

  const getNotices = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/notice/course",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("공지사항 들어왔다", response);
      if (response.data && response.data.items) {
        setNotices(response.data.items);
      }
    } catch (e) {
      console.log("공지사항 안들어옴?", e);
    }
  };

  useEffect(() => {
    getTimetable();
    getNotices();
  }, []);

  const lectureContent = lectures
    ? lectures.map(
        (lecture) =>
          `${lecture.claName} (${lecture.timeTeacher} 선생님)의 "${lecture.timeTitle}"`
      )
    : ["이번 주 수업이 없습니다."];

  const noticeContent = notices
    ? notices.map((notice) => {
        const userType = notice.userDTO.userType;
        if (userType === "admin") {
          return `<span style="color: green; font-size: 25px; font-weight: bolder;"}>${notice.noticeTitle}</span>
          ${notice.claName}
          <br/><br/>
          ${notice.noticeContent}`;
        } else {
          return `${notice.claName} (${notice.userDTO.userName} 선생님) ${notice.noticeContent}`;
        }
      })
    : ["게시된 공지 사항이 없습니다."];

  return (
    <div
      style={{
        height: "auto",
        overflow: "hidden",
        backgroundColor: "#5AC467",
        position: "relative",
      }}
    >
      <div style={styles.titleContainer}>
        <Title subtitle={getMonthWeek()} title="수강 강좌" color="#ffffff" />
      </div>
      <LectureCalendar lectures={lectures} />
      <LectureBox title="이번 주 수업" content={lectureContent} />
      <LectureBox
        title="공지 사항"
        content={noticeContent}
        $borderRadius="30px 30px 0 0"
      />
    </div>
  );
};

export default Lecture;
