import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ReceiptSelectUpdateItem from "./ReceiptSelectUpdateItem";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  align-items: stretch;
`;

const PaymentInfo = styled.div`
  flex: 1;
  background: #fafafa;
  padding: 10px 0 50px 50px;
  border-top: 3px solid #e3e3e3;
  border-bottom: 3px solid #e3e3e3;
`;

const InfoHead = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ReceiptSelectUpdateList = ({
  setTotalPrice,
  totalPrice,
  userData,
  allUserData,
  payNo,
}) => {
  const [selectedClaName, setSelectedClaName] = useState(userData?.claName);
  const [selectedUserName, setSelectedUserName] = useState(userData?.userName);

  console.log("UpdateList에서 payNo 유저정보", userData);
  console.log("UpdateList에서 allUser 유저정보", allUserData);
  // 초기 날짜 상태 설정
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    if (userData?.issYear && userData?.issMonth) {
      setSelectedDate(
        new Date(`${userData?.issYear}-${userData?.issMonth}-01`)
      );
    }
  }, [userData?.issYear, userData?.issMonth]);

  const dataForm = {
    // payTo: selectedUserName,
    // couNo: selectedClaName,
    payYn: "N",
    issDate: selectedDate,
  };
  console.log("selectUpdateList의 dataForm", dataForm);
  return (
    <Wrapper>
      <Container>
        <PaymentInfo>
          <InfoHead>반</InfoHead>
          <select
            type="text"
            defaultValue={selectedClaName}
            onChange={(e) => setSelectedClaName(e.target.value)}
          >
            <option key={userData.payNo}>{userData.claName}</option>
            {allUserData &&
              allUserData?.items?.map((item) => (
                <option key={item?.payNo} value={item?.payNo}>
                  {item?.claName}
                </option>
              ))}
          </select>
        </PaymentInfo>
        <PaymentInfo>
          <InfoHead>학생명</InfoHead>
          <select
            defaultValue={selectedUserName}
            onChange={(e) => setSelectedUserName(e.target.value)}
          >
            <option key={userData.payNo}>{userData.userName}</option>
            {allUserData &&
              allUserData?.items?.map((item) => (
                <option key={item?.payNo} value={item?.payNo}>
                  {item?.userName}
                </option>
              ))}
          </select>
        </PaymentInfo>
        <PaymentInfo>
          <InfoHead>청구년월</InfoHead>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              inputFormat="yyyy-MM"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </LocalizationProvider>
        </PaymentInfo>
      </Container>
      <ReceiptSelectUpdateItem
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        userData={userData}
        payNo={payNo}
        dataForm={dataForm}
      />
    </Wrapper>
  );
};

export default ReceiptSelectUpdateList;
