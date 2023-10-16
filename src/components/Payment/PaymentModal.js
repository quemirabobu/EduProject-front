import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PaymentModalLayout from "./Modal/PaymentModalLayout";
/* 
계층구조  최상위 --> 자식
PaymentModal
PaymentModalLayout
PaymentRow
PaymentDetailedRow
*/
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PaymentModal = () => {
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(!open);

  return (
    <>
      <Button onClick={openHandler}>
        <KeyboardArrowDownRoundedIcon />
      </Button>
      <Modal
        open={open}
        onClose={openHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PaymentModalLayout />
        </Box>
      </Modal>
    </>
  );
};

export default PaymentModal;
