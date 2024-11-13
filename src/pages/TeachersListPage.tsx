import React from "react";
import AllTeacherFilters from "../components/AllTeacherFilters";
import TeacherListHeader from "../components/TeacherListHeader";
import { EducatorCard } from "../components/EducatorCard";
import { teacherContext } from "../contexts/teachersContext";

const TeachersListPage: React.FC = () => {
  const { teachers, isLoading }  = teacherContext();

 return (
    <div className="mx-2 xl:mx-20 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh] bg-green">
          <div className="text-center bg-red">
            <img className="w-10 h-10 animate-bounce infinite" src="/img/golfball.jpg" alt="Loading animation" />
            <p>Loadingssssss...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-3 bg-gray-200 p-4 h-full order-last xl:order-first">
            <AllTeacherFilters />
          </div>
          <div className="col-span-12 xl:col-span-9 rounded py-4 xl:px-10">
            <TeacherListHeader />
            {teachers?.map((teacher: any, index: any) => (
              <EducatorCard
                key={teacher.id}  // Prefer using unique ID over index for keys if possible
                firstName={teacher.firstName}
                lastName={teacher.lastName}
                imgUrl={teacher.profileImage || teacher.imageUrl }
                location={teacher.location}
                rating={teacher.rating}
                aboutMyself={teacher.aboutMyself}
                schedules={teacher.schedules}
                hourlyRate={teacher.hourlyRate}
                level={teacher.level}
                teacherId={teacher.id}
                userId ={teacher.userId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersListPage;
