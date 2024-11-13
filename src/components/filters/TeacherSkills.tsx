import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

interface SkillFilterProps {
  onSkillChange: (selectedSkills: string[]) => void;
  reset: any,
  setReset: any
}

const TeacherSkills: React.FC<SkillFilterProps> = ({ onSkillChange,reset, setReset }) => {
  const { t } = useTranslation();
  const skillKeys = ["ENTRY", "BEGINNER", "INTERMEDIATE", "ADVANCED", "AMBASSADOR"];
  const skills = skillKeys.map(key => t(key));

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (skill: string, isChecked: boolean) => {
    let updatedSelectedSkills = [...selectedSkills];
    if (isChecked) {
      updatedSelectedSkills.push(skill);
    } else {
      updatedSelectedSkills = updatedSelectedSkills.filter(s => s !== skill);
    }
    setSelectedSkills(updatedSelectedSkills);
    onSkillChange(updatedSelectedSkills);
  };
  useEffect(() => {
    if(reset){
      setSelectedSkills([]);
      onSkillChange([]);
      setReset(false);
    }
}, [reset]);
  return (
    <div className='py-4'>
      <h3 className='text-start'>{t("LEVEL")}</h3>
      <div className="flex flex-col">
        {skills.map(skill => (
          <label key={skill} className={`inline-flex items-center mt-3 cursor-pointer ${selectedSkills.includes(skill) ? 'bg-[#2bb9ad] text-white' : 'bg-white text-gray-700'}`}>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 border border-solid border-[#61cbc2] "
              value={skill}
              checked={selectedSkills.includes(skill)}
              onChange={e => handleSkillChange(skill, e.target.checked)}
            />
            <span className="ml-2 text-left" dangerouslySetInnerHTML={{ __html: t(skill) }}></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TeacherSkills;
