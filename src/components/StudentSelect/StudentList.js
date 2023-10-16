import React from "react";
import styled from "styled-components";
import StudentItem from "./StudentItem";

const Container = styled.div`
  width: 90%;
  height: 650px;
  margin: 20px auto 0 auto;
  background: #ececec;
  border-radius: 20px 20px 0 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  max-height: 600px;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  width: 50px;
  background-color: #171a2b;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Th = styled.th`
  height: 50px;
  text-align: center;
  color: #fff;
  font: 15px ligther;
  padding: 0px 20px;
`;

const Tbody = styled.tbody``;

const StudentList = ({
  selectedIds,
  setSelectedIds,
  userList,
  fetchUsers,
  classData,
}) => {
  const userType = sessionStorage.getItem("userType");
  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <Th>선택</Th>
            <Th>번호</Th>
            <Th>이름</Th>
            <Th>나이</Th>
            <Th>반</Th>
            <Th>연락처</Th>
            <Th>학부모 연락처</Th>
            <Th>버스</Th>
            {userType === "teacher" ? <></> : <Th>수정 / 삭제</Th>}
          </tr>
        </Thead>
        <Tbody>
          {userList?.map((user) => {
            return (
              <StudentItem
                key={user.id}
                id={user?.id}
                name={user?.userName}
                birth={user?.userBirth}
                group={user?.courseDTO?.claName}
                contact={user?.userTel}
                parentContact={user?.parentDTO?.userTel}
                bus={user?.userBus}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                fetchUsers={fetchUsers}
                classData={classData}
              />
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default StudentList;
