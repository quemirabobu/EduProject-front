import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserListItem = ({ user, reloadUserList, handleCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    handleCheckboxChange(user.id, checked);
  };

  const {
    id,
    userName,
    userType,
    userId,
    userTel,
    userBirth,
    userAddress,
    userAddressDetail,
    userBus,
    userJoinId,
    userSchool,
    userRegdate,
  } = user;
  const navi = useNavigate();

  const [familynumber, setFamilynumber] = useState("");

  const getKoreanAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear() + 1;

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (userJoinId) {
        const student = {
          id: userJoinId,
        };
        const studentresponse = await axios.post(
          "https://eduventure.site:5443/user/getstudent",
          student
        );

        if (studentresponse.data && studentresponse.data.item) {
          setFamilynumber(studentresponse.data.item.userTel);
        }
      }
    };

    getUserInfo();
  }, [userJoinId]);

  const deleteBoard = useCallback(
    (e) => {
      e.preventDefault();

      const deleteUserAxios = async () => {
        try {
          const response = await axios.delete(
            `https://eduventure.site:5443/user/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "ACCESS_TOKEN"
                )}`,
              },
            }
          );

          console.log(response);

          if (response.data && response.data.item.msg) {
            alert(response.data.item.msg);
            navi("/admin/student");
            reloadUserList();
          }
        } catch (e) {
          console.log(e);
        }
      };
      deleteUserAxios();
    },
    [id, reloadUserList, navi]
  );

  const liStyle = {
    flex: "0 0 auto",
    textAlign: "center",
  };

  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        listStyle: "none",
        color: "#171A2B",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <li style={{ ...liStyle, width: "4%" }}>
        <input type="checkbox" checked={isChecked} onChange={toggleCheckbox} />
      </li>
      <li style={{ ...liStyle, width: "6%" }}>{id}</li>
      <li style={{ ...liStyle, width: "8%" }}>
        <Link to={`/admin/student/update/${id}`}>{userName}</Link>
      </li>
      <li style={{ ...liStyle, width: "8%" }}>{userType}</li>
      <li style={{ ...liStyle, width: "15%" }}>{userId}</li>
      <li style={{ ...liStyle, width: "10%" }}>{userTel}</li>
      {familynumber ? (
        <li style={{ ...liStyle, width: "10%" }}>{familynumber}</li>
      ) : (
        <li style={{ ...liStyle, width: "10%" }}>무</li>
      )}
      {userBirth ? (
        <li style={{ ...liStyle, width: "8%" }}>{getKoreanAge(userBirth)}</li>
      ) : (
        <li style={{ ...liStyle, width: "8%" }}>무</li>
      )}
      <li style={{ ...liStyle, display: "none" }}>{userAddress}</li>
      <li style={{ ...liStyle, display: "none" }}>{userAddressDetail}</li>
      <li style={{ ...liStyle, width: "8%" }}>{userBus}</li>
      <li style={{ ...liStyle, display: "none" }}>{userJoinId}</li>
      <li style={{ ...liStyle, width: "8%" }}>{userSchool}</li>
      <li style={{ ...liStyle, display: "none" }}>
        {userRegdate && userRegdate.split("T")[0]}
      </li>
      <li style={{ ...liStyle, width: "10%" }}>
        <Link to={`/admin/student/update/${id}`}>
          <button>수정</button>
        </Link>
        <button onClick={deleteBoard}>삭제</button>
      </li>
    </ul>
  );
};

export default UserListItem;
