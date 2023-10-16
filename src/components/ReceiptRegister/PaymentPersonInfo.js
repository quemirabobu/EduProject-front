import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ReceiptDetail from "./ReceiptDetail";
import axios from "axios";

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
// const TextInputField = styled.input`
//   border: 1px solid #e3e3e3;
//   border-radius: 8px;
//   width: 80%;
//   height: 43%;
//   box-sizing: border-box;
//   text-align: center;
//   line-height: 3rem;
//   font-size: 1rem;
//   font-weight: 500;
// `;

const PaymentPersonInfo = ({ classData, studentData, setTotalPrice }) => {
  const [inputUserId, setInputUserId] = useState("");
  const [inputClassNames, setInputClassNames] = useState("");
  const [inputIssDate, setInputIssDate] = useState("");

  /**현재 선택된 반의 학생들 */
  const [filteredStudents, setFilteredStudents] = useState([]);

  // useEffect(() => {
  //   // 반이 선택되었을 때, 해당 반의 학생들만 필터링
  //   const studentsInSelectedClass = studentData[inputClassNames] || [];
  //   setFilteredStudents(studentsInSelectedClass);
  // }, [inputClassNames, studentData]);

  /** 반 핸들러 */
  const inputClassNamesHandler = (e) => {
    setInputClassNames(e.target.value);
  };
  /** 학생명 핸들러 */
  const inputUserIdHandler = (e) => {
    setInputUserId(e.target.value);
  };

  const dataForm = {
    payTo: inputUserId,
    couNo: inputClassNames,
    payYn: "N",
    issDate: inputIssDate,
  };

  /**
   * 반에 매핑된 학생들 로직 by 민제님한테 요청
   */
  const classStudentAxios = async () => {
    try {
      const response = await axios.get(
        `https://eduventure.site:5443/user/${dataForm.couNo}/user-list`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("나오냐", dataForm.couNo);
      setFilteredStudents(response.data.items);

      if (response.status !== 200) {
        console.log("연동 실패.");
        return;
      }
    } catch (error) {
      console.error("여기 새로운 반 학생 매핑로직 error", error);
    }
  };
  useEffect(() => {
    classStudentAxios();
  }, [inputClassNames]);

  console.log("자 여긴 personInfo 반학생이다.", filteredStudents);

  return (
    <Wrapper>
      <Container>
        <PaymentInfo>
          <InfoHead>반</InfoHead>
          <select
            type="text"
            value={inputClassNames}
            onChange={inputClassNamesHandler}
          >
            <option value="" disabled>
              반을 선택해주세요.
            </option>
            {Array.isArray(classData) &&
              classData?.map((element) => (
                <option key={element.couNo} value={element.couNo}>
                  {element.claName}
                </option>
              ))}
          </select>
        </PaymentInfo>
        <PaymentInfo>
          <InfoHead>학생명</InfoHead>
          <select type="text" value={inputUserId} onChange={inputUserIdHandler}>
            <option value="" disabled>
              학생명을 선택해주세요.
            </option>
            {filteredStudents?.map(
              (student) => (
                // student.userType === "student" ? (
                <option key={student.id} value={student.id}>
                  {student?.userName}
                </option>
              )
              // ) : null
            )}
          </select>
        </PaymentInfo>
        <PaymentInfo>
          <InfoHead>청구년월</InfoHead>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              inputFormat="yyyy-MM"
              value={inputIssDate}
              onChange={setInputIssDate}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </LocalizationProvider>
        </PaymentInfo>
      </Container>
      <ReceiptDetail
        dataForm={dataForm}
        setTotalPrice={setTotalPrice}
        setInputUserId={setInputUserId}
      />
    </Wrapper>
  );
};

export default PaymentPersonInfo;
