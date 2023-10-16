import React, { useEffect, useState } from "react";
import TextBox from "../components/Payment/TextBox";
import PaymentTable from "../components/Payment/PaymentTable";
import PaymentModal from "../components/Payment/PaymentModal";
import { Paper, Divider, Button } from "@mui/material";
import axios from "axios";

const paymentContainer = {
  width: "100vw",
  height: "calc(100vh - 50px)",
  backgroundColor: "#4A4F6B",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0px",
};

const paymentWhiteBox = {
  display: "flex",
  flexDirection: "column",
  width: "85vw",
  height: "80%",
  backgroundColor: "#f2f2f2",
};

const divider = {
  borderWidth: 2,
  borderStyle: "solid",
};

const payButton = {
  width: "100%",
  height: "10%",
  position: "relative",
  backgroundColor: "#171A2B",
  color: "white",
  "&:hover": {
    backgroundColor: "#000",
  },
};

const Payment = () => {
  const [paymentDataAxios, setPaymentDataAxios] = useState("");
  /** 사용자단 화면에 내야하는 납부서를 불러오는 Axios이다. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://eduventure.site:5443/payment/student/bill",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        setPaymentDataAxios(response.data);
        console.log(
          "payment에서 받아오는 데이터 productList값.",
          response.data.item
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  /** 아이엠포트 로직 */
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp31057650");

    /** repceipt라는 테이블이 생겨서 새로 값을 받아야한다. */
    const productName = `${
      paymentDataAxios.item.productList[0].productName
    } 외 ${paymentDataAxios.item.productList.length - 1}개 상품`;

    const paydata = {
      pg: "kcp.T0000",
      pay_method: "card",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: productName,
      amount: paymentDataAxios?.item.totalPrice,
      buyer_name: paymentDataAxios?.item.userName,
    };
    IMP.request_pay(paydata, callback);
  };

  const callback = (response) => {
    const { success, imp_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");

      console.log(response);

      // 검증을 위한 서버 요청
      axios
        .post(`https://eduventure.site:5443/iamport/verifyIamport/${imp_uid}`)
        .then((response) => {
          // 서버에서 받은 응답을 검증
          console.log(response);
          if (
            response.data.response.amount == paymentDataAxios.item.totalPrice
          ) {
            alert("결제 및 결제검증완료");
            //결제 성공 시 비즈니스 로직
            axios
              .post(`https://eduventure.site:5443/iamport/payOk`, {
                impUid: imp_uid,
                payNo: paymentDataAxios.item.payNo,
              })
              .then((resp) => {
                console.log(resp);
              })
              .catch((error) => {
                console.error("Failed to fetch data", error);
              });
          } else {
            alert("결제에 실패하였습니다");
            // 결제 실패 시 로직
          }
        })
        .catch((error) => {
          console.error("Failed to fetch data", error);
        });
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Paper className="paymentContainer" sx={paymentContainer}>
        <Paper className="paymentWhiteBox" sx={paymentWhiteBox}>
          <TextBox
            /** 여기는 전체적인 레이아웃을 확인할 수 있는 곳이다. */
            academyName={paymentDataAxios?.item?.payFrom}
            month={paymentDataAxios?.item?.issMonth + `월`} //달로 보내주세요.
            amount={paymentDataAxios?.item?.totalPrice.toLocaleString("ko-KR")}
          >
            {/** 여기가 모달이다. */}
            <PaymentModal isOpen={isOpen} handleModal={handleModal} />
          </TextBox>
          <Divider sx={divider} />
          {/** 여기가 상세내역이 들어오는 곳이다. */}
          <PaymentTable paymentData={paymentDataAxios} />
          <Divider sx={divider} />
          {paymentDataAxios?.item?.pay === true ? (
            <Button variant="contained" sx={payButton} disabled>
              결제하기
            </Button>
          ) : (
            <Button variant="contained" sx={payButton} onClick={onClickPayment}>
              결제하기
            </Button>
          )}
        </Paper>
      </Paper>
    </>
  );
};

export default Payment;
