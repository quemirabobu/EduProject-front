import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizBoardListItem from "../components/QuizBoard/QuizBoardListItem";
import Pagination from "../components/QuizBoard/Pagination";

const QuizBoardList = () => {
  const navi = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchCondition, setSearchCondition] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [user, setUser] = useState({});
  const [score, setUserScore] = useState(0);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `https://eduventure.site:5443/user/getuserbytoken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );

        if (response.data && response.data.item) {
          setUser(response.data.item);
          setUserScore(response.data.item.userScore);
          setUserType(response.data.item.userType);
        }
      } catch (e) {
        console.log("토큰으로 사람 불러오는거 실패함", e);
      }
    };

    const getBoardList = async () => {
      try {
        const response = await axios.get(
          "https://eduventure.site:5443/quiz/board-list",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
            params: {
              page: page,
              searchCondition: searchCondition,
              searchKeyword: searchKeyword,
            },
          }
        );
        if (response.data && response.data.pageItems.content) {
          setBoardList(() => response.data.pageItems.content);
          setTotalPages(() => response.data.pageItems.totalPages);
          setPageNumber(() => response.data.pageItems.pageable.pageNumber);
          setPageSize(() => response.data.pageItems.pageable.pageSize);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getBoardList();
    getUser();
  }, [page]);

  const clickPrevNext = (num) => {
    setPage((prev) => prev + num);
  };

  const changePage = (num) => {
    setPage(() => num - 1);
  };

  const changeSearchCondition = (e) => {
    setSearchCondition(() => e.target.value);
  };

  const changeSearchKeyword = (e) => {
    setSearchKeyword(() => e.target.value);
  };

  const searchFormSubmit = (e) => {
    e.preventDefault();

    setPage(() => 0);

    const searchAxios = async () => {
      try {
        const response = await axios.get(
          "https://eduventure.site:5443/quiz/board-list",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
            params: {
              page: page,
              searchCondition: searchCondition,
              searchKeyword: searchKeyword,
            },
          }
        );

        if (response.data && response.data.pageItems.content) {
          setBoardList(() => response.data.pageItems.content);
          setTotalPages(() => response.data.pageItems.totalPages);
          setPageNumber(() => response.data.pageItems.pageable.pageNumber);
          setPageSize(() => response.data.pageItems.pageable.pageSize);
        }
      } catch (e) {
        console.log(e);
      }
    };

    searchAxios();
  };
  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          paddingTop: "40px",
          paddingLeft: "70px",
        }}
      >
        <h1>수업 퀴즈 게시판</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ backgroundColor: "white" }}></div>
        <div style={{ background: "" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",

              paddingRight: "20px",
              marginBottom: "10px",
            }}
          >
            {(userType === "teacher" || userType === "admin") && (
              <button
                type="button"
                style={{
                  borderRadius: "10px",
                  height: "30px",
                  width: "100px",
                  color: "#1a5e02",
                  fontWeight: "bold",
                }}
                onClick={() => navi("/insert-quizboard")}
              >
                퀴즈 등록
              </button>
            )}
          </div>

          <form
            id="searchForm"
            onSubmit={searchFormSubmit}
            style={{
              display: "flex",
              justifyContent: "end",

              paddingRight: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginRight: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {" "}
              나의 퀴즈 스코어 :{" "}
              <span style={{ color: "#0c4fc5" }}>{score} </span>
            </div>

            <table
              style={{
                width: "700px",
                borderCollapse: "separate",
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: "#c5efb9",
                height: "40px",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ marginRight: "10px" }}>
                      <select
                        name="searchCondition"
                        value={searchCondition}
                        onChange={changeSearchCondition}
                        style={{ marginRight: "7px" }}
                      >
                        <option value="all">전체</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                      </select>
                      <input
                        type="text"
                        name="searchKeyword"
                        value={searchKeyword}
                        onChange={changeSearchKeyword}
                        style={{ marginRight: "7px" }}
                      ></input>
                      <button type="submit" id="btnSearch">
                        검색
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {/*여기까지 서치폼*/}
          <p></p>
          <table
            id="boardTable"
            style={{
              width: "1100px",
              borderCollapse: "collapse",
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          >
            <tbody>
              <tr style={{}}>
                <th
                  style={{
                    background: "#c5efb9",
                    width: "800px",
                    height: "40px",
                    color: "rgb(52,94,2)",
                    borderTopLeftRadius: "10px",
                    fontSize: "18px",
                  }}
                >
                  제목
                </th>
                <th
                  style={{
                    background: "#c5efb9",
                    width: "800px",
                    height: "40px",
                    color: "#144107",
                    fontSize: "18px",
                  }}
                >
                  반
                </th>
                <th
                  style={{
                    background: "#c5efb9",
                    width: "150px",
                    height: "40px",
                    color: "#144107",
                    fontSize: "18px",
                  }}
                >
                  작성자
                </th>

                <th
                  style={{
                    background: "#c5efb9",
                    width: "400px",
                    height: "40px",
                    color: "#144107",
                    fontSize: "18px",
                  }}
                >
                  정답률
                </th>
                <th
                  style={{
                    background: "#c5efb9",
                    width: "450px",
                    height: "40px",
                    color: "#144107",
                    fontSize: "18px",
                  }}
                >
                  등록일
                </th>
                {(userType === "teacher" || userType === "admin") && (
                  <th
                    style={{
                      background: "#c5efb9",
                      width: "150px",
                      height: "40px",
                      color: "#144107",
                      borderTopRightRadius: "10px",
                      fontSize: "18px",
                    }}
                  >
                    조작
                  </th>
                )}
              </tr>
              {boardList &&
                boardList.map((board) => (
                  <QuizBoardListItem
                    key={board.boardNo}
                    userType={userType}
                    board={board}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <br />
        <Pagination
          totalPages={totalPages}
          pageNumber={pageNumber}
          pageSize={pageSize}
          clickPrevNext={clickPrevNext}
          changePage={changePage}
        />
        <br />
      </div>
    </div>
  );
};

export default QuizBoardList;
