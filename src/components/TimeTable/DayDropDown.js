import React from "react";

const styles = {
  dayDropdown: {
    boxSizing: "border-box",
    width: "141px",
    height: "45px",
    background: "#FFFFFF",
    textAlign: "center",
    border: "1px solid #171A2B",
    borderRadius: "20px",
    position: "absolute",
    right: "240px",
    top: "100px",
  },
};

const DayDropDown = ({ selectedDay, handleDayChange }) => {
  return (
    <>
      <select
        id="day-dropdown"
        value={selectedDay}
        onChange={handleDayChange}
        style={styles.dayDropdown}
      >
        <option value="월요일">월요일</option>
        <option value="화요일">화요일</option>
        <option value="수요일">수요일</option>
        <option value="목요일">목요일</option>
        <option value="금요일">금요일</option>
      </select>
    </>
  );
};

export default DayDropDown;
