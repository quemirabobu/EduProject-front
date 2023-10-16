import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import axios from "axios";
import AddModal from "../components/TimeTable/Modal/AddModal";
import DeleteModal from "../components/TimeTable/Modal/DeleteModal";
import TimeTableGrid from "../components/TimeTable/TimeTableGrid";
import DayDropDown from "../components/TimeTable/DayDropDown";

const styles = {
  timeTableStyle: {
    width: "90%",
    height: "1200px",
    margin: "0 auto",
    background: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
};

const TimeTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState("");

  const times = [
    "1교시",
    "2교시",
    "3교시",
    "4교시",
    "5교시",
    "6교시",
    "7교시",
    "8교시",
  ];

  //병합된 행의 수를 저장하는 역할
  let mergedRows = [];

  //교시 선택 드롭다운
  const [selectedStartTime, setSelectedStartTime] = useState(times[0]);
  const [selectedEndTime, setSelectedEndTime] = useState(times[0]);
  const [selectedDay, setSelectedDay] = useState("월요일");
  const [inputColor, setInputColor] = React.useState("#ffffff"); // 색상 input의 초기값을 설정
  const [courses, setCourses] = useState([]);
  const [infoCourses, setInfoCourses] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [selectedDayCourses, setSelectedDayCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({ teacher: 0, time: 0 });
  const [inputValue, setInputValue] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [currentCourse, setCurrentCourse] = useState([]);
  const [currentCouNo, setCurrentCouNo] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("701호"); // 선택된 강의실 상태
  const classrooms = ["701호", "702호", "703호", "704호", "705호"]; // 사용 가능한 강의실 목록
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [filteredCourses, setFilteredCourses] = useState(Array(5).fill(null));
  const [showEditModal, setShowEditModal] = useState(false);

  /** 선생님 리스트 가져오는 함수 */
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/user/type-list/teacher"
      );
      console.log("선생님 들어오니?", response);
      if (response.data && response.data.items) {
        setTeachers(response.data.items);
      }
    } catch (error) {
      console.error("선생님 안 들어온다", error);
    }
  };

  /** 반 정보 가져오는 함수 */
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://eduventure.site:5443/course/course-list"
      );
      console.log("반 정보 들어오니?", response);
      if (response.data && response.data.items) {
        setInfoCourses(response.data.items);
      }
    } catch (error) {
      console.error("반 정보 안 들어온다", error);
    }
  };

  /** 시간표 목록 가져오는 함수 */
  const fetchTimetable = async () => {
    try {
      const response = await axios.get(
        `https://eduventure.site:5443/timetable/getTimeTable-list`
      );

      console.log("시간표 들어옴?", response);

      if (response.data && response.data.items) {
        const timetableData = response.data.items;
        const newCourses = Array(5)
          .fill()
          .map(() => Array(5).fill(null));

        timetableData.forEach((course) => {
          const timeIndex = times.indexOf(course.timeClass);
          newCourses[timeIndex] = {
            timeNo: course.timeNo,
            timeWeek: course.timeWeek,
            timeTitle: course.timeTitle,
            timeClass: course.timeClass,
            timeColor: course.timeColor,
            timePlace: course.timePlace,
            timeTeacher: course.timeTeacher,
            couNo: course.couNo,
            claName: course.claName,
          };
        });

        setCourses(timetableData);
        setFilteredCourses(newCourses[teachers.indexOf(selectedDay)]);
      }
    } catch (error) {
      console.error("Error fetching the timetable: ", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
    fetchTimetable();
  }, []);

  // 선택된 요일 데이터 보이게 하기
  useEffect(() => {
    setSelectedDayCourses(
      courses.filter((cour) => cour.timeWeek === selectedDay)
    );
  }, [courses, selectedDay]);

  /** 강의 추가 함수 */
  const addCourse = async (courseName, timePlace) => {
    // 시작 교시에서 종료 교시까지의 모든 교시 배열
    const allTimesBetween = times.slice(
      times.indexOf(selectedStartTime),
      times.indexOf(selectedEndTime) + 1
    );

    /** 중복 확인 함수 */
    const isDuplicate = allTimesBetween.some((time) => {
      return courses.some((course) => {
        return (
          course.timeWeek === selectedDay &&
          course.timeClass === time &&
          course.timeTeacher === currentTeacher &&
          course.claName === currentCourse &&
          course.couNo === currentCouNo
        );
      });
    });

    if (isDuplicate) {
      alert("이미 등록된 시간이 포함되어 있습니다.");
      return; // 이 함수를 여기서 종료
    }

    const startPeriod = parseInt(selectedStartTime.replace("교시", ""));
    const endPeriod = parseInt(selectedEndTime.replace("교시", ""));
    const selectedCouNo = infoCourses.find(
      (course) => course.claName === selectedCourseName
    )?.couNo;

    for (let period = startPeriod; period <= endPeriod; period++) {
      const courseData = {
        claName: selectedCourseName,
        couNo: selectedCouNo,
        timeWeek: selectedDay,
        timeClass: `${period}교시`, // 현재 교시
        endTime: selectedEndTime,
        timePlace: timePlace,
        courseName: courseName,
        timeTeacher: currentTeacher,
        timeColor: inputColor,
        timeTitle: inputTitle,
      };

      try {
        const response = await axios.post(
          `https://eduventure.site:5443/timetable/regist`,
          courseData
        );
        console.log("과목 정보 데이터 들어옴?", courseData);
        if (response.data.statusCode === 201) {
          // 성공 응답
          fetchTimetable();
          setShowModal(false);
          setInputValue("");
          setInputTitle("");
        } else {
          alert("강의를 추가하는데 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error adding the course: ", error);
        if (error.response) {
          console.error("Server Response: ", error.response.data);
          alert(
            `서버 오류: ${error.response.data.message || "알 수 없는 오류"}`
          );
        } else if (error.request) {
          alert("서버로부터 응답이 없습니다.");
        } else {
          alert("요청 중 문제가 발생했습니다.");
        }
      }
    }

    fetchTimetable();
    setShowModal(false);
    setInputValue("");
    setInputTitle("");
  };

  //시작 시간이 변경될 때마다 종료 시간도 변경
  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setSelectedStartTime(newStartTime);
    setSelectedEndTime(newStartTime);
  };

  // 강의 삭제 로직
  const removeCourse = async () => {
    // 사용자에게 삭제 확인 받기
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

    // 사용자가 취소를 선택한 경우 함수 종료
    if (!isConfirmed) {
      return;
    }

    try {
      const requestData = {
        claName: selectedCourse.claName, // 현재 선택된 강의의 claName
        timeWeek: selectedCourse.timeWeek, // 현재 선택된 강의의 timeWeek
        timeTeacher: selectedCourse.timeTeacher,
        timeTitle: selectedCourse.timeTitle,
        timePlace: selectedCourse.timePlace,
        couNo: selectedCourse.couNo,
      };

      const response = await axios.delete(
        `https://eduventure.site:5443/timetable/deleteTimeTable`,
        { data: requestData }
      );
      if (response.data.statusCode === 0) {
        // 성공 응답
        fetchTimetable();
        setShowEditModal(false); // 수정 모달 닫기 추가
        alert("삭제 완료 되었습니다."); // 삭제 완료 메시지 추가
      } else {
        alert("강의를 삭제하는데 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error deleting the course: ", error);
      handleServerError(error);
    }
  };

  //반 이름 관리 핸들러
  const handleCourseNameChange = (e) => {
    setSelectedCourseName(e.target.value);
  };

  // 서버 오류 핸들링
  const handleServerError = (error) => {
    if (error.response.status === 400) {
      alert(`400 오류: ${error.response.data.message || "잘못된 요청입니다."}`);
    } else if (error.request) {
      alert("서버로부터 응답이 없습니다.");
    } else {
      alert("요청 중 문제가 발생했습니다.");
    }
  };

  // 과목 삭제 / 과목 등록 팝업창 열기
  const handleShowOptionsPopup = (
    teacherIndex,
    timeIndex,
    timeNo,
    couNo,
    claName,
    timePlace,
    timeColor,
    timeWeek,
    timeTitle,
    providedTeacherName
  ) => {
    //강사 이름 설정
    const teacherName = teachers[teacherIndex];
    setCurrentTeacher(teacherName.userName);
    if (
      sessionStorage.getItem("userName") === teacherName.userName ||
      sessionStorage.getItem("userType") === "admin"
    ) {
      // 선생님의 id와 일치하는 반 정보를 찾기
      const matchedCourse = infoCourses.filter(
        (course) => course.userDTO.id === teacherName.id
      );

      // 과목이 있는지 확인
      if (timeNo === null) {
        // 과목이 없으면 등록 모달 띄우기
        setShowModal(true);

        // 일치하는 반 정보가 있으면 해당 반의 claName과 couNo를 설정.
        if (matchedCourse.length > 0) {
          const courseNames = matchedCourse.map((course) => course.claName);
          const courseNos = matchedCourse.map((course) => course.couNo);

          setCurrentCourse(courseNames);
          setCurrentCouNo(courseNos);

          // 첫 번째 반 이름을 selectedCourseName으로 설정
          setSelectedCourseName(courseNames[0]);

          console.log("추가 모달", matchedCourse);
        } else {
          console.log("일치하는 정보가 없습니다.");
        }
        return;
      }

      // 클릭된 과목의 정보를 selectedCourse에 설정
      setSelectedCourse({
        ...courses[teacherIndex][timeIndex],
        timeNo: timeNo,
        claName: claName,
        timeColor: timeColor,
        timePlace: timePlace,
        timeTitle: timeTitle,
        teacher: teacherIndex,
        time: timeIndex,
        timeWeek: timeWeek,
        teacherName: providedTeacherName,
        couNo: couNo,
      });
      // 삭제 모달 표시
      setShowEditModal(true);
    } else {
      alert("등록 혹은 삭제 권한이 없습니다.");
    }
  };

  // 드롭다운에서 요일을 선택하면 해당 상태값을 업데이트.
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div
      style={{
        height: "auto",
        overflow: "hidden",
        backgroundColor: "#fffff",
        position: "relative",
      }}
    >
      <div style={{ padding: "20px 0px 20px 50px" }}>
        <Title subtitle="EduVenture" title="주간 시간표" color="#171A2B" />
      </div>
      <div>
        <DayDropDown
          selectedDay={selectedDay}
          handleDayChange={handleDayChange}
        />
      </div>

      <div>
        <div style={styles.timeTableStyle}>
          {/* 시간표 부분 */}
          <TimeTableGrid
            teachers={teachers}
            times={times}
            mergedRows={mergedRows}
            selectedDayCourses={selectedDayCourses}
            courses={courses}
            handleShowOptionsPopup={handleShowOptionsPopup}
          />

          {/* 강의 추가 모달 부분 */}
          {showModal && (
            <AddModal
              setShowModal={setShowModal}
              selectedDay={selectedDay}
              currentTeacher={currentTeacher}
              selectedStartTime={selectedStartTime}
              handleStartTimeChange={handleStartTimeChange}
              times={times}
              currentCourse={currentCourse}
              selectedClassroom={selectedClassroom}
              setSelectedClassroom={setSelectedClassroom}
              addCourse={addCourse}
              inputValue={inputValue}
              inputTitle={inputTitle}
              setInputTitle={setInputTitle}
              selectedEndTime={selectedEndTime}
              setSelectedEndTime={setSelectedEndTime}
              classrooms={classrooms}
              inputColor={inputColor}
              setInputColor={setInputColor}
              handleCourseNameChange={handleCourseNameChange}
              selectedCourseName={selectedCourseName}
            />
          )}

          {/* 강의 삭제 모달 부분 */}
          {showEditModal && (
            <DeleteModal
              setShowEditModal={setShowEditModal}
              selectedDay={selectedDay}
              selectedCourse={selectedCourse}
              removeCourse={removeCourse}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
