import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

function QuizBoard() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const { boardNo } = useParams();
  const [board, setBoard] = useState(null);
  const [boardFileList, setBoardFileList] = useState(null);
  const [originFileList, setOriginFileList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [quizHistory, setQuizHistory] = useState({});
  const [userQuizId, serUserQuizId] = useState("");

  const [claName, setClaName] = useState("");
  const [userId, setUserId] = useState("");
  const [grossSample, setGrossSample] = useState("");
  const [grossRightAnswer, setGrossRightAnswer] = useState("");
  const [user, setUser] = useState({});
  const [correctPcnt, setCorrectPcnt] = useState(0);
  const [score, setUserScore] = useState(0);
  const [answersheetHeight, setAnswersheetHeight] = useState("560px");
  const questionPartRef = useRef(null);

  const getCourseList = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      if (response.data && response.data.items) {
        setCourseList(response.data.items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseuser = await axios.post(
          `https://eduventure.site:5443/user/getuserbytoken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );

        if (responseuser.data && responseuser.data.item) {
          setUser(responseuser.data.item);
          setUserScore(responseuser.data.item.userScore);
          setUserId(responseuser.data.item.id);

          const getQuizHistory = async () => {
            try {
              const response = await axios.post(
                "https://eduventure.site:5443/quiz/getallquizhistory",
                { boardNo: boardNo, id: responseuser.data.item.id }, // 요청 본문에 boardNo를 넣어서 보냅니다.
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "ACCESS_TOKEN"
                    )}`,
                  },
                }
              );
              if (response.data && response.data.item) {
                setQuizHistory(response.data.item);
                serUserQuizId(response.data.item.id);
              }
            } catch (e) {
              console.log(e);
            }
          };
          getQuizHistory();
        }
      } catch (e) {
        console.log("토큰으로 사람 불러오는거 실패함", e);
      }
    };

    const getBoard = async () => {
      try {
        const response = await axios.get(
          `https://eduventure.site:5443/quiz/board/${boardNo}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        if (response.data && response.data.item.board) {
          setBoard(() => response.data.item.board);
          setClaName(() => response.data.item.board.claName);
          setGrossSample(() => response.data.item.board.grossSample);
          setGrossRightAnswer(() => response.data.item.board.grossRightAnswer);
          setBoardFileList(() => response.data.item.boardFileList);
          setAnswer(() => response.data.item.board.answer);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCourseList();
    getBoard();
    getUser();
    if (questionPartRef.current) {
      const height = questionPartRef.current.offsetHeight + "px";
      setAnswersheetHeight(height);
    }
  }, []);

  useEffect(() => {
    boardFileList &&
      boardFileList.forEach((boardFile) => {
        const originBoardFile = {
          boardNo: board.boardNo,
          boardFileNo: boardFile.boardFileNo,
          boardFileName: boardFile.boardFleName,
          boardFileStatus: "N",
        };

        setOriginFileList((prev) => prev.concat(originBoardFile));
      });
  }, [boardFileList]);

  useEffect(() => {
    const percentage =
      grossSample === 0
        ? 0
        : ((grossRightAnswer / grossSample) * 100).toFixed(0);
    setCorrectPcnt(percentage);
  }, [grossSample, grossRightAnswer]);

  useEffect(() => {
    setUserScore(score);
  }, [score]);

  useEffect(() => {}, [quizHistory]);

  const SubmitAnswer = useCallback(
    (e) => {
      e.preventDefault();

      const RegisterQuizHistory = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/quiz/registerquizhistory",
            { boardNo: board.boardNo, id: user.id }, // 요청 본문에 boardNo를 넣어서 보냅니다.
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (response.data && response.data.item) {
            setBoard(() => response.data.item);
            setClaName(() => response.data.item.claName);
            setGrossSample(() => response.data.item.grossSample);

            serUserQuizId(() => response.data.item.id);

            setGrossRightAnswer(() => response.data.item.grossRightAnswer);
            setAnswer(() => response.data.item.answer);
            //navi(`/quizboard/${boardNo}`);
          }
        } catch (e) {
          console.log(e);
        }
      };

      const QuizAnswerSubmitOK = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/quiz/answerright",
            { boardNo: board.boardNo }, // 요청 본문에 boardNo를 넣어서 보냅니다.
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (response.data && response.data.item) {
            setBoard(() => response.data.item);
            setClaName(() => response.data.item.claName);
            setGrossSample(() => response.data.item.grossSample);
            setGrossRightAnswer(() => response.data.item.grossRightAnswer);
            setAnswer(() => response.data.item.answer);
            //navi(`/quizboard/${boardNo}`);
          }
        } catch (e) {
          console.log(e);
        }
      };
      const getUser = async () => {
        try {
          const response = await axios.post(
            `https://eduventure.site:5443/user/getuserbytoken`,
            {},
            {
              // const response = await axios.post(`https://eduventure.site:5443/quiz/board/${boardNo}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );

          if (response.data && response.data.item) {
            setUser(response.data.item);
            setUserScore(response.data.item.userScore);
          }
        } catch (e) {
          console.log("토큰으로 사람 불러오는거 실패함", e);
        }
      };
      const IncreaseUserScore = async () => {
        try {
          const response = await axios.post(
            `https://eduventure.site:5443/quiz/increaseuserscore`,
            {},
            {
              // const response = await axios.post(`https://eduventure.site:5443/quiz/board/${boardNo}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );

          if (response.data && response.data.item) {
            setUser(response.data.item);
          }
        } catch (e) {
          console.log(e);
        }

        getUser();
      };

      const QuizAnswerSubmitWrong = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/quiz/answerwrong",
            { boardNo: board.boardNo }, // 요청 본문에 boardNo를 넣어서 보냅니다.
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (response.data && response.data.item) {
            setBoard(() => response.data.item);
            setClaName(() => response.data.item.claName);
            setGrossSample(() => response.data.item.grossSample);
            setGrossRightAnswer(() => response.data.item.grossRightAnswer);
            setAnswer(() => response.data.item.answer);
            // navi('/quizboard-list');
          }
        } catch (e) {
          console.log(e);
        }
      };

      const getQuizHistory = async () => {
        try {
          const response = await axios.post(
            "https://eduventure.site:5443/quiz/getallquizhistory",
            { boardNo: boardNo, id: userId }, // 요청 본문에 boardNo를 넣어서 보냅니다.
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (response.data && response.data.item) {
            setQuizHistory(response.data.item);
            serUserQuizId(response.data.item.id);

            //navi(`/quizboard/${boardNo}`);
          }
        } catch (e) {
          console.log(e);
        }
      };

      if (selectedValue == answer) {
        alert("맞췄습니다!");

        QuizAnswerSubmitOK();
        IncreaseUserScore();
        RegisterQuizHistory();
        getQuizHistory();
      } else {
        alert("틀렸습니다 다시 해보세요");
        QuizAnswerSubmitWrong();
        RegisterQuizHistory();
        getQuizHistory();
      }
    },
    [selectedValue, userQuizId]
  );

  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      <form id="updateForm" onSubmit={SubmitAnswer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>퀴즈풀기 {board ? board.boardTitle : ""}</h3>

          <div
            id={"all_part"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              id={"question_part"}
              ref={questionPartRef}
              style={{
                border: "solid green 4px",
                borderRadius: "20px",
                margin: "10px",
                backgroundColor: "#cef8ce",
              }}
            >
              <table style={{ borderCollapse: "separate" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        background: "#46a629",
                        width: "70px",
                        borderTopLeftRadius: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      제목
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <p
                        type="text"
                        id="boardTitle"
                        style={{ fontWeight: "bold" }}
                      >
                        {board ? board.boardTitle : ""}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        background: "#46a629",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      선생님
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      <p
                        type="text"
                        name="boardWriter"
                        id="boardWriter"
                        readOnly
                      >
                        {board ? board.boardWriter : ""}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        background: "#46a629",
                        width: "70px",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      반이름
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <p style={{ fontWeight: "bold" }}>{claName}</p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        background: "#46a629",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      퀴즈 내용
                    </td>
                    <td
                      id={"imageZone"}
                      style={{
                        width: "600px",
                        height: "331px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {boardFileList &&
                        boardFileList.map((boardFile, index) => (
                          <div
                            key={index}
                            style={{
                              height: "331px",
                              width: "600px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              key={boardFile.boardFileNo}
                              style={{
                                height: "auto",
                                maxWidth: "600px",
                                zIndex: "none",
                                cursor: "pointer",
                              }}
                              className="fileImg"
                              id={`img${boardFile.boardFileNo}` + "image"}
                              src={`${boardFile.boardFilePath}`}
                            />
                          </div>
                        ))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        background: "#46a629",
                        borderBottomLeftRadius: "15px",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      내용
                    </td>
                    <td style={{ width: "600px" }}>
                      <div style={{ width: "600px" }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            marginLeft: "10px",
                            marginRight: "7px",
                          }}
                        >
                          {board ? board.boardContent : ""}{" "}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              id={"answersheet"}
              style={{
                marginTop: "10px",
                width: "400px",
                height: answersheetHeight,
                flexDirection: "column",
                border: "solid green 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#cef8ce",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  flexDirection: "column",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  나의 퀴즈 스코어 :{" "}
                  <span style={{ color: "blue" }}>{score}</span>
                </div>
                <div style={{ height: "10px" }}></div>
                <div style={{ textAlign: "right" }}>
                  ___________________ 작성자:{" "}
                  <span
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {sessionStorage.getItem("userName")}
                  </span>
                </div>
              </div>
              <p></p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <div>어려울지도 모르니 천천히 풀어보세요</div>
                <div>기회는 무제한으로 있답니다</div>
              </div>
              <div style={{ height: "9px" }}></div>
              <div>
                <div
                  style={{
                    color:
                      correctPcnt <= 20
                        ? "red"
                        : correctPcnt <= 50
                        ? "orange"
                        : correctPcnt <= 80
                        ? "green"
                        : "blue",
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "black" }}>정답률 : </span>{" "}
                  {correctPcnt}%<p></p>
                </div>
                <div
                  style={{
                    background: "lightgray",
                    height: "10px",
                    position: "relative",
                    width: "300px",
                    marginLeft: "6px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      background:
                        correctPcnt <= 20
                          ? "red"
                          : correctPcnt <= 50
                          ? "orange"
                          : correctPcnt <= 80
                          ? "green"
                          : "blue",
                      height: "100%",
                      borderRadius: "10px",
                      width: `${correctPcnt}%`,
                    }}
                  />
                </div>

                <p></p>

                <table>
                  <tr style={{ width: "100%", textAlign: "left" }}>
                    <td style={{ textAlign: "right", color: "#045904" }}>
                      1번
                    </td>
                    <label style={{}}>
                      <input
                        type="radio"
                        name="answer"
                        value="1"
                        checked={selectedValue === "1"}
                        onChange={handleChange}
                      />{" "}
                      {board ? board.option1 : ""}
                    </label>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "right", color: "#045904" }}>
                      2번
                    </td>

                    <label>
                      <input
                        type="radio"
                        name="answer"
                        value="2"
                        checked={selectedValue === "2"}
                        onChange={handleChange}
                      />{" "}
                      {board ? board.option2 : ""}
                    </label>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "right", color: "#045904" }}>
                      3번
                    </td>

                    <label>
                      <input
                        type="radio"
                        name="answer"
                        value="3"
                        checked={selectedValue === "3"}
                        onChange={handleChange}
                      />{" "}
                      {board ? board.option3 : ""}
                    </label>
                  </tr>

                  <tr>
                    <td style={{ textAlign: "right", color: "#045904" }}>
                      4번
                    </td>

                    <label>
                      <input
                        type="radio"
                        name="answer"
                        value="4"
                        checked={selectedValue === "4"}
                        onChange={handleChange}
                      />{" "}
                      {board ? board.option4 : ""}
                    </label>
                  </tr>
                </table>
              </div>
              <p></p>

              {userQuizId ? (
                <p style={{ color: "red" }}>이미 푼 문제입니다.</p>
              ) : (
                <button
                  type="submit"
                  id="btnUpdate"
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "6px",
                  }}
                >
                  제출
                </button>
              )}
            </div>
          </div>

          <hr />
        </div>
      </form>
    </div>
  );
}

export default QuizBoard;
