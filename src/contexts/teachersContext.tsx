import React, { useCallback, useEffect, useState } from "react";
import {
    deleteScheduleById,
    deleteShiftById,
  fetchSingleTeacher,
  fetchStudentAppointments,
  fetchTeachersAppointments,
  fetchTeacherss,
} from "../utils/fetchTeacher";
import { useParams } from "react-router-dom";
import { fetchTeacherReservedGig } from "../utils/fetchGigs";
import { getTeacherFee } from "../utils/subscriptionFee";

const TeachersContext = React.createContext<any>({});

export const TeacherContext = ({ children }: any) => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [teacherFee, setTeacherFee] = useState(550);

  const [shift, setShift] = useState<any>([]);
  const [teacherData, setTeacherData] = useState({
    availability: null,
    rating: null,
    subjects: [],
    locationSearch: "",
    nameSearch: "",
  });
console.log(teacherFee ,"teacherFee")
  useEffect(() => {
    getTeacherFee(setTeacherFee);
    fetchTeacherss(
      handleTeachers,
      setSelectedTeacher,
      handleSchedules,
      teacherData
    );
  }, [teacherData]);

  const handleTeachers = useCallback(
    (value: any) => {
      setTeachers(value);
    },
    [teachers]
  );

  const handleSchedules = useCallback(
    (value: any) => {
      setTeachers(value);
    },
    [schedules]
  );

  const handleShift = useCallback(
    (value: any) => {
      setShift(value);
    },
    [shift]
  );

  const handleAvailability = useCallback(
    (value: any) => {
      setTeacherData((prevData) => ({
        ...prevData,
        availability: value,
      }));
    },
    [teacherData]
  );

  const handleRating = useCallback(
    (value: any) => {
      setTeacherData((prevData) => ({
        ...prevData,
        rating: value,
      }));
    },
    [teacherData]
  );

  const handleSubjects = useCallback(
    (value: any) => {
      setTeacherData((prevData) => ({
        ...prevData,
        subjects: value,
      }));
    },
    [teacherData]
  );

  const handleLocationSearch = useCallback(
    (value: any) => {
      setTeacherData((prevData) => ({
        ...prevData,
        locationSearch: value,
      }));
    },
    [teacherData]
  );

  const handleNameSearch = useCallback(
    (value: any) => {
      setTeacherData((prevData) => ({
        ...prevData,
        nameSearch: value,
      }));
    },
    [teacherData]
  );

  const value = {
    handleSchedules,
    handleShift,
    handleAvailability,
    handleRating,
    handleSubjects,
    handleLocationSearch,
    handleNameSearch,
    shift,
    schedules,
    teachers,
    selectedTeacher,
    teacherFee
  };

  return (
    <TeachersContext.Provider value={value}>
      {" "}
      {children}{" "}
    </TeachersContext.Provider>
  );
};

export const teacherContext = () => React.useContext(TeachersContext);

const SingleTeacherContext = React.createContext<any>({});

export const TeacherDetailsContext = ({ children }: any) => {
  const params = useParams<{ id?: string }>();
  const teacherId = params.id;
  const [teacher, setTeacher] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentAppointments, setStudentAppointments] = useState<any[]>([]);
  const [teacherReserved, setTeacherReserved] = useState<any[]>([]);
  const [shiftId, setShiftId] = useState<any>(null);
  const [scheduleId, setScheduleId] = useState<any>(null);
  const [tId, setTId] = useState<any>(null);
  const [ss, ssSet] = useState<any>(null);

  console.log(scheduleId, "adsasd")
  useEffect(() => {
    if (teacherId !== "null" ) {
      fetchSingleTeacher(handleTeacher, teacherId);
    }
    if ( tId) {
      fetchSingleTeacher(handleTeacher, tId);
    }
    if(shiftId !== null){
        deleteShiftById(shiftId, setIsLoading);
        fetchSingleTeacher(handleTeacher, teacherId);
    }
    if(scheduleId !== null){
        deleteScheduleById(scheduleId, setIsLoading);
        fetchSingleTeacher(handleTeacher, teacherId);
    }
    fetchTeacherReservedGig(setTeacherReserved,setIsLoading)
  }, [teacherId, shiftId, scheduleId, isLoading,ss ]);

  const handleUpdate = useCallback(
    (value: any) => {
      ssSet(value);
    },
    [schedules]
  );  useEffect(() => {
    fetchTeachersAppointments(setBookedAppointments, setIsLoading);
    fetchStudentAppointments(setStudentAppointments, setIsLoading);
  }, []);

  const handleTeacher = useCallback(
    (value: any) => {
      setTeacher(value);
    },
    [teacher]
  );

  const handleSchedules = useCallback(
    (value: any) => {
      setTeacher(value);
    },
    [schedules]
  );
  const handleShiftDelete = useCallback(
    (value: any) => {
      setShiftId(value);
    },
    [shiftId]
  );
  const handleScheduleDelete = useCallback(
    (value: any) => {
      setScheduleId(value);
    },
    [scheduleId]
  );

  const handTeacherId = useCallback(
    (value: any) => {
      setTId(value);
    },
    [tId]
  );

  const value = {
    handTeacherId,
    handleSchedules,
    schedules,
    teacher,
    selectedTeacher,
    studentAppointments,
    teacherReserved,
    isLoading,
    bookedAppointments,
    handleShiftDelete,
    handleScheduleDelete,
    setIsLoading,
    handleTeacher,
    handleUpdate
  };

  return (
    <SingleTeacherContext.Provider value={value}>
      {children}
    </SingleTeacherContext.Provider>
  );
};

export const useTeacherContext = () => React.useContext(SingleTeacherContext);
