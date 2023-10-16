import React, { useCallback, useEffect, useState } from "react";
import Title from "../components/Title";
import TeacherList from "../components/Teacher/TeacherList";
import axios from "axios";

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

const Teacher = () => {
  const [userList, setUserList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  /** 사용자 목록 가져오기 함수 */
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/user/admin/teacher-list"
      );
      console.log("선생님 목록 왔다", response.data);
      if (response.data && response.data.items) {
        setUserList(response.data.items);
      }
    } catch (e) {
      console.log("유저 목록 안오는데?", e);
    }
  };

  /** 사용자 목록 초기 가져오기 */
  useEffect(() => {
    fetchUsers();
  }, []);

  /** 선택 삭제 함수 */
  const handleDelete = useCallback(
    async (e) => {
      try {
        const response = await axios.post(
          "https://eduventure.site:5443/user/deleteselectusers",
          { selectedUserIds: selectedIds },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        if (response.data && response.data.item) {
          alert(response.data.item.msg);
          fetchUsers(); // 삭제 및 사용자 목록 업데이트
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
        <Title subtitle="EduVenture" title="선생님 관리" color="#5AC467" />
      </div>
      <button style={styles.deleteButton} onClick={handleDelete}>
        선택 삭제
      </button>
      <TeacherList
        userList={userList}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Teacher;
