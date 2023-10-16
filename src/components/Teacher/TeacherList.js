import React from "react";
import styled from "styled-components";
import TeacherItem from "./TeacherItem";

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
  background-color: #5ac467;
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

const TeacherList = ({ selectedIds, setSelectedIds, userList, fetchUsers }) => {
  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <Th>선택</Th>
            <Th>번호</Th>
            <Th>이름</Th>
            <Th>이메일</Th>
            <Th>연락처</Th>
            <Th>승인 여부</Th>
            {/* <Th>반</Th> */}
            <Th>승인 / 삭제</Th>
          </tr>
        </Thead>
        <Tbody>
          {userList
            .filter((user) => user.userType === "teacher")
            .map((user) => {
              // const classInfo = classData.find(
              //   (cla) => cla.couNo === user.couNo
              // );
              // const groupName = classInfo ? classInfo.claName : "미정";

              return (
                <TeacherItem
                  key={user.id}
                  id={user.id}
                  name={user.userName}
                  email={user.userId}
                  contact={user.userTel}
                  approval={user.approval === "o" ? "승인" : "승인 대기"}
                  // group={groupName}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  fetchUsers={fetchUsers}
                />
              );
            })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default TeacherList;
