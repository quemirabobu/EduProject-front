import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessengerUser from "./MessengerUser";

const MessengerUserList = ({ channel, user, claName }) => {
  const { id } = useParams();

  // console.log(id);
  // const [selectedUserId, setSelectedUserId] = useState(id);

  // const handleSelect = (userId) => {
  //   setSelectedUserId(userId);
  // };
  console.log("useParams의 id:", id);
  console.log("잘 넘어갔는지 확인", claName);

  return (
    <div style={{ width: "100%" }}>
      {Object.entries(channel).map(([key, value]) => {
        return (
          <div key={value.id}>
            <MessengerUser
              user={user}
              channelInfo={value}
              isSelected={value.id === id}
              claName={claName}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MessengerUserList;
