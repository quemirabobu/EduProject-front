import React, { useEffect, useState } from "react";
import NoticeListItem from "./NoticeListItem";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 660px;
  margin: 20px auto 0 auto;
  background: #ececec;
  border-radius: 20px 20px 0 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
`;

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);

  const getNoticeList = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/notice/notice-list"
      );
      console.log("공지사항 들어왔다", response);
      if (response.data && response.data.items) {
        setNoticeList(response.data.items);
      }
    } catch (e) {
      console.log("공지사항 안들어옴?", e);
    }
  };

  const deleteNotice = async (noticeNo) => {
    try {
      await axios.delete(
        `https://eduventure.site:5443/notice/delete/${noticeNo}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      getNoticeList();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <Container>
      {noticeList.map((notice, index) => (
        <NoticeListItem key={index} notice={notice} onDelete={deleteNotice} />
      ))}
    </Container>
  );
};

export default NoticeList;
