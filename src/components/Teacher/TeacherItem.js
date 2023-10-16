import React, { useState } from "react";
import styled from "styled-components";
import TeacherModal from "./TeacherModal";
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

const TeacherItem = ({
  id,
  name,
  email,
  contact,
  // group,
  approval,
  selectedIds,
  setSelectedIds,
  fetchUsers,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedIds((prevIds) =>
        prevIds.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        const response = await axios.post(
          "https://eduventure.site:5443/user/deleteselectusers",
          { selectedUserIds: [id] },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        if (response.data && response.data.item) {
          alert(response.data.item.msg);
          fetchUsers();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <tr>
        <Td>
          <Checkbox
            checked={selectedIds.includes(id)}
            onChange={handleCheckboxChange}
          />
        </Td>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <Td>{contact}</Td>
        <Td>{approval}</Td>
        {/* <Td>{group}</Td> */}
        <Td>
          {approval === "승인" ? (
            <></>
          ) : (
            <>
              <Button onClick={handleOpenModal}>승인</Button>/
            </>
          )}
          <Button onClick={handleDelete}>삭제</Button>
        </Td>
      </tr>
      {isOpen && (
        <TeacherModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          id={id}
          name={name}
          email={email}
          contact={contact}
          approval={approval}
          // group={group}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
};

export default TeacherItem;
