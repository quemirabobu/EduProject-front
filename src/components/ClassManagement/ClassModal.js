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

const ClassModal = ({
  isOpen,
  onClose,
  couNo,
  claName,
  teacherId,
  memo,
  teacherList,
  fetchClasses,
}) => {
  const [editMemo, setEditMemo] = useState(memo);
  const [editTeacherId, setEditTeacherId] = useState(teacherId);

  if (!isOpen) {
    return null;
  }

  const handleEdit = async () => {
    const courseDTO = {
      couNo: couNo,
      teacherId: teacherId,
      claName: claName,
      couMemo: memo,
    };
    try {
      const response = await axios.put(
        "https://eduventure.site:5443/course/course",
        courseDTO
      );
      console.log("반 수정 요청 잘했어?", response);

      if (response.data && response.data.statusCode === 200) {
        alert("반 수정이 완료되었습니다.");
        fetchClasses();
        onClose();
      }
    } catch (e) {
      console.error(e);
      alert("반 수정을 실패하였습니다.");
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
            <LabelDiv>반 이 름</LabelDiv>
            <StyledInput value={claName} readOnly></StyledInput>
          </InputContainer>
          <InputContainer>
            <LabelDiv>선 생 님</LabelDiv>
            <StyledSelect
              value={editTeacherId}
              onChange={(e) => setEditTeacherId(e.target.value)}
            >
              {teacherList.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.userName}
                </option>
              ))}
            </StyledSelect>
          </InputContainer>
          <InputContainer>
            <LabelDiv>메 모</LabelDiv>
            <StyledInput
              value={editMemo}
              onChange={(e) => setEditMemo(e.target.value)}
            />
          </InputContainer>
        </ModalContent>
        <ModalButtons>
          <button onClick={onClose}>취소하기</button>
          <button onClick={handleEdit}>수정하기</button>
        </ModalButtons>
      </Modal>
    </ModalBackdrop>
  );
};

export default ClassModal;
