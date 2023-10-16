import React, { useState } from "react";
import styled from "styled-components";
import ClassModal from "./ClassModal";
import axios from "axios";

const Td = styled.td`
  height: 56px;
  overflow: hidden;
  text-align: center;
  color: #171a2b;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0px 20px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin: 0;
  border: 1px solid #000;
  background: transparent;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const ClassItem = ({
  couNo,
  claName,
  teacherName,
  teacherId,
  studentCnt,
  couMemo,
  teacherList,
  selectedIds,
  setSelectedIds,
  fetchClasses,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedIds((prevIds) => [...prevIds, couNo]);
    } else {
      setSelectedIds((prevIds) =>
        prevIds.filter((selectedId) => selectedId !== couNo)
      );
    }
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      console.log("삭제할 놈", couNo);
      const response = await axios.post(
        "https://eduventure.site:5443/course/course/delete",
        { couNoList: JSON.stringify([couNo]) },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );

      console.log("삭제할 것 잘 넣음?", response);

      if (response.data && response.data.item) {
        alert(response.data.item.msg);
        fetchClasses();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <tr>
        <Td>
          <Checkbox
            checked={selectedIds.includes(couNo)}
            onChange={handleCheckboxChange}
          />
        </Td>
        <Td>{couNo}</Td>
        <Td>{claName}</Td>
        <Td>{teacherName}</Td>
        <Td>{studentCnt}</Td>
        <Td>{couMemo}</Td>
        <Td>
          <Button onClick={handleOpenModal}>수정</Button>/
          <Button onClick={handleDelete}>삭제</Button>
        </Td>
      </tr>
      {isOpen && (
        <ClassModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          id={couNo}
          claName={claName}
          teacherName={teacherName}
          teacherId={teacherId}
          memo={couMemo === "" ? "" : couMemo}
          teacherList={teacherList}
          fetchClasses={fetchClasses}
        />
      )}
    </>
  );
};

export default ClassItem;
