import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";

type Hole = {
  par: number;
  holeNumber: number;
};

type Template = {
  id: number;
  name: string;
  address: string;
  prefecture: string;
  holes: Hole[]; // this is key!
};

interface ScoringTypeProps {
  onChange: (
    scoringType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedHoles: string[];
  formdataa?:any;
  shotTemplates: Template[];
  onTemplateSelect?: (template: Template) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onCourseModeChange?: (mode: "custom" | "preset") => void;
}

enum Tab {
  Normal = "(普通)Normal",
  Regular = "(通常)Regular",
  Single = "(シングル)single",
  Double = "(ダブル)double",
  Triple = "(トリプル)triple",
}

interface FormData {
  [Tab.Normal]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: { enabled: boolean; score: number };
    nearPinContest: { enabled: boolean; score: number };
  };
  [Tab.Regular]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: { enabled: boolean; score: number };
    nearPinContest: { enabled: boolean; score: number };
  };
  [Tab.Single]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: { enabled: boolean; score: number };
    nearPinContest: { enabled: boolean; score: number };
  };
  [Tab.Double]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: { enabled: boolean; score: number };
    nearPinContest: { enabled: boolean; score: number };
  };
  [Tab.Triple]: {
    field1: boolean;
    field2: boolean;
    selectedHoles: string[];
    driverContest: { enabled: boolean; score: number };
    nearPinContest: { enabled: boolean; score: number };
  };
}

const ScoringCategory: React.FC<ScoringTypeProps> = ({
  onChange,
  onInputChange,
  selectedHoles,
  formdataa,
  shotTemplates,
  onTemplateSelect,
  onCourseModeChange
}) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const numHoles = 18;
  /*const [holeValues, setHoleValues] = useState(
    Array.from({ length: numHoles }, () => 4)
  );*/

  const [holeValues, setHoleValues] = useState<number[]>([]);



  

//const [shotTemplates, setShotTemplates] = useState<Template[]>([]);


const [selectedTemplateId, setSelectedTemplateId] = useState<number | "">("");

 /* const [courseMode, setCourseMode] = useState<"preset" | "custom">(
    selectedTemplateId !== "" ? "preset" : "custom"
  );*/

  const [courseMode, setCourseMode] = useState<"preset" | "custom">("custom");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");

  //const [selectedTemplateId, setSelectedTemplateId] = useState("");
const prefectures = [
  "北海道 (Hokkaido)",
  "青森県 (Aomori Prefecture)", "岩手県 (Iwate Prefecture)", "宮城県 (Miyagi Prefecture)", "秋田県 (Akita Prefecture)", "山形県 (Yamagata Prefecture)", "福島県 (Fukushima Prefecture)",
  "茨城県 (Ibaraki Prefecture)", "栃木県 (Tochigi Prefecture)", "群馬県 (Gunma Prefecture)", "埼玉県 (Saitama Prefecture)", "千葉県 (Chiba Prefecture)", "東京都 (Tokyo)",
  "神奈川県 (Kanagawa Prefecture)", "新潟県 (Niigata Prefecture)", "富山県 (Toyama Prefecture)", "石川県 (Ishikawa Prefecture)", "福井県 (Fukui Prefecture)", "山梨県 (Yamanashi Prefecture)", "長野県 (Nagano Prefecture)", "岐阜県 (Gifu Prefecture)",
  "静岡県 (Shizuoka Prefecture)", "愛知県 (Aichi Prefecture)", "三重県 (Mie Prefecture)", "滋賀県 (Shiga Prefecture)", "京都府 (Kyoto)", "大阪府 (Osaka)", "兵庫県 (Hyogo Prefecture)", "奈良県 (Nara Prefecture)", "和歌山県 (Wakayama Prefecture)",
  "鳥取県 (Tottori Prefecture)", "島根県 (Shimane Prefecture)", "岡山県 (Okayama Prefecture)", "広島県 (Hiroshima Prefecture)", "山口県 (Yamaguchi Prefecture)", "徳島県 (Tokushima Prefecture)", "香川県 (Kagawa Prefecture)",
  "愛媛県 (Ehime Prefecture)", "高知県 (Kochi Prefecture)", "福岡県 (Fukuoka Prefecture)", "佐賀県 (Saga Prefecture)", "長崎県 (Nagasaki Prefecture)", "熊本県 (Kumamoto Prefecture)", "大分県 (Oita Prefecture)", "宮崎県 (Miyazaki Prefecture)",
  "鹿児島県 (Kagoshima Prefecture)", "沖縄県 (Okinawa Prefecture)"
];

useEffect(() => {
  if (courseMode === "preset") {
    setSelectedTemplateId(shotTemplates.length > 0 ? shotTemplates[0].id : "");
  } else {
    setSelectedTemplateId("");
  }
  console.log(courseMode, "courseMode in useEffect"); 
}, [courseMode, shotTemplates]);

   // Update courseMode and coursesetting in formData when changed
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      courseMode,
      coursesetting: selectedTemplateId,
    }));
  }, [courseMode, selectedTemplateId]);

  useEffect(() => {
  if (formdataa) {
    console.log(formdataa, "formdataa in scoring category");
      if (formdataa.courseMode) {
      setCourseMode(formdataa.courseMode);
    }
    if (formdataa.selectedTemplateId !== undefined) {
      setSelectedTemplateId(formdataa.selectedTemplateId);
    }
    setFormData((prev) => ({
      ...prev,
      ...formdataa, // this will update all keys present in formdataa
    }));

    // If you want to update holeValues as well:
    const shotsPerHoles = formdataa.shotsPerHoles;
    if (Array.isArray(shotsPerHoles)) {
      setHoleValues([...shotsPerHoles]);
    } else if (typeof shotsPerHoles === "string") {
      try {
        const parsedHoles = JSON.parse(shotsPerHoles);
        if (Array.isArray(parsedHoles)) {
          setHoleValues(parsedHoles);
        }
      } catch (error) {
        // fallback or error handling
      }
    }
  }
}, [formdataa]);

 const token = localStorage.getItem("token");
/*useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GETTEMPLATES,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShotTemplates(response.data.courseEvents || {});
      console.log("Shot templates:", shotTemplates);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    }
  };

  fetchTemplates();
}, []);*/

 useEffect(() => {
    if (shotTemplates) {
      console.log("ScoringCategory got templates:", shotTemplates);
      // Use directly — no fetch here anymore
    }
  }, [shotTemplates]);

/*const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = Number(e.target.value);
  setSelectedTemplateId(selectedId);

  const selected = shotTemplates.find((t) => t.id === selectedId);
  if (selected) {
 //   setSelectedTemplateId(selectedId); // your own state for selected ID
  onTemplateSelect?.(selected); // send to parent
   const parValues = selected.holes
  .sort((a, b) => a.holeNumber - b.holeNumber)
  .map((hole) => hole.par);
    setHoleValues(parValues);
  }
};*/



  useEffect(() => {
    // Check if formdataa is defined and has shotsPerHoles
    console.log("formdataa updated:", formdataa);
  
    const shotsPerHoles = formdataa?.shotsPerHoles;
  console.log(shotsPerHoles, "shotperholes");
    if (Array.isArray(shotsPerHoles)) {
      // If shotsPerHoles is already an array, set it to holeValues
      setHoleValues([...shotsPerHoles]);
    } else if (typeof shotsPerHoles === "string") {
  try {
    // Try to parse as JSON array
    const parsedHoles = JSON.parse(shotsPerHoles);
    if (Array.isArray(parsedHoles)) {
      setHoleValues(parsedHoles);
    } else {
      // If not an array, maybe it's a CSV string
      const csvArray = shotsPerHoles.split(",").map(Number);
      if (csvArray.every((n) => !isNaN(n))) {
        setHoleValues(csvArray);
      } else {
        // fallback: default values
        setHoleValues(Array.from({ length: numHoles }, () => 4));
      }
    }
  } catch (error) {
    // If parsing fails, try CSV fallback
    const csvArray = shotsPerHoles.split(",").map(Number);
    if (csvArray.every((n) => !isNaN(n))) {
      setHoleValues(csvArray);
    } else {
      setHoleValues(Array.from({ length: numHoles }, () => 4));
    }
  }
} else {
  // fallback: default values
  setHoleValues(Array.from({ length: numHoles }, () => 4));
}
  }, [formdataa, numHoles]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = Number(e.target.value);
  setSelectedTemplateId(selectedId);

  const selected = shotTemplates.find((t) => t.id === selectedId);

  if (selected) {
    onTemplateSelect?.(selected);

    const parValues = selected.holes
      .sort((a, b) => Number(a.holeNumber) - Number(b.holeNumber))
      .map((hole) => hole.par);

    console.log("Par values:", parValues); // debug
    setHoleValues(parValues); // local state
    // OR if holeValues is from parent:
    // onHoleValuesChange?.(parValues);
  }
};
  
const handleCourseModeChange = (mode: "custom" | "preset") => {
    setCourseMode(mode);
    onCourseModeChange?.(mode); // notify parent
  }

const filteredTemplates = shotTemplates.filter(
  (template) => template.prefecture === selectedPrefecture
);

  const handleParInputChange = (e: any, index: any) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      const newHoleValues = [...holeValues];
      newHoleValues[index] = newValue;
      setHoleValues(newHoleValues);
    }
  };

  const [selectedScoringType, setSelectedScoringType] = useState<Tab>(
    Tab.Single
  );
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Single);
  const [formData, setFormData] = useState<FormData>({
    [Tab.Normal]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 0 }, (_, i) => String(i + 1)),
      driverContest: { enabled: false, score: 0 },
      nearPinContest: { enabled: false, score: 0 },
    },
    [Tab.Regular]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 0 }, (_, i) => String(i + 1)),
      driverContest: { enabled: false, score: 0 },
      nearPinContest: { enabled: false, score: 0 },
    },
    [Tab.Single]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 6 }, (_, i) => String(i + 1)),
      driverContest: { enabled: false, score: 0 },
      nearPinContest: { enabled: false, score: 0 },
    },
    [Tab.Double]: {
      field1: false,
      field2: false,
      selectedHoles: Array.from({ length: 12 }, (_, i) => String(i + 1)),
      driverContest: { enabled: false, score: 0 },
      nearPinContest: { enabled: false, score: 0 },
    },
    [Tab.Triple]: {
      field1: true,
      field2: false,
      selectedHoles: Array.from({ length: 9 }, (_, i) => String(i + 1)),
      driverContest: { enabled: false, score: 0 },
      nearPinContest: { enabled: false, score: 0 },
    },
  });
  const [showScoringType, setShowScoringType] = useState<any>(false);
  useEffect(() => {
    handleTabClick(Tab.Normal);
    if(showScoringType){
      handleTabClick(Tab.Regular);

    }
  }, [showScoringType]);

  const toggleScoringType = () => {
    setShowScoringType((prev: boolean) => !prev);
  };
  // useEffect(()=>{
  //   if(formdataa?.scoringType){
  //     setShowScoringType(true)
  //   }
  // },[formdataa])

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedScoringType(tab);
    const updatedEvent = {
      target: {
        checked: !selectedScoringType.includes(tab),
        name: tab,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleScoringTypeChange(updatedEvent);
  };

  const handleScoringTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    const scoringType = event.target.name as Tab;
    if (isChecked) {
      setSelectedScoringType(scoringType);
    } else {
      setSelectedScoringType(Tab.Regular);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [scoringType]: {
        ...prevFormData[scoringType],
        [event.target.name]: event.target.checked,
      },
    }));
    onChange(scoringType, event);
  };

  // const handleHoleSelection = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   scoretype:any,
  //   index: number
  // ) => {
  //   console.log(scoretype, "handleholeselection");
  //   const hole = String(index + 1);
  //   const updatedSelectedHoles = formData[
  //     selectedScoringType
  //   ].selectedHoles.includes(hole)
  //     ? formData[selectedScoringType].selectedHoles.filter((h) => h !== hole)
  //     : [...formData[selectedScoringType].selectedHoles, hole];

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [selectedScoringType]: {
  //       ...prevFormData[selectedScoringType],
  //       selectedHoles: updatedSelectedHoles,
  //     },
  //   }));
  // };

  const handleHoleSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    scoretype: any,
    index: number
  ) => {
    console.log(scoretype, "handleholeselection");
    const hole = String(index + 1);
    let updatedSelectedHoles:any;
  
    //peria
    if (scoretype === "single" && formData[selectedScoringType].selectedHoles.length >= 6) {
      if (formData[selectedScoringType].selectedHoles.includes(hole)) {
        updatedSelectedHoles = formData[selectedScoringType].selectedHoles.filter((h) => h !== hole);
      } else {
        alert("6 " + t("SELECT_HOLE"));
        updatedSelectedHoles = formData[selectedScoringType].selectedHoles;
      }
    }else if(scoretype === "double" && formData[selectedScoringType].selectedHoles.length >= 12) {
      if (formData[selectedScoringType].selectedHoles.includes(hole)) {
        updatedSelectedHoles = formData[selectedScoringType].selectedHoles.filter((h) => h !== hole);
      } else {
        alert("12 " + t("SELECT_HOLE"));
        updatedSelectedHoles = formData[selectedScoringType].selectedHoles;
      }
    }else if (scoretype === "triple" && formData[selectedScoringType].selectedHoles.length >= 9) {
        if (formData[selectedScoringType].selectedHoles.includes(hole)) {
          updatedSelectedHoles = formData[selectedScoringType].selectedHoles.filter((h) => h !== hole);
        } else {
          alert("9 " + t("SELECT_HOLE"));
          updatedSelectedHoles = formData[selectedScoringType].selectedHoles;
        }
      }   
    else { 
      updatedSelectedHoles = formData[selectedScoringType].selectedHoles.includes(hole)
        ? formData[selectedScoringType].selectedHoles.filter((h) => h !== hole)
        : [...formData[selectedScoringType].selectedHoles, hole];
    }
  

    // //double
    // if (scoretype === "double" && formData[selectedScoringType].selectedHoles.length >= 12) {
    //   if (formData[selectedScoringType].selectedHoles.includes(hole)) {
    //     updatedSelectedHoles = formData[selectedScoringType].selectedHoles.filter((h) => h !== hole);
    //   } else {
    //     alert("You have already selected 12 holes for the double score type. Please deselect another hole to select this one.");
    //     updatedSelectedHoles = formData[selectedScoringType].selectedHoles;
    //   }
    // } else { 
    //   updatedSelectedHoles = formData[selectedScoringType].selectedHoles.includes(hole)
    //     ? formData[selectedScoringType].selectedHoles.filter((h) => h !== hole)
    //     : [...formData[selectedScoringType].selectedHoles, hole];
    // }
    // //tripe
    // if (scoretype === "tripe" && formData[selectedScoringType].selectedHoles.length >= 9) {
    //   if (formData[selectedScoringType].selectedHoles.includes(hole)) {
    //     updatedSelectedHoles = formData[selectedScoringType].selectedHoles.filter((h) => h !== hole);
    //   } else {
    //     alert("You have already selected 9 holes for the double score type. Please deselect another hole to select this one.");
    //     updatedSelectedHoles = formData[selectedScoringType].selectedHoles;
    //   }
    // } else {
    //   updatedSelectedHoles = formData[selectedScoringType].selectedHoles.includes(hole)
    //     ? formData[selectedScoringType].selectedHoles.filter((h) => h !== hole)
    //     : [...formData[selectedScoringType].selectedHoles, hole];
    // }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [selectedScoringType]: {
        ...prevFormData[selectedScoringType],
        selectedHoles: updatedSelectedHoles,
      },
    }));
  };
  
  useEffect(() => {
    localStorage.setItem("score", selectedScoringType);
    localStorage.setItem(
      "selected",
      JSON.stringify(formData[selectedScoringType].selectedHoles)
    );

    // const selectedParValues = holeValues.filter((_, index) =>
    //   formData[selectedScoringType].selectedHoles.includes(String(index + 1))
    // );

    localStorage.setItem("par", JSON.stringify(holeValues));
  }, [selectedScoringType, formData, holeValues]);

  const toggleContestEnabled = (
    scoringType: Tab,
    contestType: "driverContest" | "nearPinContest"
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [scoringType]: {
        ...prevFormData[scoringType],
        [contestType]: {
          ...prevFormData[scoringType][contestType],
          enabled: !prevFormData[scoringType][contestType].enabled,
        },
      },
    }));
  };

  useEffect(() => {
  if (formdataa) {
    setFormData((prev) => ({
      ...prev,
      ...formdataa, // this will update all keys present in formdataa
    }));

    // If you want to update holeValues as well:
    const shotsPerHoles = formdataa.shotsPerHoles;
    if (Array.isArray(shotsPerHoles)) {
      setHoleValues([...shotsPerHoles]);
    } else if (typeof shotsPerHoles === "string") {
      try {
        const parsedHoles = JSON.parse(shotsPerHoles);
        if (Array.isArray(parsedHoles)) {
          setHoleValues(parsedHoles);
        }
      } catch (error) {
        // fallback or error handling
      }
    }
  }
}, [formdataa]);

  console.log(formData, "sccore");
  return (
    <div className="px-2 py-10 mx-auto lg:max-w-7xl">
      <div
        className="p-4 mt-4 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="flex gap-2 items-center">
          <h2 className="text-4xl text-[#626262]">{t("SCORING_CATEGORY")}</h2>
          <div className="relative">
            <div>
              <input
                type="checkbox"
                className="sr-only"
                checked={showScoringType}
                onChange={toggleScoringType}
              />
            </div>

            <div
              onClick={toggleScoringType}
              className={`block bg-gray-600 w-14 h-8 rounded-full ${
                showScoringType ? "bg-[green]" : ""
              }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                showScoringType ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
        {showScoringType && (
          <>
            <h4 className="text-[#626262]">
              01{" "}
              <span className="ml-4 text-[#626262]">{t("SCORING_TYPE")}</span>
            </h4>
            <div className="flex-wrap xl:flex-nowrap xl:flex gap-0 xl:gap-10">
              <div>
                <input
                  className="rounded-full border-[#CCC] border-1 border-solid"
                  type="checkbox"
                  checked={showScoringType ? selectedScoringType === Tab.Regular : false}
                  name={Tab.Regular}
                  onChange={handleScoringTypeChange}
                />
                <button
                  onClick={() => handleTabClick(Tab.Regular)}
                  type="button"
                  className={
                    activeTab === Tab.Regular
                      ? "active-tab bg-[#51ff85] rounded-md cursor-pointer  py-2 px-4"
                      : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
                  }
                >
                  {t("REGULAR")}
                </button>
              </div>
              <div>
                <input
                  className="rounded-full border-[#CCC] border-1 border-solid"
                  type="checkbox"
                  checked={selectedScoringType === Tab.Single}
                  name={Tab.Single}
                  onChange={handleScoringTypeChange}
                />
                <button
                  onClick={() => handleTabClick(Tab.Single)}
                  type="button"
                  className={
                    activeTab === Tab.Single
                      ? "active-tab bg-[#51ff85] rounded-md cursor-pointer  py-2 px-4"
                      : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
                  }
                >
                  {t("PERIA")}
                </button>
              </div>
              <div>
                <input
                  className="rounded-full border-[#CCC] border-1 border-solid"
                  type="checkbox"
                  checked={selectedScoringType === Tab.Double}
                  name={Tab.Double}
                  onChange={handleScoringTypeChange}
                />
                <button
                  onClick={() => handleTabClick(Tab.Double)}
                  type="button"
                  className={
                    activeTab === Tab.Double
                      ? "active-tab bg-[#51ff85] rounded-md  cursor-pointer py-2 px-4"
                      : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
                  }
                >
                  {t("DOUBLE_PERIA")}
                </button>
              </div>
              <div>
                <input
                  className="rounded-full border-[#CCC] border-1 border-solid"
                  type="checkbox"
                  checked={selectedScoringType === Tab.Triple}
                  name={Tab.Triple}
                  onChange={handleScoringTypeChange}
                />
                <button
                  onClick={() => handleTabClick(Tab.Triple)}
                  type="button"
                  className={
                    activeTab === Tab.Triple
                      ? "active-tab bg-[#51ff85] rounded-md  cursor-pointer py-2 px-4"
                      : "bg-transparent py-2 px-4 cursor-pointer text-[#626262]"
                  }
                >
                  {t("TRIPLE_PERIA")}
                </button>
              </div>
            </div>
      <div className="mt-10 mb-5">
        {/* Radio buttons for custom or preset template */}
        <label className="mr-4">
          <input
            type="radio"
            name="courseMode"
            value="preset"
            checked={courseMode === "preset"}
            onChange={() => {
             handleCourseModeChange("preset");
            }}
          />
          {t("PRESET_TEMPLATE")}
        </label>
        <label>
          <input
            type="radio"
            name="courseMode"
            value="custom"
            checked={courseMode === "custom"}
            onChange={() => {
           handleCourseModeChange("custom")
          }}
          />
          {t("CUSTOM_TEMPLATE")}
        </label>
      </div>

          {courseMode === "preset" && (
        <div className="my-4 flex items-center gap-4">
          <div>
           <label className="text-[#626262] mr-2">{t("PLACE")}:</label>
             <select
    value={selectedPrefecture}
    onChange={(e) => {   setSelectedPrefecture(e.target.value);
    setSelectedTemplateId("");
    setHoleValues(Array.from({ length: numHoles }, () => 4));
 }}
    className="border px-2 py-1 rounded"
  >
    <option value="">Select a prefecture</option>
    {prefectures.map((pref) => (
      <option key={pref} value={pref}>
        {pref}
      </option>
    ))}
  </select></div>
  <div>
        <label className="text-[#626262] mr-2">{t("SELECT_TEMPLATE")}:</label>
      <select name="coursesetting" value={selectedTemplateId} onChange={handleTemplateChange}>
        <option value="">{t("SELECT_TEMPLATE")}</option>
        {filteredTemplates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      </div>
      </div>
      )}

        {selectedScoringType === Tab.Regular && (
              <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
                <div className="col-span-8  py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
                  <h4 className="text-[#626262] hidden">{t("PLEASE_HOLE")} </h4>
                  <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div className="flex items-center my-2" key={index + 1}>
                        <div className="flex items-center gap-3">
                          {/* <input
                            type="checkbox"
                            checked={formData[
                              selectedScoringType
                            ].selectedHoles.includes(String(index + 1))}
                            onChange={(e) => handleHoleSelection(e,"regular", index)}
                            id={String(index + 1)}
                            className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                          />*/}
                          <label
                            htmlFor={String(index + 1)}
                            className="text-[#626262]"
                          >
                            {t("HOLE")}
                            <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
                              {index + 1}
                            </span>
                          </label>
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor={String(index + 1)}
                              className="text-[#626262]"
                            >
                              {t("Par")}
                            </label>
                            <input
                              className="text-center appearance-none block w-[30px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-1 px-2 leading-tight focus:outline-none "
                              id={String(index + 1)}
                              type="number"
                              name="nearPinContest"
                              placeholder=""
                              value={holeValues[index]}
                              min="0"
                              onChange={(e) => handleParInputChange(e, index)}
                              readOnly={selectedTemplateId !== ""} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {selectedScoringType === Tab.Single && (
              <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
                <div className="col-span-8 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
                  <h4 className="text-[#626262]">06 {t("SELECT_HOLE")} </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div className="flex items-center gap-5" key={index + 1}>
                        <div className="flex items-center my-2">
                          <input
                            type="checkbox"
                            checked={formData[
                              selectedScoringType
                            ].selectedHoles.includes(String(index + 1))}
                            onChange={(e) => handleHoleSelection(e,"single", index)}
                            id={String(index + 1)}
                            className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                          />
                          <label
                            htmlFor={String(index + 1)}
                            className="text-[#626262]"
                          >
                            {t("HOLE")}
                            <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
                              {index + 1}
                            </span>
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <label
                            htmlFor={String(index + 1)}
                            className="text-[#626262]"
                          >
                            {t("Par")}
                          </label>
                          <input
                            className="text-center appearance-none block w-[30px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-1 px-2 leading-tight focus:outline-none "
                            id={String(index + 1)}
                            type="number"
                            name="par"
                            placeholder=""
                            value={holeValues[index]}
                            min="0"
                            onChange={(e) => handleParInputChange(e, index)}
                             readOnly={selectedTemplateId !== ""} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedScoringType === Tab.Double && (
              <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
                <div className="col-span-8 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
                  <h4 className="text-[#626262]">12 {t("SELECT_HOLE")} </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div className="flex items-center gap-3" key={index + 1}>
                        <div className="flex items-center my-2">
                          <input
                            type="checkbox"
                            checked={formData[
                              selectedScoringType
                            ].selectedHoles.includes(String(index + 1))}
                            onChange={(e) => handleHoleSelection(e,"double", index)}
                            id={"double" + String(index + 1)}
                            className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                          />
                          <label
                            htmlFor={`double${index + 1}`}
                            className="text-[#626262]"
                          >
                            {t("HOLE")}
                            <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full text-[#626262]">
                              {index + 1}
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <label
                            htmlFor={String(index + 1)}
                            className="text-[#626262]"
                          >
                            {t("Par")}
                          </label>
                          <input
                            className="text-center appearance-none block w-[30px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-1 px-2 leading-tight focus:outline-none "
                            id={String(index + 1)}
                            type="number"
                            name="par"
                            placeholder=""
                            value={holeValues[index]}
                            min="0"
                            onChange={(e) => handleParInputChange(e, index)}
                             readOnly={selectedTemplateId !== ""} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedScoringType === Tab.Triple && (
              <div className="grid grid-cols-9 mx-auto text-[#626262] lg:gap-x-16 ">
                <div className="col-span-8 py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
                  <h4>09 {t("SELECT_HOLE")} </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div className="flex items-center gap-3" key={index + 1}>
                        <div className="flex items-center my-2">
                          <input
                            type="checkbox"
                            checked={formData[
                              selectedScoringType
                            ].selectedHoles.includes(String(index + 1))}
                            onChange={(e) => handleHoleSelection(e,"triple", index)}
                            id={String(index + 1)}
                            className="p-3 shadow-lg border-solid border-2 border-[#51ff85] rounded-full"
                          />
                          <label htmlFor={`triple${index + 1}`}>
                            {t("HOLE")}
                            <span className="py-[2px] px-2 border-solid border-2 border-[#51ff85] rounded-full">
                              {index + 1}
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <label
                            htmlFor={String(index + 1)}
                            className="text-[#626262]"
                          >
                            {t("Par")}
                          </label>
                          <input
                            className="text-center appearance-none block w-[30px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-1 px-2 leading-tight focus:outline-none "
                            id={String(index + 1)}
                            type="number"
                            name="par"
                            placeholder=""
                            value={holeValues[index]}
                            min="0"
                            onChange={(e) => handleParInputChange(e, index)}
                             readOnly={selectedTemplateId !== ""} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <p className="text-[#626262]">{t("OPTIONAL")}</p>

            <div className="flex items-center col-span-12 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
              <label
                htmlFor="driverContest"
                className="block mb-2 text-xs font-bold tracking-wide text-[#626262] capitalize"
              >
                02
                <span className="ml-4">{t("DRIVER_CONTEST")}</span>
              </label>
              {formData[selectedScoringType].driverContest.enabled && (
                <input
                  className="text-center appearance-none block w-[50px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none"
                  id="driverContest"
                  type="number"
                  name="driverContest"
                  placeholder=""
                  min="0"
                  max="18"
                  onChange={onInputChange}
                />
              )}
              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative ml-10">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={
                        formData[selectedScoringType].driverContest.enabled
                      }
                      onChange={() =>
                        toggleContestEnabled(
                          selectedScoringType,
                          "driverContest"
                        )
                      }
                    />
                    <div
                      className={`block bg-gray-600 w-14 h-8 rounded-full ${
                        formData[selectedScoringType].driverContest.enabled
                          ? "bg-green-600"
                          : ""
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white ${
                        formData[selectedScoringType].driverContest.enabled &&
                        "left-[26px]"
                      } w-6 h-6 rounded-full transition`}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center col-span-12 py-2 space-x-4 lg:col-span-2 md:col-span-2 md:mr-0 md:mb-3">
              <label
                htmlFor="nearPinContest"
                className="block mb-2 text-xs font-bold tracking-wide text-[#626262] capitalize"
              >
                03 <span className="ml-4">{t("PIN_CONTEST")}</span>
              </label>
              {formData[selectedScoringType].nearPinContest.enabled && (
                <input
                  className="text-center appearance-none block w-[50px] bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-4 px-2 mb-3 ml-[36px] leading-tight focus:outline-none"
                  id="nearPinContest"
                  type="number"
                  name="nearPinContest"
                  placeholder=""
                  min="0"
                  max="18"
                  onChange={onInputChange}
                />
              )}
              <div className="relative ml-10">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={formData[selectedScoringType].nearPinContest.enabled}
                  onChange={() =>
                    toggleContestEnabled(selectedScoringType, "nearPinContest")
                  }
                />
                <div
                  onClick={() =>
                    toggleContestEnabled(selectedScoringType, "nearPinContest")
                  }
                  className={`block bg-gray-600 w-14 h-8 rounded-full ${
                    formData[selectedScoringType].nearPinContest.enabled
                      ? "bg-green-600"
                      : ""
                  }`}
                ></div>
                <div
                  className={`dot absolute bg-white left-1 top-1 ${
                    formData[selectedScoringType].nearPinContest.enabled &&
                    "left-[26px]"
                  } w-6 h-6 rounded-full transition`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoringCategory;