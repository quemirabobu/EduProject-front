import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import MessengerUserList from "../components/Messenger/MessengerUserList";
import MessengerChat from "../components/Messenger/MessengerChat";
import DefaultChatPage from "../components/Messenger/DefaultChatPage";

const Messenger = () => {
  const [chats, setChats] = useState([]);
  const [channel, setChannel] = useState([]);
  const { id } = useParams();
  const selectedUser = channel.find((ch) => ch.id === id);
  /** 얘는 로그인한 유저의 이메일(아이디) */
  const [userEmail, setUserEmail] = useState([]);
  /** 얘는 nchat의 개별유저 조회 */
  const [user, setUser] = useState([]);
  const [claName, setClaName] = useState([]);

  const userEmailAxios = () => {
    axios
      .get("https://eduventure.site:5443/user/myInfo", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        setClaName(response?.data?.item?.courseDTO?.claName);
        setUserEmail(response?.data?.item?.userId);
      });
  };

  useEffect(() => userEmailAxios(), []);
  console.log("자 너는 로그인한 유저의 이메일이다.", userEmail);
  console.log("myInfo의 학생 해당 반:", claName);
  /**얘를 활용해 로그인 유저가 속한 반만 렌더링되게 예외처리 하자. */

  /** 로그인한 유저의 ncloudChat 개별유저 조회 */
  useEffect(() => {
    axios
      .get(
        `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${userEmail}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-project-id": "ea3a8bf5-e78c-4f9b-830d-e66bf1d4040b",
            "x-api-key": "3fdfbdf1fd786a1e6d1e5075db4e65d765001a0b610c65f1",
          },
        }
      )
      .then((response) => setUser(response.data));
  }, [userEmail]);
  console.log("너도 해결의 열쇠다. 네이버챗 개별 유저목록", user);
  // const selectedChat = chats.channel_id;
  // 선택하는 채팅방에 대한 정보
  // console.log("누구냐?", selectedUser);
  // id: 내가 선택한 채팅방 id (상대방)
  // name: 내가 선택한 채팅방 이름 (상대 이름)
  // user: 입력하는 사람의 정보 {더미}
  // user.name: 입력 상대이름 (나일수도, 다른 사람일수도)
  // user_id: 입력 상대 id (나일수도, 다른 사람일수도)

  /** 채널 */
  useEffect(() => {
    axios
      .get(
        "https://dashboard-api.ncloudchat.naverncp.com/v1/api/channels?filter={}",
        {
          headers: {
            "Content-Type": "application/json",
            "x-project-id": "ea3a8bf5-e78c-4f9b-830d-e66bf1d4040b",
            "x-api-key": "3fdfbdf1fd786a1e6d1e5075db4e65d765001a0b610c65f1",
          },
        }
      )
      .then((response) => {
        setChannel(response.data);
        console.log("채널정보 API", response.data);
      })

      .catch((error) => {
        console.error("채널", error);
      });
  }, []);

  /** 메시지 */
  // if (channel.length === 0) return;

  const fetchChatData = useCallback(async () => {
    if (!id) return;
    const chatData = await Promise.all(
      channel.map(async (ch, index) => {
        const response = await axios.get(
          `https://dashboard-api.ncloudchat.naverncp.com/v1/api/messages/${ch.id}?filter={}&sort=%7B%22created_at%22%3A%22-1%22%7D`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-project-id": "ea3a8bf5-e78c-4f9b-830d-e66bf1d4040b",
              "x-api-key": "3fdfbdf1fd786a1e6d1e5075db4e65d765001a0b610c65f1",
            },
          }
        );
        return { [ch.id]: response.data };
      })
    );
    setChats(Object.assign({}, ...chatData));
  }, [channel, id]);

  useEffect(() => {
    fetchChatData();

    const intervalId = setInterval(fetchChatData, 3000);

    return () => clearInterval(intervalId);
  }, [channel, id]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "25% 75%",
        width: "100vw",
        height: "calc(100vh - 50px)",
        margin: 0,
      }}
    >
      <Paper
        sx={{
          margin: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          overflowY: "auto",
          background: "#f2f2f2",
        }}
      >
        <MessengerUserList
          channel={channel}
          user={user}
          channel_id={id}
          claName={claName}
        />
      </Paper>

      <Paper sx={{ margin: 0, overflowY: "auto" }}>
        {id ? (
          <MessengerChat
            chats={chats[id] || []}
            selectedUser={selectedUser}
            channel_id={id}
            user={user}
          />
        ) : (
          <DefaultChatPage />
        )}
      </Paper>
    </Box>
  );
};

export default Messenger;
