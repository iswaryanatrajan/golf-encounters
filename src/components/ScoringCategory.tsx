import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ScoringTypeProps {
  onChange: (
    scoringType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedHoles: string[];
  formdataa?:any;
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
  formdataa
}) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const numHoles = 18;
  const [holeValues, setHoleValues] = useState(
    Array.from({ length: numHoles }, () => 4)
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
                  className="rounded-full"
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
                  className="rounded-full"
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
                  className="rounded-full"
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
                  className="rounded-full"
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
            {selectedScoringType === Tab.Regular && (
              <div className="grid grid-cols-9 mx-auto lg:gap-x-16">
                <div className="col-span-8  py-2 lg:col-span-12 md:col-span-5 md:mr-0 md:mb-3">
                  <h4 className="text-[#626262] hidden">{t("PLEASE_HOLE")} </h4>
                  <div className="grid grid-cols-1 hidden gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div className="flex items-center my-2" key={index + 1}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData[
                              selectedScoringType
                            ].selectedHoles.includes(String(index + 1))}
                            onChange={(e) => handleHoleSelection(e,"regular", index)}
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