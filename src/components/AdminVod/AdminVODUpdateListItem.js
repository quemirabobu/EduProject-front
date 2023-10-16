import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 97%;
`;

const StyledTitle = styled.div`
  width: 7%;
  height: ${({ customHeight }) => customHeight || "45px"};
  background-color: #7f7f7f;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  margin-left: 20px;
  width: 93%;
  height: 45px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  white-space: pre-line;
  padding: 20px;
`;

const StyledTextArea = styled.textarea`
  margin-left: 20px;
  width: 93%;
  height: 220px;
  border-radius: 20px;
  border: none;
  font-size: 15px;
  padding: 20px;
  resize: none;
`;

const AdminVodCreateListItem = ({
  contentName,
  customWidth,
  customHeight,
  inputWidth,
  inputHeight,
  placeholder,
  value,
  onChange,
  multiline = false,
}) => {
  return (
    <Container>
      <StyledTitle customWidth={customWidth} customHeight={customHeight}>
        {contentName}
      </StyledTitle>
      {multiline ? (
        <StyledTextArea
          inputWidth={inputWidth}
          inputHeight={inputHeight}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <StyledInput
          inputWidth={inputWidth}
          inputHeight={inputHeight}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Container>
  );
};

export default AdminVodCreateListItem;
