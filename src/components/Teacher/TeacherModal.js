import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalHeaderDiv = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 30px;
  background-color: #5ac467;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
`;

const ModalHeaderBtn = styled.div`
  width: 12px;
  height: 12px;
  margin-left: 15px;
  padding: 0;
  background-color: #ec6b5e;
  border-radius: 50%;
  cursor: pointer;
`;

const Modal = styled.div`
  background-color: white;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ModalContent = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ModalButtons = styled.div`
  display: flex;
  margin: 5px;
  gap: 10px;

  button {
    width: 95px;
    height: 35px;
    font-size: 15px;
    border: none;
    border-radius: 20px;
    background-color: #5ac467;
    color: white;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  width: 400px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LabelDiv = styled.div`
  width: 95px;
  height: 35px;
  border-radius: 20px;
  background: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const StyledInput = styled.input`
  width: 250px;
  height: 35px;
  padding: 0 15px;
  border: none;
  border-radius: 20px;
  background: #ededed;
  font-size: 15px;
  color: #5a5a5a;
  outline: none;
  margin-left: 10px;
`;

const StyledSelect = styled.select`
  width: 250px;
  height: 35px;
  padding: 0 15px;
  border: none;
  border-radius: 20px;
  background: #ededed;
  font-size: 15px;
  color: #171a2b;
  outline: none;
  margin-left: 10px;
  appearance: none;
  cursor: pointer;
`;

const TeacherModal = ({
  isOpen,
  onClose,
  id,
  name,
  email,
  contact,
  approval,
  // group,
  fetchUsers,
}) => {
  // const [selectedCouNo, setSelectedCouNo] = useState(group || "");

  if (!isOpen) {
    return null;
  }

  const handleApproval = async () => {
    const userDTO = {
      approval: "o",
      id: id,
      userId: email,
      userName: name,
      userTel: contact,
      userType: "teacher",
    };

    try {
      const response = await axios.put(
        "https://eduventure.site:5443/user/update",
        userDTO
      );

      console.log("요청", response);

      if (response.data && response.data.statusCode === 200) {
        alert("승인이 완료되었습니다.");
        fetchUsers();
        onClose();
      }
    } catch (e) {
      console.error("선생님 승인 실패?", e);
      alert("승인을 실패하였습니다.");
      onClose();
    }
  };

  return (
    <ModalBackdrop>
      <Modal>
        <ModalHeaderDiv>
          <ModalHeaderBtn onClick={onClose} />
        </ModalHeaderDiv>
        <ModalContent>
          <InputContainer>
            <LabelDiv>이 름</LabelDiv>
            <StyledInput value={name} readOnly></StyledInput>
          </InputContainer>
          <InputContainer>
            <LabelDiv>연 락 처</LabelDiv>
            <StyledInput value={contact} readOnly></StyledInput>
          </InputContainer>
          {/* <InputContainer>
            <LabelDiv>반 배 정</LabelDiv>
            <StyledSelect
              value={selectedCouNo}
              onChange={(e) => setSelectedCouNo(e.target.value)}
            >
              {group && (
                <option value={group} disabled>
                  {classData.find((e) => e.claName === group)?.claName ||
                    "반 선택"}
                </option>
              )}
              {classData.map((element) => {
                return (
                  <option key={element.couNo} value={element.couNo}>
                    {element.claName}
                  </option>
                );
              })}
            </StyledSelect>
          </InputContainer> */}
        </ModalContent>
        <ModalButtons>
          <button onClick={onClose}>취소하기</button>
          {approval === "승인" ? (
            <>
              <button onClick={handleApproval}>수정하기</button>
            </>
          ) : (
            <>
              <button onClick={handleApproval}>승인하기</button>
            </>
          )}
        </ModalButtons>
      </Modal>
    </ModalBackdrop>
  );
};

export default TeacherModal;
