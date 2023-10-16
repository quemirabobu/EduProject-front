import React from "react";
import styled from "styled-components";
import ReceiptItem from "./ReceiptItem";

const Container = styled.div`
  width: 90%;
  height: 700px;
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
  border-collapse: collapse;
`;

const Thead = styled.thead`
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

const ReceiptList = ({
  userInfo,
  selectedIds,
  setSelectedIds,
  getUserInfo,
}) => {
  console.log("ReceiptList 넘어온 수납관리에 전체 리스트", userInfo);
  return (
    <Container>
      <Table>
        <Thead>
          <tr>
            <Th>선택</Th>
            <Th>번호</Th>
            <Th>이름</Th>
            <Th>반</Th>
            <Th>청구년월</Th>
            <Th>금액</Th>
            <Th>학부모 연락처</Th>
            <Th>결제 방식</Th>
            <Th>상태</Th>
            <Th>수정 / 삭제</Th>
          </tr>
        </Thead>
        <Tbody>
          {/** 여긴 유저의 상세 내용을 표출하는 컴포넌트이다. */}
          <ReceiptItem
            userInfo={userInfo}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            getUserInfo={getUserInfo}
          />
        </Tbody>
      </Table>
    </Container>
  );
};

export default ReceiptList;
