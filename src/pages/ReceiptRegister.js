import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Title from "../components/Title";
import PaymentPersonInfo from "../components/ReceiptRegister/PaymentPersonInfo";
// import ReceiptDetail from "../components/ReceiptRegister/ReceiptDetail";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  background: #4a4f6b;
`;

const ReceiptWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  background: #fafafa;
  margin-top: 60px;
  position: relative;
`;

const TotalPrice = styled.p`
  font-size: 2rem;
  font-weight: 400;
  position: absolute;
  top: 65px;
  right: 25px;
`;

const ReceiptRegister = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  /**
   * 반에 대한 정보
   */
  const classAxios = async () => {
    try {
      const classResponse = await axios.get(
        "https://eduventure.site:5443/course/course-list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("data값111111", classResponse.data);
      setClassData(classResponse.data.items);
    } catch (error) {
      console.error("여기 ReceiptRegistererror", error);
    }
  };
  useEffect(() => {
    classAxios();
  }, []);
  console.log("여긴 classData.items이다", classData);

  /**
   * 반에 매핑된 학생들 로직
   */
  // const classStudentAxios = async () => {
  //   try {
  //     const classStudentResponse = await axios.get(
  //       "https://eduventure.site:5443/user/user-list"
  //     );

  //     if (
  //       !classStudentResponse.data ||
  //       !classStudentResponse.data.pageItems ||
  //       !Array.isArray(classStudentResponse.data.pageItems.content)
  //     ) {
  //       console.error("학생 데이터를 가져오는 데 실패했습니다.");
  //       return;
  //     }
  //     const resultStudent = classStudentResponse.data.pageItems.content;
  //     console.log("resultStudent입니다.", resultStudent);

  //     const mappedStudents = {};
  //     // resultStudent 배열을 순회하며, 각 학생의 반 정보를 확인하고 해당 학생을 매핑 객체에 추가합니다.
  //     classData.forEach((classItem) => {
  //       mappedStudents[classItem.couNo] = resultStudent.filter(
  //         (student) => student.couNo === classItem.couNo
  //       );
  //     });

  //     setStudentData(mappedStudents);
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  // console.log("여긴 매핑된 mappingStudents", studentData);
  // useEffect(() => {
  //   if (classData.length > 0) {
  //     classStudentAxios();
  //   }
  // }, [classData]);

  /** */

  /** 세자리 수마다 ,표기해주는 함수 */
  const numberWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log("넘어온 classData.item", classData);
  console.log("넘어온 studentData", studentData);
  return (
    <Container>
      <ReceiptWrapper>
        <div style={{ margin: "40px 20px 50px 20px" }}>
          <Title subtitle="EduVenture" title="수납 등록"></Title>
          <TotalPrice>총액 {numberWithCommas(totalPrice)}원</TotalPrice>
        </div>
        {/** 여기가 반, 학생명, 청구년월 */}
        <PaymentPersonInfo
          classData={classData}
          studentData={studentData}
          setTotalPrice={setTotalPrice}
        />
      </ReceiptWrapper>
    </Container>
  );
};

export default ReceiptRegister;
