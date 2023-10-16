import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
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

const ReceiptSelectUpdateItem = ({
  setTotalPrice,
  dataForm,
  userData,
  payNo,
  totalPrice,
}) => {
  console.log("수정url을 위한 payNo", payNo);
  const initialData =
    userData?.productList?.map((item) => ({
      detail: item?.productName,
      price: item?.productPrice?.toString(),
    })) || [];

  const [postData, setPostData] = useState(initialData);

  useEffect(() => {
    if (userData?.productList) {
      const updatedData = userData.productList.map((item) => ({
        detail: item?.productName,
        price: item?.productPrice?.toString(),
      }));
      setPostData(updatedData);
    }
  }, [userData]);

  console.log("여기입니다 여기여기여기여기", userData);
  const navigate = useNavigate();

  const addInputField = () => {
    setPostData([...postData, { detail: "", price: "" }]);
  };

  const removeInputField = (index) => {
    const newFields = postData.filter((_, i) => i !== index);
    setPostData(newFields);

    const totalPrice = calculateTotalPrice(newFields);
    setTotalPrice(totalPrice);
  };

  const calculateTotalPrice = (fields) => {
    return fields.reduce((sum, field) => sum + (Number(field?.price) || 0), 0);
  };

  const changeHandler = (index, type, value) => {
    const newFields = [...postData];
    newFields[index][type] = value;
    setPostData(newFields);

    if (type === "price") {
      const totalPrice = calculateTotalPrice(newFields);
      setTotalPrice(totalPrice);
    }
  };

  const postDataForm = {
    ...dataForm,
    productList: JSON.stringify(
      postData.map((field) => ({
        detail: field?.detail,
        price: Number(field?.price) || 0,
      }))
    ),
  };

  console.log("body다", postDataForm);

  /** 수정하기로 바꾸자*/
  const updateAxios = async () => {
    try {
      const response = await axios.post(
        `https://eduventure.site:5443/payment/admin/bill/${payNo}`,
        postDataForm,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      setPostData(response?.data?.productList || []);

      if (response.status === 200) {
        navigate(-1);
        console.log("이거 확인해보자 토탈값", response.data);
      } else {
        console.log("실패 후 데이터 확인", postDataForm);
      }
    } catch (error) {
      console.error("여기 포스트 Axios error", error);
      console.log("실패 후 데이터 확인", postDataForm);
    }
  };

  return (
    <Container>
      <PaymentHeadWrapper>
        <PaymentHead>상세내역</PaymentHead>
        <PaymentHead>가격</PaymentHead>
        <AddIcon onClick={addInputField} style={{ marginRight: "38px" }} />
      </PaymentHeadWrapper>

      {Array.isArray(postData) &&
        postData.map((field, index) => (
          <InputFieldWrapper key={index}>
            <TextInputField
              defaultValue={field?.detail}
              onChange={(e) => changeHandler(index, "detail", e.target.value)}
            />
            <TextInputField
              defaultValue={field?.price}
              onChange={(e) => changeHandler(index, "price", e.target.value)}
            />
            <RemoveCircleOutlineIcon onClick={() => removeInputField(index)} />
          </InputFieldWrapper>
        ))}

      <ButtonWrapper>
        <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
        <RegisterButton onClick={updateAxios}>수정하기</RegisterButton>
      </ButtonWrapper>
    </Container>
  );
};

export default ReceiptSelectUpdateItem;
