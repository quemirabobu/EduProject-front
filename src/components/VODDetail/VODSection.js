import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const VideoPlayer = styled.video`
  position: relative;
  display: flex;
  width: 1100px;
  height: 600px;
  background: #323232;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  background: #f0f0f0;
  border-radius: 20px;
  box-sizing: border-box;
`;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #5ac467;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Title = styled.p`
  padding: 20px 35px;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const UploadDate = styled.p`
  font-size: 18px;
  text-align: right;
  padding: 0px 35px;
`;

const Content = styled.p`
  font-size: 20px;
  padding: 15px 40px;
`;

const DownloadLink = styled.a`
  font-size: 18px;
  color: white;
  text-align: center;
  text-decoration: none;

  :hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const VODSectionDetail = ({ videoDetail, file }) => {
  const title = videoDetail.title;
  const regdate = videoDetail.regDate
    ? new Date(videoDetail.regDate).toISOString().split("T")[0]
    : "Unknown Date";
  const content = videoDetail.content;

  const fileUrl = file
    ? `https://eduventure.site:5443/storage/download/${file.vodSaveName}`
    : "#";

  return (
    <Container>
      <VideoPlayer
        src={videoDetail.savePath}
        controls
        poster={videoDetail.saveThumb}
      />
      <ContentContainer>
        <Title>{title}</Title>
        <UploadDate>{regdate}</UploadDate>
        <Content>{content}</Content>
        <BottomContainer>
          {file && (
            <DownloadLink href={fileUrl} download={file.vodSaveName}>
              강의 자료 다운로드 | {file.vodOriginName}
            </DownloadLink>
          )}
        </BottomContainer>
      </ContentContainer>
    </Container>
  );
};

export default VODSectionDetail;
