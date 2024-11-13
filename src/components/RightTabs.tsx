import { useState } from "react";
import StudentEventBoxes from "./StudentEventBoxes";
import StudentTabs from "./StudentTabs";
import TeacherCalSec from "./TeacherCalSec";

const RightTab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"teacher" | "student">(
        "teacher"
      );
      
    const handleSelectTab = (tab: "teacher" | "student") => {
        setSelectedTab(tab);
      };
      
return(
<div className="col-span-12 xl:col-span-4 p-4 h-auto bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-[107.61px] mt-2 mx-4 animate__animated animate__fadeInLeft">
        <StudentTabs
          selectedTab={selectedTab}
          onSelectTab={handleSelectTab}
          showTabs={true}
          description=""
          profilePic="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="John Miler"
        />
        <StudentEventBoxes />
        <TeacherCalSec />
      </div>
);
}
export default RightTab;