import React from "react";
import AdminVodListItem from "./AdminVodListItem";
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

const AdminVodList = ({ VODList, setVODList }) => {
  const handleVideoDelete = async (deletedId) => {
    try {
      setVODList(VODList.filter((item) => item.id !== deletedId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {VODList.map((item) => (
        <AdminVodListItem
          key={item.id}
          id={item.id}
          lectureName={item.title}
          teacherName={item.writer}
          viewCount={item.hits}
          uploadDate={item.regDate}
          thumbnail={item.saveThumb}
          handleDeleteView={() => handleVideoDelete(item.id)}
        />
      ))}
    </Container>
  );
};
export default AdminVodList;
