import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "./JoinStyled.module.css";

const DaumAddress = ({ setAddress }) => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    address: "",
    zonecode: "",
  });

  const handleButtonClick = () => {
    setOpenPostcode(!openPostcode);
  };

  const handleSelectAddress = (data) => {
    setSelectedAddress({
      address: data.address,
      zonecode: data.zonecode,
    });
    setAddress(data.address); // 입력된 주소 설정
    setOpenPostcode(false);
  };

  const handleInputClick = () => {
    if (openPostcode) {
      setOpenPostcode(false);
    }
  };

  return (
    <div className={styled.addressContainer}>
      <div className={styled.addressInputGroup}>
        <input
          className={styled.addressInput}
          type="text"
          placeholder="주소를 입력하세요"
          value={selectedAddress.address}
          readOnly
          onClick={handleInputClick}
        />
        <button className={styled.addressBtn} onClick={handleButtonClick}>
          주소 검색
        </button>
      </div>

      {openPostcode && (
        <div>
          <DaumPostcode
            onComplete={handleSelectAddress}
            autoClose={false}
            defaultQuery={selectedAddress.address}
          />
        </div>
      )}
    </div>
  );
};

export default DaumAddress;
