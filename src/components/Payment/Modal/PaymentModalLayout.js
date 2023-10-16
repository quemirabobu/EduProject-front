import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import PaymentRow from "./PaymentRow";

const PaymentModalLayout = () => {
  const [modalData, setModalData] = useState({});
  useEffect(() => {
    axios
      .get(`https://eduventure.site:5443/payment/student/bill-list`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        setModalData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  console.log("여긴modalData", modalData);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> 년도 </TableCell>
            <TableCell align="right"> 월 </TableCell>
            <TableCell align="right">총 액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/** 모달 영수증의 완전 세부 내용 */}
          <PaymentRow receipt={modalData} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PaymentModalLayout;
