import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  background: #fafafa;
`;

const PaymentHeadWrapper = styled.div`
  background: #fafafa;
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const PaymentHead = styled.div`
  width: 47.5%;
  padding: 10px 0;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  margin-right: 40px;
`;

const InputFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow-y: auto;
`;

const TextInputField = styled.input`
  flex: 1;
  width: 47.5%;
  border: none;
  height: 3rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 3rem;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 40px 0;
`;

const RegisterButton = styled.button`
  background: #171a2b;
  color: #fff;
  margin: 10px 20px 10px 10px;
  width: 150px;
  height: 3rem;
  text-align: center;
  border-radius: 20px;
  font-size: 1rem;
`;

const CancelButton = styled.button`
  background: #171a2b;
  color: #fff;
  margin: 10px;
  width: 150px;
  height: 3rem;
  text-align: center;
  border-radius: 20px;
  font-size: 1rem;
`;

const ReceiptDetail = ({ setTotalPrice, dataForm, setInputUserId }) => {
  const [postData, setPostData] = useState([{ detail: "", price: "" }]);

  const navigate = useNavigate();

  const addInputField = () => {
    setPostData([...postData, { detail: "", price: "" }]);
  };

  const removeInputField = (index) => {
    const newFields = postData.filter((_, i) => i !== index);
    setPostData(newFields);

    const totalPrice = newFields.reduce(
      (sum, field) => sum + (Number(field.price) || 0),
      0
    );
    setTotalPrice(totalPrice);
  };

  const changeHandler = (index, type, value) => {
    const newFields = [...postData];
    newFields[index][type] = value;
    setPostData(newFields);

    if (type === "price") {
      const totalPrice = newFields.reduce(
        (sum, field) => sum + (Number(field.price) || 0),
        0
      );
      setTotalPrice(totalPrice);
    }
  };

  const postDataForm = {
    ...dataForm,
    productList: JSON.stringify(
      postData.map((field) => ({
        detail: field.detail,
        price: Number(field.price) || 0,
      }))
    ),
  };

  console.log("body다", postDataForm);
  /** 등록하기 요청 */
  const postAxios = async () => {
    try {
      const response = await axios.post(
        "https://eduventure.site:5443/payment/admin/bill",
        postDataForm,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      setPostData(response.data.productList || []);
      if (response.status === 200) {
        console.log(response.data);
        navigate(-1);
      }
      setInputUserId("");
    } catch (error) {
      console.error("여기 포스트 Axios error", error);
    }
  };

  return (
    <Container>
      <PaymentHeadWrapper>
        <PaymentHead>상세내역</PaymentHead>
        <PaymentHead>가격</PaymentHead>
        <AddIcon onClick={addInputField} style={{ marginRight: "38px" }} />
      </PaymentHeadWrapper>

      {postData.map((field, index) => (
        <InputFieldWrapper key={index}>
          <TextInputField
            value={field.detail}
            onChange={(e) => changeHandler(index, "detail", e.target.value)}
          />
          <TextInputField
            value={field.price}
            onChange={(e) => changeHandler(index, "price", e.target.value)}
          />
          <RemoveCircleOutlineIcon onClick={() => removeInputField(index)} />
        </InputFieldWrapper>
      ))}

      <ButtonWrapper>
        <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
        <RegisterButton onClick={postAxios}>등록하기</RegisterButton>
      </ButtonWrapper>
    </Container>
  );
};

export default ReceiptDetail;
