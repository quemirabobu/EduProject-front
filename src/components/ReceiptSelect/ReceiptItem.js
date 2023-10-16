import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    text-decoration: underline; /* Adding a hover effect */
  }
`;

const ReceiptItem = ({
  userInfo,
  selectedIds,
  setSelectedIds,
  getUserInfo,
}) => {
  const navigate = useNavigate();
  const handleCheckboxChange = (payNo, isChecked) => {
    if (isChecked) {
      setSelectedIds((prevIds) => [...prevIds, payNo]);
    } else {
      setSelectedIds((prevIds) => prevIds.filter((id) => id !== payNo));
    }
  };

  const handleDelete = async (deletePayNo) => {
    console.log("삭제할 개별 아이디", [deletePayNo]);
    try {
      const response = await axios.post(
        "https://eduventure.site:5443/payment/admin/bill/delete",
        { payNo: [deletePayNo] },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      if (response.data && response.data.item) {
        alert("삭제가 완료되었습니다.");
        getUserInfo(); // 삭제 및 청구서 목록 업데이트
      }
    } catch (e) {
      console.log("삭제를 거절한다", e);
    }
  };

  console.log("ReceiptItem에 넘어온 수납관리에 전체 리스트", userInfo);

  return (
    <>
      {userInfo.map((element, index) => (
        <tr key={index}>
          <Td>
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(element.payNo, e.target.checked)
              }
              checked={selectedIds.includes(element.payNo)}
            />
          </Td>
          <Td>{element.payNo}</Td>
          <Td>{element.userName}</Td>
          <Td>{element.couNo}</Td>
          <Td>
            {element.issYear}.{element.issMonth}
          </Td>
          <Td>{element.totalPrice}</Td>
          <Td>{element.parentTel}</Td>
          <Td>{element.payMethod || "N/A"}</Td>
          <Td>{element.pay.toString() === "true" ? "완납" : "미납"}</Td>
          <Td>
            {/** 수정 버튼이 결제완료되었을 때 안보이는 로직*/}
            {element.pay ? (
              <>
                <Button onClick={() => handleDelete(element.payNo)}>
                  삭제
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  onClick={() =>
                    navigate(`/admin/receipt/update/${element.payNo}`)
                  }
                >
                  수정
                </Button>
                /
                <Button onClick={() => handleDelete(element.payNo)}>
                  삭제
                </Button>
              </>
            )}
          </Td>
        </tr>
      ))}
    </>
  );
};

export default ReceiptItem;
