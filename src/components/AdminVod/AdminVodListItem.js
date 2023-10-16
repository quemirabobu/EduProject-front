import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ListItem = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  background: #ffffff;
  margin: 20px auto;
  display: flex;
  position: relative;
`;

const VideoFrame = styled.div`
  width: 350px;
  height: 150px;
  margin: auto 30px;
  cursor: pointer;
  display: flex;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  outline: 1px dotted #ececec;

  img.blurred {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    filter: blur(7px);
    z-index: 0;
  }

  img.original {
    height: 100%;
    margin: 0 auto;
    z-index: 1;
  }
`;

const VideoDetailLink = styled(Link)`
  font-size: 22px;
`;

const InfoContainer = styled.div`
  width: 100%;
`;

const TeacherInfo = styled.div`
  margin-top: 30px;
  font-size: 18px;
`;

const ViewsAndDate = styled.div`
  margin-top: 25px;
  color: #323232;
  font-size: 15px;
`;

// 수정 및 삭제 버튼의 스타일
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

const AdminVodListItem = ({
  id,
  lectureName,
  teacherName,
  viewCount,
  uploadDate,
  handleDeleteView,
  thumbnail,
}) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/video/detail/${id}`);
  };

  const goToUpdate = () => {
    navigate(`/admin/video/update/${id}`);
  };

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://eduventure.site:5443/vod/board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("동영상 삭제 완료");
      console.log(response.data);
      handleDeleteView(id);
    } catch (error) {
      console.error("삭제 오류", error);
    }
  };

  return (
    <ListItem>
      <VideoFrame onClick={goToDetail}>
        <img className="original" src={thumbnail} alt="Video Thumbnail" />
        <img
          className="blurred"
          src={thumbnail}
          alt="Blurred Video Thumbnail"
        />
      </VideoFrame>
      <InfoContainer>
        <VideoDetailLink to={`/video/detail/${id}`}>
          {lectureName}
        </VideoDetailLink>
        <div>
          <TeacherInfo>{teacherName} 선생님</TeacherInfo>
          <ViewsAndDate>
            조회수 {viewCount}회 | {uploadDate.slice(0, 10)}
          </ViewsAndDate>
        </div>
        {teacherName === sessionStorage.getItem("userName") ||
        sessionStorage.getItem("userType") === "admin" ? (
          <ActionButtons>
            <button onClick={goToUpdate}>수정</button>
            <button onClick={() => onDelete(id)}>삭제</button>
          </ActionButtons>
        ) : (
          <></>
        )}
      </InfoContainer>
    </ListItem>
  );
};

export default AdminVodListItem;
