import React from "react";
import styled from "styled-components";
import ClassItem from "./ClassItem";

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

const ClassList = ({
  selectedIds,
  setSelectedIds,
  classList,
  fetchClasses,
  teacherList,
}) => {
  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <Th>선택</Th>
            <Th>번호</Th>
            <Th>반 이름</Th>
            <Th>선생님 이름</Th>
            <Th>학생 수</Th>
            <Th>메모</Th>
            <Th>수정 / 삭제</Th>
          </tr>
        </Thead>
        <Tbody>
          {classList.map((cla) => {
            return (
              <ClassItem
                key={cla.couNo}
                couNo={cla.couNo}
                claName={cla.claName}
                teacherName={cla.userDTO.userName}
                teacherId={cla.userDTO.id}
                studentCnt={cla.studentCnt}
                couMemo={cla.couMemo}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                fetchClasses={fetchClasses}
                teacherList={teacherList}
              />
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ClassList;
