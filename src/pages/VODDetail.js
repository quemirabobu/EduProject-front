import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import VODSection from "../components/VODDetail/VODSection";
import ChatSection from "../components/VODDetail/ChatSection";
import axios from "axios";

const styles = {
  container: {
    width: "100vw",
    height: "auto",
    overflow: "hidden",
    backgroundColor: "#D2D2D2",
    position: "relative",
  },
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
};

const VODDetail = () => {
  const [postData, setPostData] = useState({});
  const [commentsList, setCommentsList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://eduventure.site:5443/vod/board/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        console.log("뭐 들었어?", response.data.item);
        setPostData(response.data.item.board);
        setCommentsList(response.data.item.commentList);
        setFileList(response.data.item.boardFileList);
      } catch (error) {
        console.log("개별 동영상 안 가져옴?", error);
      }
    };

    fetchPostData();
  }, [id]);

  const file = fileList && fileList[0];

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <Title
          subtitle={`${postData.writer} 선생님의`}
          title={postData.title}
          color="#171A2B"
        />
      </div>
      <div>
        <VODSection videoDetail={postData} file={file} />
        <ChatSection
          commentsList={commentsList}
          setCommentsList={setCommentsList}
          id={id}
        />
      </div>
    </div>
  );
};

export default VODDetail;
