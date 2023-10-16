import React, { useEffect, useState } from "react";
import AttendCard from "../components/Attend/AttendCard";
import Title from "../components/Title";
import AttendCalendar from "../components/Attend/AttendCalendar";
import axios from "axios";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

const Attend = () => {
  const [attendance, setAttendance] = useState([]);
  const [isAttend, setIsAttend] = useState([]);
  const time = new Date();
  const month = time.getMonth() + 1;
  const today = time.getDate();

  /** 출석 여부 가져오기 함수 */
  const getIsAttend = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/attendance/main",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      if (response.data && response.data.item) {
        setIsAttend(response.data.item);
        console.log("출석 여부 왔다", response);
      }
    } catch (e) {
      console.log("출석 여부 안오는데?", e);
    }
  };

  /** 출석부 가져오기 함수 */
  const getAttendance = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/attendance/attend",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      if (response.data && response.data.items) {
        setAttendance(response.data.items);
        console.log("출석부 왔다", response);
      }
    } catch (e) {
      console.log("출석부 안오는데?", e);
    }
  };

  useEffect(() => {
    getIsAttend();
    getAttendance();
  }, []);

  const reloadData = () => {
    getIsAttend();
    getAttendance();
  };

  return (
    <div>
      <div style={{ height: "600px", background: "#F9F9F9" }}>
        <div style={styles.titleContainer}>
          <Title subtitle={`${month}월 ${today}일`} title="출석 여부" />
        </div>
        <AttendCard isAttend={isAttend} reloadData={reloadData} />
      </div>
      <div style={{ height: "800px", background: "#DADADA" }}>
        <div style={styles.titleContainer}>
          <Title subtitle={`${month}월`} title="출석부" />
        </div>
        <AttendCalendar attendance={attendance} />
      </div>
    </div>
  );
};
export default Attend;
