import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileList from "../components/QuizBoard/FileList";

const QuizBoardEdit = () => {
  const { boardNo } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const [boardFileList, setBoardFileList] = useState(null);
  const [originFileList, setOriginFileList] = useState([]);
  const [changeFileList, setChangeFileList] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);

  const [courseList, setCourseList] = useState([]);
  const [couNo, setCouNo] = useState("");
  const [claName, setClaName] = useState("");

  const [grossSample, setGrossSample] = useState("");
  const [grossRightAnswer, setGrossRightAnswer] = useState("");
  const [answer, setAnswer] = useState("");

  const getCourseList = async () => {
    try {
      console.log("코스리스트갖고오는엑시오스 들어간다");
      // const response = await axios.get('/NoticeTest.json');
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      console.log(response);
      console.log("위에껀 리스폰스");
      if (response.data && response.data.items) {
        setCourseList(response.data.items);
      }
      console.log("이건 코스리스트");
      console.log(courseList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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

        console.log(response);
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

    getBoard();
    getCourseList();
    console.log(courseList);
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

  const addFiles = useCallback((e) => {
    const fileList = Array.prototype.slice.call(e.target.files);

    setUploadFiles(() => e.target.files);

    fileList.forEach((file, index) => {
      imageLoader(file, index);
    });
  }, []);
  const percentage =
    grossSample === 0 ? 0 : ((grossRightAnswer / grossSample) * 100).toFixed(0);
  const deleteBoard = useCallback((e) => {
    e.preventDefault();

    const deleteBoardAxios = async () => {
      try {
        const response = await axios.delete(
          `https://eduventure.site:5443/quiz/board/${boardNo}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );

        console.log(response);

        if (response.data && response.data.item.msg) {
          alert(response.data.item.msg);
          navi("/quizboard-list");
        }
      } catch (e) {
        console.log(e);
      }
    };

    deleteBoardAxios();
  }, []);

  //미리보기 메소드
  //미리보기 영역에 들어갈 img 태그 생성 및 선택된 파일을
  //Base 64 인코딩된 문자열 형태로 변환하여 미리보기 구현
  const imageLoader = (file, index) => {
    console.log(file);
    console.log("this is file");
    let reader = new FileReader();

    reader.onload = (e) => {
      //이미지 표출할 img 태그 생성
      let img = document.createElement("img");
      img.setAttribute("style", "width: 100%; height: 100%; z-index: none;");

      //이미지 파일인지 아닌지 체크
      if (file.name.toLowerCase().match(/(.*?)\.(jpg|jpeg|png|gif|svg|bmp)$/)) {
        img.src = e.target.result;
      } else {
        img.src = "images/defaultFileImg.png";
      }
      console.log(e.target.result);
      console.log("e.target.result");

      let img2 = document.createElement("img");
      img2.setAttribute("id", `img${index}`);
      img2.setAttribute("style", "width: 100%; height: 100%; z-index: none;");

      //이미지 파일인지 아닌지 체크
      if (file.name.toLowerCase().match(/(.*?)\.(jpg|jpeg|png|gif|svg|bmp)$/)) {
        img2.src = e.target.result;
      } else {
        img2.src = "images/defaultFileImg.png";
      }

      //미리보기 영역에 추가
      //미리보기 이미지 태그와 삭제 버튼 그리고 파일명을 표출하는 p태그
      //묶어주는 div를 만들어서 미리보기 영역에 추가
      document.getElementById("attZone").appendChild(makeDiv(img, file, index));

      document.getElementById("imageZone").appendChild(img2);
    };

    //파일을 BASE 64 인코딩 문자열로 변경
    reader.readAsDataURL(file);
  };

  //미리보기 영역에 들어갈 div 생성하는 메소드
  const makeDiv = (img, file, idx) => {
    console.log(idx);
    //div 태그 생성
    let div = document.createElement("div");

    div.setAttribute(
      "style",
      "display: inline-block;" +
        " position: relative;" +
        " width: 150px; height: 120px;" +
        " margin: 5px; border: 1px solid #00f; z-index: 1"
    );

    //잘못 올렸을 경우 삭제할 수 있는 버튼 생성
    let btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "x");
    btn.setAttribute("delFile", file.name);
    btn.setAttribute(
      "style",
      "width: 30px; height: 30px;" +
        " position: absolute; right: 0px; bottom: 0px;" +
        " z-index: 999; background-color: rgba(255, 255, 255, 0.1);" +
        " color: #f00;"
    );

    //버튼 이벤트 생성
    //버튼 클릭하면 해당 파일삭제 기능 구현
    btn.onclick = (e) => {
      console.log(idx);
      console.log(e);
      console.log("btn.conclick의 본체");
      console.log(e.target);
      //클릭된 버튼
      const ele = e.target;

      const delFile = ele.getAttribute("delFile");

      for (let i = 0; i < uploadFiles.length; i++) {
        //배열에 담겨있는 파일중 파일명이 같은 파일 삭제
        if (delFile === uploadFiles[i].name) {
          //배열에서 i번째 하나 제거
          uploadFiles.splice(i, 1);
        }
      }

      //버튼 클릭 시 btnAtt 인풋에서도 첨부된 파일 삭제
      //input type="file"은 첨부된 파일을 fileList의 형태로 관리
      //fileList에는 일반적인 File 객체를 넣을 수 없다.
      //DataTransfer라는 클래스를 이용해서 완전한 fileList 형태로 만들어서
      //input.files에 넣어줘야 한다.

      const dt = new DataTransfer();

      uploadFiles.forEach((file) => dt.items.add(file));

      document.getElementById("btnAtt").files = dt.files;

      //해당 img 태그를 담고 있는 div 삭제
      const parentDiv = ele.parentNode;
      parentDiv.remove();

      const parentDivId = parentDiv.getAttribute("id");
      const imageId = parentDivId + `image`;
      console.log(imageId);
      console.log("이것이 imgId");
      const imageDiv = document.getElementById(`img`);
      // const imageDiv = document.getElementById(`img${boardFileNo}`);
      if (imageDiv) {
        imageDiv.remove();
      }
      let img2 = document.getElementById(`img${idx}`);
      if (img2) {
        img2.remove();
      }
    };

    //파일명 표출할 p태그 생성
    const fName = document.createElement("p");
    fName.setAttribute("style", "display: inline-block; font-size: 8px;");
    fName.textContent = file.name;

    //div에 하나씩 추가
    div.appendChild(img);
    div.appendChild(btn);
    div.appendChild(fName);

    //완성된 div 리턴
    return div;
  };

  const addChangeFile = (file) => {
    setChangeFileList((prev) => prev.concat(file));
  };

  const changeOriginFile = (boardFileNo, status, newFileName) => {
    if (status === "U") {
      setOriginFileList(() =>
        originFileList.map((originFile) =>
          originFile.boardFileNo === boardFileNo
            ? {
                ...originFile,
                boardFileStatus: "U",
                newFileName: newFileName,
              }
            : originFile
        )
      );
    } else if (status === "D") {
      setOriginFileList(() =>
        originFileList.map((originFile) =>
          originFile.boardFileNo === boardFileNo
            ? {
                ...originFile,
                boardFileStatus: "D",
              }
            : originFile
        )
      );
    }
  };

  const updateBoard = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const formDataObj = {};

      formData.forEach((value, key) => (formDataObj[key] = value));

      const sendFormData = new FormData();

      sendFormData.append(
        "quizBoardDTO",
        new Blob([JSON.stringify(formDataObj)], {
          type: "application/json",
        })
      );

      Array.from(uploadFiles).forEach((el) => {
        sendFormData.append("uploadFiles", el);
      });

      Array.from(changeFileList).forEach((el) => {
        sendFormData.append("changeFileList", el);
      });

      sendFormData.append("originFileList", JSON.stringify(originFileList));

      const updateBoardAxios = async () => {
        try {
          const response = await axios.put(
            "https://eduventure.site:5443/quiz/board",
            sendFormData,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response);

          if (response.data && response.data.item.board) {
            alert("정상적으로 수정되었습니다.");
            setBoard(() => response.data.item.board);
            setClaName(() => response.data.item.board.claName);
            setBoardFileList(() => response.data.item.boardFileList);
            navi("/quizboard-list");
          }
        } catch (e) {
          console.log(e);
        }
      };

      updateBoardAxios();
    },
    [board, boardFileList, uploadFiles, originFileList, changeFileList]
  );

  const changeTitle = useCallback((e) => {
    setBoard((prev) => ({ ...prev, boardTitle: e.target.value }));
  }, []);

  const changeOption1 = useCallback((e) => {
    setBoard((prev) => ({ ...prev, option1: e.target.value }));
  }, []);

  const changeOption2 = useCallback((e) => {
    setBoard((prev) => ({ ...prev, option2: e.target.value }));
  }, []);
  const changeOption3 = useCallback((e) => {
    setBoard((prev) => ({ ...prev, option3: e.target.value }));
  }, []);
  const changeOption4 = useCallback((e) => {
    setBoard((prev) => ({ ...prev, option4: e.target.value }));
  }, []);

  const changeAnswer = useCallback((e) => {
    setBoard((prev) => ({ ...prev, answer: e.target.value }));
  }, []);

  const changeContent = useCallback((e) => {
    setBoard((prev) => ({ ...prev, boardContent: e.target.value }));
  }, []);
  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      <form id="updateForm" onSubmit={updateBoard}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>퀴즈수정 {board ? board.boardTitle : ""}</h3>

          <div
            id={"all_part"}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              id={"question_part"}
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
                      <input
                        type="text"
                        name="boardTitle"
                        id="boardTitle"
                        value={board ? board.boardTitle : ""}
                        onChange={(e) => {
                          changeTitle(e);
                          console.log(claName);
                          console.log("야이자식아");
                        }}
                      ></input>
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
                      작성자
                    </td>
                    <td style={{ textAlign: "center", fontWeight: "bold" }}>
                      <input
                        type="text"
                        name="boardWriter"
                        id="boardWriter"
                        readOnly
                        value={board ? board.boardWriter : ""}
                      ></input>

                      <input
                        type="hidden"
                        name="boardRegdate"
                        id="boardRegdate"
                        readOnly
                        value={board ? board.boardRegdate : ""}
                      ></input>

                      <input
                        type="hidden"
                        name="boardNo"
                        id="boardNo"
                        readOnly
                        value={board ? board.boardNo : ""}
                      ></input>

                      <input
                        type="hidden"
                        name="grossSample"
                        id="grossSample"
                        readOnly
                        value={board ? board.grossSample : ""}
                      ></input>
                      <input
                        type="hidden"
                        name="grossRightAnswer"
                        id="grossRightAnswer"
                        readOnly
                        value={board ? board.grossRightAnswer : ""}
                      ></input>
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
                      <select
                        name="claName"
                        value={claName}
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          console.log("Selected value:", e.target.value);
                          console.log("Selected ID:", selectedOption.id);
                          setClaName(e.target.value);
                          setCouNo(selectedOption.id);
                        }}
                      >
                        {courseList.map((course, index) => (
                          <option
                            key={index}
                            value={course.claName}
                            id={course.couNo}
                          >
                            {course.claName}
                          </option>
                        ))}
                      </select>
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
                        boardFileList.map((boardFile) => (
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

                    <textarea
                      style={{ marginLeft: "", padding: "7px" }}
                      name="boardContent"
                      id="boardContent"
                      cols="71"
                      rows="9"
                      value={board ? board.boardContent : ""}
                      onChange={changeContent}
                    ></textarea>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              id={"answersheet"}
              style={{
                marginTop: "10px",
                width: "400px",
                height: "560px",
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                <div>어려울지도 모르니 천천히 풀어보세요</div>
                <div>기회는 무제한으로 있답니다</div>
              </div>
              <div style={{ height: "9px" }}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "black" }}>정답률 : </span> {percentage}
                  %<p></p>
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

                <div style={{ height: "9px" }}></div>

                <table>
                  <div
                    style={{
                      height: "160px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      borderRadius: "20px",
                    }}
                  >
                    <tr
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <td style={{ textAlign: "right", color: "#045904" }}>
                        1번
                      </td>
                      <label style={{}}>
                        <input
                          type="text"
                          name="option1"
                          value={board ? board.option1 : ""}
                          onChange={changeOption1}
                        ></input>
                      </label>
                    </tr>

                    <tr
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <td style={{ textAlign: "right", color: "#045904" }}>
                        2번
                      </td>

                      <label>
                        <input
                          type="text"
                          name="option2"
                          value={board ? board.option2 : ""}
                          onChange={changeOption2}
                        ></input>
                      </label>
                    </tr>

                    <tr
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <td style={{ textAlign: "right", color: "#045904" }}>
                        3번
                      </td>

                      <label>
                        <input
                          type="text"
                          name="option3"
                          value={board ? board.option3 : ""}
                          onChange={changeOption3}
                        ></input>
                      </label>
                    </tr>

                    <tr
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <td style={{ textAlign: "right", color: "#045904" }}>
                        4번
                      </td>

                      <label>
                        <input
                          type="text"
                          name="option4"
                          value={board ? board.option4 : ""}
                          onChange={changeOption4}
                        ></input>
                      </label>
                    </tr>

                    {/*<div id={"AnswerAndAttatchedFile"} style={{width:"400px", display:"flex", flexDirection:"column"}}>*/}
                    <tr
                      style={{
                        width: "84%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <td
                        style={{
                          background: "",
                          width: "40px",
                          textAlign: "left",
                        }}
                      >
                        정답:
                      </td>

                      <td
                        style={{
                          textAlign: "left",
                          width: "100px",
                          marginLeft: "-7px",
                        }}
                      >
                        <select
                          name="answer"
                          value={board ? board.answer : ""}
                          onChange={changeAnswer}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </td>
                    </tr>
                  </div>
                  <div style={{ height: "9px" }}></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <tr
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",

                        border: "solid green 2px",
                        height: "200px",
                        justifyContent: "center",
                        borderRadius: "20px",
                      }}
                    >
                      <td
                        style={{
                          background: "",
                          width: "90px",
                          textAlign: "right",
                        }}
                      >
                        첨부파일 :
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <div id="image_preview">
                          <input
                            type="file"
                            id="btnAtt"
                            name="uploadFiles"
                            multiple
                            onChange={addFiles}
                          ></input>
                          <input
                            type="file"
                            id="changedFiles"
                            name="changedFiles"
                            style={{ display: "none" }}
                            multiple
                          ></input>
                          <p style={{ color: "red", fontSize: "0.9rem" }}></p>
                          <div id="attZone">
                            {boardFileList ? (
                              <FileList
                                boardFileList={boardFileList}
                                addChangeFile={addChangeFile}
                                changeOriginFile={changeOriginFile}
                              ></FileList>
                            ) : null}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </div>
                  {/*</div>*/}
                </table>
              </div>
              <div style={{ height: "12px" }}></div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  type="submit"
                  id="btnUpdate"
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "6px",
                    marginRight: "10px",
                    fontWeight: "bold",
                  }}
                >
                  수정
                </button>

                <button
                  type="submit"
                  id="btnUpdate"
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                  onClick={deleteBoard}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>

          <hr />
        </div>
      </form>
      {/*<Link to="/insert-quizboard">글 등록</Link>*/}
      {/*<Link to="#" id="btnDelete" onClick={deleteBoard}>글 삭제</Link>*/}
      {/*<Link to="/quizboard-list">글 목록</Link>*/}
    </div>
  );
};

export default QuizBoardEdit;
