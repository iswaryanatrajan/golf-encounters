import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchFavoriteTeachers } from "../utils/fetchTeacher";
interface User {
  imageUrl: string;
}
interface TeacherDetails {
  id: string;
  firstName: string;
  lastName: string;
  teacher: User;
}
export interface FavoriteTeacher {
  id: string;
  userId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  Teacher: TeacherDetails;
}
const FavoriteTeachers: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [favoriteTeachers, setFavoriteTeachers] = useState<FavoriteTeacher[]>([]);

  useEffect(() => {
    fetchFavoriteTeachers((newFavoriteTeachers: FavoriteTeacher[]) => {
      const teacherMap = new Map<string, FavoriteTeacher>();
  
      favoriteTeachers.forEach(teacher => {
        teacherMap.set(teacher.teacherId, teacher);
      });
  
      newFavoriteTeachers.forEach(newTeacher => {
        teacherMap.set(newTeacher.teacherId, newTeacher);
      });
  
      const mergedTeachers = Array.from(teacherMap.values());
  
      setFavoriteTeachers(mergedTeachers);
    });
  }, []);
  
  return (
    <div className="pt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-xl font-bold text-black ">
          {t("FAVOURITE_TEACHERS")}
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#51ff85] shadow-sm ring-1 ring-inset ring-[#52FF86] hover:bg-gray-50 hover:animate-bounce"
        >
          {t("VIEW_ALL")}
        </button>
      </div>
      <div className="relative flex flex-wrap gap-4 mx-auto my-4 auto-rows-max md:grid-flow-col lg:grid-flow-col xl:grid-flow-col">
        {favoriteTeachers.map((teacher, index) => (
          <div key={index} className="teacher-card text-center bg-white shadow-lg rounded-lg p-2 w-[164px]">
            <img
            className="rounded-full w-14 h-14"
              src={teacher.Teacher?.teacher?.imageUrl ? teacher.Teacher.teacher.imageUrl : 'default_image_url'}
              alt={`${teacher.Teacher?.firstName} ${teacher.Teacher?.lastName}`}
            />
            <p>{`${teacher.Teacher?.firstName} ${teacher.Teacher?.lastName}`}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FavoriteTeachers;
