import axios from "axios";
import React, { useEffect, useState } from "react";
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

const ClassCreateModal = ({ isOpen, onClose, fetchClasses, teacherList }) => {
  const [claName, setClaName] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [nChatCreate, setNChatCreate] = useState("");
  if (!isOpen) {
    return null;
  }

  const handleCreate = async () => {
    const courseDTO = {
      teacherId: selectedTeacherId,
      claName: claName,
      couMemo: memo,
    };
    console.log("반 생성 요청 잘했어?", courseDTO);
    try {
      const response = await axios.post(
        "https://eduventure.site:5443/course/course",
        courseDTO
      );
      console.log("반 생성 요청 잘했어?", response);

      if (response.data && response.data.statusCode === 200) {
        alert("반 생성이 완료되었습니다.");
        fetchClasses();
        onClose();
      }
    } catch (e) {
      console.error(e);
      alert("반 생성을 실패하였습니다.");
      onClose();
    }
    channelCreate();
  };

  const data = {
    name: nChatCreate,
    type: "PUBLIC",
  };

  const channelCreate = async () => {
    try {
      const response = await axios.post(
        "https://dashboard-api.ncloudchat.naverncp.com/v1/api/channels",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-project-id": "ea3a8bf5-e78c-4f9b-830d-e66bf1d4040b",
            "x-api-key": "3fdfbdf1fd786a1e6d1e5075db4e65d765001a0b610c65f1",
          },
        }
      );
    } catch (error) {
      console.log(error);
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
            <StyledInput
              value={claName}
              onChange={(e) => setClaName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <LabelDiv>선 생 님</LabelDiv>
            <StyledSelect
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
            >
              <option value="" disabled>
                선생님 선택
              </option>
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
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <LabelDiv>단톡방 생성</LabelDiv>
            <StyledInput
              value={nChatCreate}
              onChange={(e) => setNChatCreate(e.target.value)}
            />
          </InputContainer>
        </ModalContent>
        <ModalButtons>
          <button onClick={onClose}>취소하기</button>
          <button onClick={handleCreate}>생성하기</button>
        </ModalButtons>
      </Modal>
    </ModalBackdrop>
  );
};

export default ClassCreateModal;
