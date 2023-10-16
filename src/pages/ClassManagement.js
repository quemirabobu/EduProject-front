import React, { useCallback, useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import ClassList from "../components/ClassManagement/ClassList";
import ClassCreateModal from "../components/ClassManagement/ClassCreateModal";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
  deleteButton: {
    marginLeft: "110px",
    padding: "12px 25px",
    backgroundColor: "#5AC467",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
  createButton: {
    marginLeft: "10px",
    padding: "12px 25px",
    backgroundColor: "#5AC467",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

const ClassManagement = () => {
  const [classList, setClassList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  /** 반 목록 가져오기 함수 */
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("반 목록 왔다", response.data);
      if (response.data && response.data.items) {
        setClassList(response.data.items);
      }
    } catch (e) {
      console.log("반 목록 안오는데?", e);
    }
  };

  /** 선생님 목록 가져오기 함수 */
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/user/type-list/teacher"
      );
      console.log("선생님 목록 왔다", response.data);
      if (response.data && response.data.items) {
        setTeacherList(response.data.items);
      }
    } catch (e) {
      console.log("선생님 목록 안오는데?", e);
    }
  };

  /** 반과 선생님 목록 초기 가져오기 */
  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  /** 선택 삭제 함수 */
  const handleDelete = useCallback(
    async (e) => {
      try {
        console.log("삭제할 놈들", selectedIds);
        const response = await axios.post(
          "https://eduventure.site:5443/course/course/delete",
          { couNoList: JSON.stringify(selectedIds) },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        if (response.data && response.data.item) {
          alert(response.data.item.msg);
          fetchClasses(); // 삭제 및 반 목록 업데이트
        }
      } catch (e) {
        console.log(e);
      }
    },
    [selectedIds]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <div style={styles.titleContainer}>
        <Title subtitle="EduVenture" title="반 관리" color="#5AC467" />
      </div>
      <button style={styles.deleteButton} onClick={handleDelete}>
        선택 삭제
      </button>
      <button style={styles.createButton} onClick={handleOpenModal}>
        반 생성하기
      </button>
      <ClassList
        classList={classList}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        fetchClasses={fetchClasses}
        teacherList={teacherList}
      />
      {isOpen && (
        <ClassCreateModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          fetchClasses={fetchClasses}
          teacherList={teacherList}
        />
      )}
    </div>
  );
};

export default ClassManagement;
