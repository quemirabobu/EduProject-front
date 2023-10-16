import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MainMessenger from "../components/Main/MainMessenger/MainMessenger";
import MainStreaming from "../components/Main/MainStreaming/MainStreaming";
import Footer from "../components/Footer";
import MainIntro from "../components/Main/MainIntro";
import MainLecture from "../components/Main/MainLecture";
import axios from "axios";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const downArrowAnimation = {
  color: "#5ac467",
  position: "static",
  top: "10vh",
  animation: "moveUpDown 2s linear infinite",
  "@keyframes moveUpDown": {
    "0%, 100%": { transform: "translateY(-10px)" },
    "50%": { transform: "translateY(10px)" },
  },
  fontSize: "80px",
};

const Main = () => {
  const userType = sessionStorage.getItem("userType");
  const [lectures, setLectures] = useState([]);
  const [notices, setNotices] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);
  const [mainUserClaInfo, setMainUserClaInfo] = useState([]);
  const [mainMessage, setMainMessage] = useState([]);
  const [resultChannelId, setResultChannelId] = useState([]);
  const [liveData, setLiveData] = useState([]);

  const getLiveList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.59:8081/lecture/lecture-list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("라이브?", response.data.items);
      setLiveData(response.data.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTimetable = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/timetable/student/list",
        "http://192.168.0.59:8081/timetable/student/list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("개별 시간표 들어왔다.", response);
      if (response.data && response.data.items) {
        setLectures(response.data.items);
      }
    } catch (e) {
      console.log("개별 시간표 안들어옴?", e);
    }
  };

  const getNotices = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/notice/course",
        "http://192.168.0.59:8081/notice/course",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log("공지사항 들어왔다", response);
      if (response.data && response.data.items) {
        setNotices(response.data.items);
      }
    } catch (e) {
      console.log("공지사항 안들어옴?", e);
    }
  };

  const noticeContent = notices
    ? notices.map((notice) => {
        const userType = notice.userDTO.userType;
        if (userType === "admin") {
          return `<span style="color: green; font-size: 25px; font-weight: bolder;"}>${notice.noticeTitle}</span>
          ${notice.claName}
          <br/><br/>
          ${notice.noticeContent}`;
        } else {
          return `${notice.claName} (${notice.userDTO.userName} 선생님) ${notice.noticeContent}`;
        }
      })
    : ["게시된 공지 사항이 없습니다."];

  useEffect(() => {
    if (userType === "student" || userType === "parent") {
      getTimetable();
      getNotices();
      getLiveList();
    }
    AOS.refresh();
  }, []);

  const myRef = useRef(null);
  const moveScroll = () => myRef.current.scrollIntoView({ behavior: "smooth" });

  /** 전체 채널 조회 */
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
        setChannelInfo(response.data);

        let channelNames = [];
        response.data.forEach((item) => {
          channelNames.push(item.name);
        });

        setResultChannelId(channelNames);
        console.log("채널정보 API", response.data);
      })
      .catch((error) => {
        console.error("채널", error);
      });
  }, []);

  console.log("메인페이지 채널axios:", channelInfo);
  console.log("제발 채널이름만 담겼어라:", resultChannelId);

  /** 유저의 반 정보 이름 받아오기 */
  const userMyInfoAxios = () => {
    axios
      .get("https://eduventure.site:5443/user/myInfo", {
      .get("http://192.168.0.59:8081/user/myInfo", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((response) => {
        if (response.data.item.courseDTO) {
          setMainUserClaInfo(response.data.item.courseDTO.claName);
        }
      });
  };

  /**이걸로 예외처리 안하면 로그인 안했을 때 무조건 에러난다. */
  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      userMyInfoAxios();
    }
  }, []);
  console.log("메인유저 정보:", mainUserClaInfo);

  /** 채널이름과 유저의 반이름을 매칭해서 같은 것만 뽑아낸다. */
  const matchingChannels = channelInfo?.filter(
    (channel) => channel.name === mainUserClaInfo
  );
  /** 매칭되는 애가 하나이기 때문에 index[0]으로 접근한다. */
  const matchingChannel = matchingChannels[0];
  console.log("matching된 채널 정보", matchingChannel);
  /** channelId에 따른 메시지 불러오기 */
  const chatMessageHandler = () => {
    axios
      .get(
        `https://dashboard-api.ncloudchat.naverncp.com/v1/api/messages/${matchingChannel?.id}?filter={}&sort=%7B%22created_at%22%3A%22-1%22%7D`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-project-id": "ea3a8bf5-e78c-4f9b-830d-e66bf1d4040b",
            "x-api-key": "3fdfbdf1fd786a1e6d1e5075db4e65d765001a0b610c65f1",
          },
        }
      )
      .then((response) => {
        setMainMessage(response.data);
      });
  };
  useEffect(() => {
    if (matchingChannel) {
      chatMessageHandler();
    }
  }, [matchingChannel]);

  console.log("mainMessage:", mainMessage);

  return (
    <>
      <MainContainer>
        <MainIntro />
        <KeyboardArrowDownRoundedIcon
          onClick={moveScroll}
          sx={downArrowAnimation}
        />
        <div ref={myRef} />
        {(userType === "student") | (userType === "parent") ? (
          <>
            <MainLecture lectures={lectures} noticeContent={noticeContent} />
            <MainMessenger mainMessage={mainMessage} />
            <MainStreaming Thumnail={liveData.liveThumb} />
          </>
        ) : (userType === "admin") | (userType === "teacher") ? (
          <MainMessenger mainMessage={mainMessage} />
        ) : (
          <></>
        )}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Main;
