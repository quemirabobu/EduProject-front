import React from "react";
import { Link, useParams } from "react-router-dom";
import NoticeList from "../components/Notice/NoticeList";
import Title from "../components/Title";

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
  styleButton1: {
    marginLeft: "110px",
    padding: "12px 30px",
    backgroundColor: "#ffffff",
    color: "#171A2B",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

const Notice = () => {
  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <Title subtitle="EduVenture" title="수업 공지사항" color="#ffffff" />
      </div>
      <Link to="/admin/notice/create">
        <button style={styles.styleButton1}>등록하기</button>
      </Link>
      <NoticeList />
    </div>
  );
};

export default Notice;
