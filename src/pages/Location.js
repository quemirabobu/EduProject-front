import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Map from "../components/Location/Map";
import axios from "axios";

const LocationContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: hidden;
  position: relative;
`;

const TitleContainer = styled.div`
  padding: 20px 0px 20px 50px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const MapContainer = styled.div`
  width: 1000px;
  height: 620px;
  position: relative;
`;

const MessageContainer = styled.div`
  width: 450px;
  height: 620px;
  border: 4px solid #5ac467;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MessageTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const GentleReminder = styled.p`
  text-align: center;
  color: green;
`;

const FormTable = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextAreaContainer = styled.td`
  display: flex;
  justify-content: center;
`;

const Textarea = styled.textarea`
  width: 400px;
  height: 180px;
  padding: 20px;
  background-color: #ececec;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 95px;
  height: 40px;
  border-radius: 20px;
  margin: 15px auto 0;
  background-color: #5ac467;
  color: #ffffff;
  font-size: 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const BusPhotoContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const BusImage = styled.img`
  width: 400px;
  height: 220px;
  border-radius: 20px;
`;

const Location = () => {
  const [cars, setCars] = useState([]);
  const [gps, setGps] = useState([]);
  const carNumber = cars.find(
    (car) => car.carnumber == sessionStorage.getItem("userBus")
  ); // 차량 번호 확인
  const [phoneNumber, setPhoneNumber] = useState("");
  const [content, setContent] = useState("");
  const [carnumberPhoto, setCarnumberPhoto] = useState({});
  const [carPhotoPath, setCarPhotoPath] = useState("");
  useEffect(() => {
    const userbusnumbertogetphoto = sessionStorage.getItem("userBus");

    axios.get("https://eduventure.site:5443/igiveyougps").then((response) => {
      setCars(response.data.items);
      setGps(
        response.data.items.find(
          (item) =>
            item.carnumber === parseInt(sessionStorage.getItem("userBus"), 10)
        )
      );
      return response.data.items; // 이 값을 반환하여 다음 .then에서 사용합니다.
    });
    axios
      .get("https://eduventure.site:5443/trytogetphotofromserver", {
        params: {
          userBus: userbusnumbertogetphoto,
        },
      })
      .then((response) => {
        console.log("사진 받아 온 응답이다", response);
        setCarnumberPhoto(response.data.item);
        setCarPhotoPath(response.data.item.photoname);
      });

    console.log("차량 번호에 맞는 사진이다", carnumberPhoto);
    console.log("차량들이다", cars);
    console.log("gps", gps);
    console.log(gps.phonenumber);
  }, []);

  console.log(cars);
  console.log(gps);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageDto = {
      // to: phoneNumber,
      to: gps.phonenumber.slice(1, -1),
      content: content,
    };

    try {
      const response = await axios.post(
        "https://eduventure.site:5443/sms/send",
        messageDto
      );
      console.log("Message sent successfully:", response.data);
      alert("기사님께 문자를 보냈습니다.");
      setContent("");

      // 여기에 성공 시 처리 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
      // 여기에 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  return (
    <LocationContainer>
      <TitleContainer>
        <Title subtitle="실시간" title="차량 위치" />
      </TitleContainer>
      <RowContainer>
        <MapContainer>
          <Map carNumber={carNumber} />
        </MapContainer>
        <MessageContainer>
          <MessageTitle>기사님께 전하는 메시지</MessageTitle>
          <form onSubmit={handleSubmit}>
            <GentleReminder>
              매너를 지켜주세요. 기사님도 누군가의 가족이랍니다.
            </GentleReminder>
            <FormTable>
              <TextAreaContainer>
                <Textarea
                  id={"smscontent" + `${gps.carnumber}`}
                  value={content}
                  name="content"
                  placeholder="To. 든든한 기사님"
                  cols="40"
                  rows="10"
                  onChange={(e) => setContent(e.target.value)}
                />
              </TextAreaContainer>
              <SubmitButton type="submit">보내기</SubmitButton>
            </FormTable>
          </form>
          <BusPhotoContainer>
            <p>
              <b>{gps.carnumber}번 버스</b> 등원 사진
            </p>
            <BusImage src={carPhotoPath} alt="" />
          </BusPhotoContainer>
        </MessageContainer>
      </RowContainer>
    </LocationContainer>
  );
};

export default Location;
