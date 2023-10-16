import React from "react";
import { Link, useNavigate } from "react-router-dom";

const QuizBoardListItem = ({ board, userType }) => {
  const navi = useNavigate();

  const {
    boardNo,
    boardTitle,
    boardContent,
    claName,
    boardWriter,
    boardRegdate,
    boardCnt,
    grossSample,
    grossRightAnswer,
  } = board;
  const percentage =
    grossSample === 0 ? 0 : ((grossRightAnswer / grossSample) * 100).toFixed(0);

  return (
    <tr style={{ height: "50px", borderBottom: "solid #e1e7e1 1px" }}>
      <td
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#2d8600",
          cursor: "pointer",
        }}
        onClick={() => navi(`/quizboard/${boardNo}`)}
      >
        <span>
          {" "}
          <img
            style={{ height: "20px", width: "20px" }}
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FReKZG%2Fbtsr0XiACeQ%2FEsOaI96CwmArEx8mBAvMxK%2Fimg.png"
            alt=""
          />
        </span>
        {boardTitle}
      </td>

      <td
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#5f6064",
        }}
      >
        {claName}
      </td>
      <td style={{ textAlign: "center", fontSize: "18px", color: "#114b01" }}>
        {boardWriter}
      </td>

      <td style={{ textAlign: "center" }}>
        <div
          style={{
            color:
              percentage <= 20
                ? "red"
                : percentage <= 50
                ? "orange"
                : percentage <= 80
                ? "green"
                : "blue",
          }}
        >
          {percentage}%
        </div>
        <div
          style={{
            background: "lightgray",
            height: "10px",
            position: "relative",
            width: "90%",
            marginLeft: "6px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              background:
                percentage <= 20
                  ? "red"
                  : percentage <= 50
                  ? "orange"
                  : percentage <= 80
                  ? "green"
                  : "blue",
              height: "100%",
              borderRadius: "10px",
              width: `${percentage}%`,
            }}
          />
        </div>
      </td>

      <td style={{ textAlign: "center", fontSize: "18px", color: "#114b01" }}>
        {boardRegdate.split("T")[0]}
      </td>

      {(userType === "teacher" || userType === "admin") && (
        <td
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <button
            style={{
              height: "26px",
              backgroundColor: "rgba(184,225,171,0.7)",
              borderRadius: "4px",
              marginTop: "13px",
            }}
            onClick={() => navi(`/edit-quizboard/${boardNo}`)}
          >
            수정
          </button>
        </td>
      )}
    </tr>
  );
};

export default QuizBoardListItem;
