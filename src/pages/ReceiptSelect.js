import React, { useCallback, useEffect, useState } from "react";
import Title from "../components/Title";
import ReceiptList from "../components/ReceiptSelect/ReceiptList";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
  buttonsAndSearchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "5px",
  },
  styleButton1: {
    marginLeft: "110px",
    width: "100px",
    height: "40px",
    backgroundColor: "#ffffff",
    color: "#171A2B",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
  styleButton2: {
    width: "100px",
    height: "40px",
    backgroundColor: "#ffffff",
    color: "#171A2B",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
  styleButton3: {
    width: "80px",
    height: "40px",
    backgroundColor: "#171a2b",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
};

const Dropdown = styled.select`
  width: 90px;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 40px;
  margin: 0 5px;
  border: none;
  padding: 0 15px;
  border-radius: 20px;
`;

const ReceiptSelect = () => {
  const [searchType, setSearchType] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [originalUserInfo, setOriginalUserInfo] = useState([]); // 원본 데이터 상태
  const [displayedUserInfo, setDisplayedUserInfo] = useState([]); // 표시될 데이터 상태
  const [selectedIds, setSelectedIds] = useState([]);

  /** 수납관리 전체 리스트 데이터 */
  const getUserInfo = async () => {
    try {
      const resG = await axios.get(
        "https://eduventure.site:5443/payment/admin/bill-list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      setDisplayedUserInfo(resG.data.items);
      setOriginalUserInfo(resG.data.items);
    } catch (error) {
      console.error("error ", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSearchType(e.target.value);
  };
  console.log("여긴수납관리 전체리스트 데이터 ", displayedUserInfo);

  /** 검색 기능 함수 */
  const handleSearch = () => {
    let filterSearchData;

    if (searchType === "전체") {
      filterSearchData = originalUserInfo.filter(
        (item) =>
          item.claName.includes(searchText) ||
          item.userName.includes(searchText) ||
          item.issMonth.includes(searchText) ||
          item.couNo.toString().includes(searchText) ||
          item.payNo.toString().includes(searchText) ||
          item.parentTel.includes(searchText)
      );
    } else if (searchType === "이름") {
      filterSearchData = originalUserInfo.filter((item) =>
        item.userName.includes(searchText)
      );
    } else if (searchType === "반") {
      filterSearchData = originalUserInfo.filter((item) =>
        item.claName.includes(searchText)
      );
    } else if (searchType === "청구월") {
      filterSearchData = originalUserInfo.filter((item) =>
        item.issMonth.includes(searchText)
      );
    }

    setDisplayedUserInfo(filterSearchData);
  };

  const handleDelete = async () => {
    console.log("선택된 삭제 아이디들", selectedIds);
    try {
      const response = await axios.post(
        "https://eduventure.site:5443/payment/admin/bill/delete",
        { payNo: selectedIds },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      if (response.data && response.data.item) {
        alert("삭제가 완료되었습니다.");
        getUserInfo(); // 삭제 및 청구서 목록 업데이트
      }
    } catch (error) {
      console.log("삭제를 거절한다", error);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
        overflow: "hidden",
        backgroundColor: "#4A4F6B",
        position: "relative",
      }}
    >
      <div style={styles.titleContainer}>
        <Title subtitle="EduVenture" title="수납 관리" color="#ffffff" />
      </div>

      <div style={styles.buttonsAndSearchContainer}>
        <>
          <button style={styles.styleButton1} onClick={handleDelete}>
            선택 삭제
          </button>
          <Link to="/admin/receipt/register">
            <button style={styles.styleButton2}>수납 등록</button>
          </Link>
        </>
        <div style={styles.searchContainer}>
          <Dropdown onChange={handleDropdownChange}>
            <option value="전체">전체</option>
            <option value="이름">이름</option>
            <option value="반">반</option>
            <option value="청구월">청구월</option>
          </Dropdown>
          <SearchInput
            placeholder="검색어 입력"
            value={searchText}
            onChange={handleSearchChange}
          />
          <button style={styles.styleButton3} onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
      <ReceiptList
        userInfo={displayedUserInfo}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        getUserInfo={getUserInfo}
      />
    </div>
  );
};

export default ReceiptSelect;
