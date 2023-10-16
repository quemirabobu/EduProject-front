import { useEffect, useState } from "react";
import StreamingCreateItem from "../components/StreamingCreate/StreamingCreateItem";
import Title from "../components/Title";
import axios from "axios";

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

const StreamingCreate = () => {
  const [classList, setClassList] = useState([]);
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await axios.get(
          `https://eduventure.site:5443/course/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
          }
        );
        console.log(response.data.items);
        setClassList(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassList();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 50px)",
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
      <StreamingCreateItem classList={classList} />
    </div>
  );
};

export default StreamingCreate;
