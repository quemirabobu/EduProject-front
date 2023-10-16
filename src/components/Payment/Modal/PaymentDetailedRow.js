import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
const PaymentDetailedRow = ({ historyRow, issDay }) => {
  console.log("자 여긴 영수증의 최하단 디테일의 data다 ", historyRow);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {issDay}
      </TableCell>
      <TableCell>{historyRow.productName}</TableCell>
      <TableCell align="right">{historyRow.productPrice}</TableCell>
    </TableRow>
  );
};
export default PaymentDetailedRow;
