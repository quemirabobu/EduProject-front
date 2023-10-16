import React, {useEffect} from "react";

const styles = {
  //input 박스
  input: {
    backgroundColor: "#EDEDED",
    borderColor: "#D3D3D3",
    border: "1px solid #ccc",
    borderRadius: "20px",
    width: "195px",
    color: "#333",
    padding: "8px 12px",
    fontSize: "14px",
    textAlign: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#5AC467",
      outline: "none",
      boxShadow: "0px 2px 5px rgba(88, 196, 103, 0.3)",
    },
  },

  //모달창 버튼
  button: {
    marginLeft: "10px",
    backgroundColor: "#5AC467",
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#4BA457",
    },
  },

  //모달창
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    zIndex: 2,
    border: "1px solid #D3D3D3",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },

  //모달창 헤더
  modalHeader: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px 10px",
    backgroundColor: "#5AC467",
    borderRadius: "10px 10px 0 0",
  },

  //모달창 내용
  modalContent: {
    padding: "30px",
  },

  //모달창 버튼 감싸는 부분
  modalButton: {
    marginTop: "20px",
    justifyContent: "right",
    display: "flex",
  },

  //모달창 둥근 버튼
  circleButton: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
  },

  //모달창 닫는 버튼
  closeButton: {
    backgroundColor: "#FF5F57",
  },

  //모달창 라벨 스타일
  labelStyle: {
    borderRadius: "20px",
    backgroundColor: "#D3D3D3",
    padding: "8px 12px",
    display: "inline-block",
    alignItems: "center",
    fontSize: "14px",
    margin: "5px 0",
    width: "60px",
    textAlign: "center",
    marginRight: "20px",
  },

  //삭제 모달에 뜨는 정보 스타일
  deleteP: {
    margin: "10px 0",
    border: "none",
    backgroundColor: "#EDEDED",
    borderColor: "#D3D3D3",
    borderRadius: "20px",
    color: "#333",
    textAlign: "center",
    padding: "8px 12px",
    fontSize: "14px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

const DeleteModal = ({
  setShowEditModal,
  selectedDay,
  selectedCourse,
  removeCourse
}) => {

  useEffect(() => {
    console.log(selectedCourse);
  }, [selectedCourse]);

  return (
    <div style={styles.modal}>
      <div style={styles.modalHeader}>
        <div
          style={{ ...styles.circleButton, ...styles.closeButton }}
          onClick={() => setShowEditModal(false)}
        ></div>
      </div>

      <div style={styles.modalContent}>
        <h3>강의 삭제</h3>
        <p style={styles.deleteP}>{selectedDay} 강의</p>
        <br />

        <div>
          <label style={styles.labelStyle}>반 이름</label>
          <input
            type="text"
            value={selectedCourse.claName}
            style={styles.input}
            readOnly
          ></input>

          <br />
          <label style={styles.labelStyle}>강좌명</label>
          <input
            type="text"
            value={selectedCourse.timeTitle}
            style={styles.input}
            readOnly
          ></input>

          <br />
          <label style={styles.labelStyle}>강사</label>   
          <input
            type="text"
            value={selectedCourse.teacherName}
            style={styles.input}
            readOnly
          ></input>       

          <br />
          <label style={styles.labelStyle}>강의실</label>
          <input
            type="text"
            value={selectedCourse.timePlace}
            style={styles.input}
            readOnly
          ></input> 
        </div>

        <div style={styles.modalButton}>
          <button style={styles.button} onClick={removeCourse}>
            삭제
          </button>
          <button style={styles.button} onClick={() => setShowEditModal(false)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
