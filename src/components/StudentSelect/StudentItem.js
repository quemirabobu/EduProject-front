import React, { useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

const StudentItem = ({
  id,
  name,
  birth,
  group,
  parentContact,
  contact,
  bus,
  selectedIds,
  setSelectedIds,
  fetchUsers,
}) => {
  const userType = sessionStorage.getItem("userType");
  const navi = useNavigate();

  const getAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getKoreanAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear() + 1;
  };

  const calculatedAge = getAge(birth);
  const koreanAge = getKoreanAge(birth);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedIds((prevIds) =>
        prevIds.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deleteUserAxios = async () => {
        try {
          const response = await axios.delete(
            `https://eduventure.site:5443/user/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          console.log("잘 보내짐?", response);

          if (response.data && response.data.item.msg) {
            alert(response.data.item.msg);
            navi("/admin/student");
            fetchUsers();
          }
        } catch (e) {
          console.log(e);
        }
      };
      deleteUserAxios();
    },
    [id, fetchUsers, navi]
  );

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
        <Td>{`만 ${calculatedAge}세 (${koreanAge}세)`}</Td>
        <Td>{group}</Td>
        <Td>{contact}</Td>
        <Td>{parentContact}</Td>
        <Td>{bus}</Td>
        {userType === "teacher" ? (
          <></>
        ) : (
          <Td>
            <Link to={`/admin/student/update/${id}`}>
              <Button>수정</Button>
            </Link>
            /<Button onClick={handleDelete}>삭제</Button>
          </Td>
        )}
      </tr>
    </>
  );
};

export default StudentItem;
