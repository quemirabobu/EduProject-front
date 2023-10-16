import React, { useContext } from "react";
import StreamingSettingItem from "../components/StreamingCreate/StreamingSettingItem";
import Title from "../components/Title";
import { ChannelContext } from "../context/context";

const styles = {
  titleContainer: {
    padding: "20px 0px 20px 50px",
  },
  styledButton: {
    marginLeft: "110px",
    padding: "12px 25px",
    backgroundColor: "#ffffff",
    color: "#171A2B",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

const StreamingSetting = () => {
  const { channelInfo, setChannelInfo} = useContext(ChannelContext);
  // const channelInfomation = JSON.parse(sessionStorage.getItem('channelInfo'));
  console.log(`setting컴포넌트 채널정보 ${JSON.stringify(channelInfo)}`);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#5AC467",
        position: "relative",
      }}
    >
      <div style={styles.titleContainer}>
        <Title
          subtitle="수업을 위한"
          title="실시간 강의 생성"
          color="#ffffff"
        />
      </div>
      {channelInfo.channelId ? <StreamingSettingItem channelInfo={channelInfo} setChannelInfo={setChannelInfo}/> : null}
    </div>
  );
};

export default StreamingSetting;
