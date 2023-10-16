import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const tableContainerStyle = {
  flexGrow: 1,
};

const tableContentStyle = {
  background: "#fff",
  paddingBottom: "20px",
};

const PaymentTable = ({ paymentData }) => {
  console.log("유저단에서 넘어온 납부서 데이터이다.", paymentData);

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                borderBottom: "none",
                pl: 15,
                fontWeight: 700,
                fontSize: "1.2rem",
              }}
            >
              상세 내역
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentData?.item?.productList?.map((paymentItem, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="left" sx={{ ...tableContentStyle, pl: 15 }}>
                  <div key={paymentItem?.id}>{paymentItem?.productName}</div>
                </TableCell>
                <TableCell align="right" sx={{ ...tableContentStyle, pr: 15 }}>
                  <div key={paymentItem?.id}>
                    {paymentItem?.productPrice.toLocaleString("ko-KR")}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
