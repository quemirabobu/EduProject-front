import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InsertQuizBoard = () => {
  const uploadFiles = [];
  const navi = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [couNo, setCouNo] = useState("");
  const [claName, setClaName] = useState("");

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
    getCourseList();
    console.log(courseList);
  }, []);

  const changeFiles = useCallback((e) => {
    console.log(e.target.files);

    const fileList = Array.prototype.slice.call(e.target.files);

    fileList.forEach((file, index) => {
      imageLoader(file, index);
      uploadFiles.push(file);
    });
  }, []);

  //미리보기 메소드
  //미리보기 영역에 들어갈 img 태그 생성 및 선택된 파일을
  //Base 64 인코딩된 문자열 형태로 변환하여 미리보기 구현
  const imageLoader = (file, index) => {
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

      let img2 = document.createElement("img");
      img2.setAttribute("id", `img${index}`);
      img2.setAttribute("style", " width: 450px; z-index: none;");

      //이미지 파일인지 아닌지 체크
      if (file.name.toLowerCase().match(/(.*?)\.(jpg|jpeg|png|gif|svg|bmp)$/)) {
        img2.src = e.target.result;
      } else {
        img2.src = "images/defaultFileImg.png";
      }

      document.getElementById("imageZone").appendChild(img2);

      //미리보기 영역에 추가
      //미리보기 이미지 태그와 삭제 버튼 그리고 파일명을 표출하는 p태그
      //묶어주는 div를 만들어서 미리보기 영역에 추가
      document.getElementById("attZone").appendChild(makeDiv(img, file, index));
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
      //클릭된 버튼
      console.log(idx);
      console.log(e);
      console.log("btn.conclick의 본체");
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
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
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
      console.log(idx);
      console.log(img2);
      console.log("이것은 img2");

      if (img2) {
        img2.remove();
      }
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
      // 여기좀 이상함
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

  const insertBoard = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    console.log("이것이 폼 데이터");
    console.log(formData.get("claName"));
    //FormData를 객체로 만들어서
    //업로드되는 파일을 추가한 객체를 데이터로 전송
    const formDataObj = {};

    //기존 formData에 담긴 내용을 formDataObj에 담아주기
    formData.forEach((value, key) => (formDataObj[key] = value));

    //업로드 파일 객체에 추가
    formDataObj.uploadFiles = uploadFiles;

    const insertBoardAxios = async () => {
      try {
        const response = await axios.post(
          "https://eduventure.site:5443/quiz/board",
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
              "Content-Type": "multipart/form-data",
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

    insertBoardAxios();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#5AC467", height: "100%", minHeight: "100vh" }}
    >
      <form id="updateForm" onSubmit={insertBoard}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>퀴즈등록</h3>

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
                      <input type="text" name="boardTitle"></input>
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
                        readOnly
                        value={sessionStorage.getItem("userName")}
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
                        height: "320px",
                        width: "450px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></td>
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

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "3px",
                      }}
                    >
                      <textarea
                        name="boardContent"
                        cols="52"
                        rows="9"
                        style={{ padding: "4px" }}
                      ></textarea>
                    </div>
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
                        <input type="text" name="option1"></input>
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
                        <input type="text" name="option2"></input>
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
                        <input type="text" name="option3"></input>
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
                        <input type="text" name="option4"></input>
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
                        <select name="answer">
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
                            onChange={changeFiles}
                          ></input>
                          <div
                            id="attZone"
                            data-placeholder="파일을 첨부하려면 파일선택 버튼을 누르세요."
                          ></div>
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
                  등록
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

export default InsertQuizBoard;
