import React from "react";
import LectureDayBox from "./LectureDayBox";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 80%;
  height: 220px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;
  border-radius: 30px;
`;

const getWeekDates = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const current = new Date();
  const sundayTime = current.getTime() - 86400000 * current.getDay();
  const sunday = new Date(sundayTime);

  const week = [{ date: sunday.getDate(), day: days[sunday.getDay()] }];

  for (let i = 1; i < 7; i++) {
    sunday.setDate(sunday.getDate() + 1);
    week.push({
      date: sunday.getDate(),
      day: days[sunday.getDay()],
    });
  }
  return week;
};

const LectureCalendar = ({ lectures = [] }) => {
  const weekDates = getWeekDates();

  const getEventForDay = (day) => {
    const lecturesForDay = lectures.filter(
      (lecture) => lecture.timeWeek === day
    );
    return lecturesForDay.map((lecture) => lecture.timeTitle);
  };

  return (
    <CalendarContainer>
      {weekDates.map((dayInfo, index) => {
        return (
          <LectureDayBox
            key={index}
            date={dayInfo.date}
            day={dayInfo.day}
            event={getEventForDay(dayInfo.day)}
          />
        );
      })}
    </CalendarContainer>
  );
};

export default LectureCalendar;
