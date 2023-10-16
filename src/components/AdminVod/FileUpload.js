import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 97%;
`;

const StyledTitle = styled.div`
  width: 7%;
  height: 45px;
  background-color: #7f7f7f;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 93%;
  height: 45px;
  border-radius: 20px;
  border: 1px dotted #d0d0d0;
  font-size: 15px;
  white-space: pre-line;
  cursor: pointer;
`;

const FileUpload = ({
  contentName,
  customWidth,
  customHeight,
  inputWidth,
  inputHeight,
  placeholder,
  onFileChange,
  file,
}) => {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (file) {
      if (Array.isArray(file)) {
        setFileName(file.map((f) => f?.name || f?.vodOriginName).join(", "));
      } else if (typeof file === "string") {
        setFileName(file.split("/").pop());
      } else {
        setFileName(file.name || file.vodOriginName);
      }
    }
  }, [file]);

  const handleFileChange = (e) => {
    const files = e.target.files;

    // 여러 파일이 선택되었을 경우
    if (files.length > 1) {
      const fileArray = Array.from(files);
      setFileName(fileArray.map((f) => f.name).join(", ")); // 모든 파일 이름을 표시
      onFileChange(fileArray); // 파일 배열을 그대로 전달
    } else if (files.length === 1) {
      const file = files[0];
      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <Container>
      <StyledTitle customWidth={customWidth} customHeight={customHeight}>
        {contentName}
      </StyledTitle>
      <StyledInput
        type="file"
        onChange={handleFileChange}
        id={`file-upload-${contentName}`}
        multiple
      />
      <StyledLabel
        htmlFor={`file-upload-${contentName}`}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
      >
        {fileName || placeholder}
      </StyledLabel>
    </Container>
  );
};

export default FileUpload;
