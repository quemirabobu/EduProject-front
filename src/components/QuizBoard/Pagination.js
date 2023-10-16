import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({
  totalPages,
  pageNumber,
  pageSize,
  clickPrevNext,
  changePage,
}) => {
  const [pageArr, setPageArr] = useState([]);

  useEffect(() => {
    const startPage = Math.floor(pageNumber / pageSize) * pageSize + 1;
    const tempEndPage = startPage + pageSize - 1;
    const endPage = tempEndPage > totalPages ? totalPages : tempEndPage;

    const tempArr = [];

    for (let i = startPage; i <= endPage; i++) {
      tempArr.push(i);
    }

    setPageArr(() => tempArr);
  }, [totalPages, pageNumber, pageSize]);

  return (
    <div style={{ textAlign: "center" }}>
      <ul className="pagination">
        <div className="pagination-btn">
          <div
            style={{
              height: "24px",
              width: "40px",
              border: "solid green 1px",
              fontWeight: "bold",
              backgroundColor: "#e1e7e1",
              cursor: "pointer",
              borderRadius: "5px",
              color: "green",
              textAlign: "center",
            }}
            onClick={(e) => {
              e.preventDefault();
              clickPrevNext(-1);
            }}
          >
            이전
          </div>
        </div>

        <div
          className="pagination-btn"
          style={{ cursor: "pointer", display: "flex", flexDirection: "row" }}
        >
          {pageArr &&
            pageArr.map((num) => (
              <div
                key={num}
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  color: num === pageNumber + 1 ? "white" : "green",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(num);
                }}
              >
                {num}
              </div>
            ))}
        </div>

        <div className="pagination-btn">
          <div
            style={{
              height: "24px",
              width: "40px",
              border: "solid green 1px",
              fontWeight: "bold",
              backgroundColor: "#e1e7e1",
              cursor: "pointer",
              borderRadius: "5px",
              color: "green",
              textAlign: "center",
            }}
            onClick={(e) => {
              e.preventDefault();
              clickPrevNext(1);
            }}
          >
            다음
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
