import React from "react";

const FileList = ({ boardFileList, addChangeFile, changeOriginFile }) => {
  const openFileInput = (boardFileNo) => {
    const fileInput = document.getElementById(`changeFile${boardFileNo}`);
    fileInput.click();
  };

  const changeBoardFile = (e, boardFileNo) => {
    console.log(e.target);
    const fileList = Array.prototype.slice.call(e.target.files);
    console.log("이건 FILElist");
    console.log(fileList);
    console.log("this is changeFile");
    const changeFile = fileList[0];
    console.log(changeFile);
    addChangeFile(changeFile);

    changeOriginFile(boardFileNo, "U", changeFile.name);

    const reader = new FileReader();

    reader.onload = function (ee) {
      const img = document.getElementById(`img${boardFileNo}`);

      const p = document.getElementById(`fileName${boardFileNo}`);

      img.src = ee.target.result;
      console.log(ee.target);
      console.log(" 이건 이이점탈겟");
      console.log(ee.target.result);
      console.log("this is ee.target.result");
      p.textContent = changeFile.name;
    };

    reader.readAsDataURL(changeFile);
  };

  const deleteImg = (e, boardFileNo) => {
    changeOriginFile(boardFileNo, "D", "");

    const ele = e.target;

    const div = ele.parentElement;
    const eleId = ele.getAttribute("id");
    console.log(eleId);
    console.log("이것이 ele");

    const previousSiblingElement = ele.previousElementSibling;

    const parentDivId = previousSiblingElement.getAttribute("id");
    const imageId = parentDivId + `image`;
    console.log(imageId);
    console.log("이것이 imgId");
    const imageDiv = document.getElementById(imageId);
    if (imageDiv) {
      imageDiv.remove();
    }

    console.log("이게 지우는거");
    div.remove();
  };

  return (
    <>
      {boardFileList &&
        boardFileList.map((boardFile) => (
          <div
            style={{
              display: "inline-block",
              position: "relative",
              width: "140px",
              height: "110px",
              margin: "5px",
              border: "1px solid #00f",
              zIndex: 1,
            }}
          >
            <input
              type="file"
              style={{
                display: "none",
                width: "400px",
                height: "400px",
                backgroundColor: "red",
              }}
              id={`changeFile${boardFile.boardFileNo}`}
              onChange={(e) => changeBoardFile(e, boardFile.boardFileNo)}
            ></input>
            <img
              style={{
                width: "100%",
                height: "100%",
                zIndex: "none",
                cursor: "pointer",
              }}
              className="fileImg"
              id={`img${boardFile.boardFileNo}`}
              src={`${boardFile.boardFilePath}`}
              onClick={() => openFileInput(boardFile.boardFileNo)}
            ></img>
            <button
              type="button"
              className="btnDel"
              value="x"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                right: "0px",
                bottom: "0px",
                zIndex: 999,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#f00",
                cursor: "pointer",
              }}
              onClick={(e) => deleteImg(e, boardFile.boardFileNo)}
            >
              X
            </button>
            <p
              style={{
                display: "inline-block",
                fontSize: "8px",
                cursor: "pointer",
              }}
              id={`fileName${boardFile.boardFileNo}`}
            >
              {boardFile.boardFileOrigin}
            </p>
          </div>
        ))}
    </>
  );
};

export default FileList;
