import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  background: #ffffff;
  margin: 20px auto;
  display: flex;
  position: relative;
`;

const NoticeDetailLink = styled(Link)`
  font-size: 22px;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin: auto 30px;
`;

const NoticeContent = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const DateContainer = styled.div`
  margin-top: 20px;
  color: #323232;
  font-size: 15px;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 5px;

  button {
    width: 75px;
    height: 40px;
    background-color: #ececec;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 15px;
  }
`;

const NoticeListItem = ({ notice, onDelete }) => {
  const { noticeNo, claName, noticeTitle, date, noticeContent } = notice;
  const madeUser = notice.userDTO.userId;

  const deleteBoard = (e) => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      onDelete(noticeNo);
    }
  };

  return (
    <ListItem>
      <InfoContainer>
        <NoticeDetailLink to={`/admin/notice/update/${noticeNo}`}>
          [{claName}] {noticeTitle}
        </NoticeDetailLink>
        <div>
          <NoticeContent>{noticeContent}</NoticeContent>
          <DateContainer>{date}</DateContainer>
        </div>
        {madeUser === sessionStorage.getItem("userId") ? (
          <ActionButtons>
            <button>
              <Link to={`/admin/notice/update/${noticeNo}`}>수정</Link>
            </button>
            <button onClick={deleteBoard}>삭제</button>
          </ActionButtons>
        ) : (
          <></>
        )}
      </InfoContainer>
    </ListItem>
  );
};

export default NoticeListItem;
