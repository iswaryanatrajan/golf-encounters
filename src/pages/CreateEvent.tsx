import React, { useState } from "react";
import TournamentBg from "../components/TournamentBg";
import BasicInfo from "../components/BasicInfo";
import Recuitments, { Tab } from "../components/Recruitment";
import ItemInstruction from "../components/ItemInstruction";
import ScoringCategory from "../components/ScoringCategory";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import PaymentDetails, { Click } from "../components/PaymentDetails";
import { ToastProvider } from "../utils/ToastProvider";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const stripe = require("stripe")("sk_test_51PBH1RGfCaPJBtru0fuyrSojJ8nlHs9Vnufmi2JPk5BbxsiYPo4wyX7qW0lP8OvlzTsVxv9BlTeXMzZOPL2UxDJi00S166RaoB");

interface CreateEventType {
  id?: number;
  eventType?: string;
  eventName?: string;
  files?: File[] | null;
  video?: string;
  eventDetails?: string;
  address?: string;
  eventVideoUrl?: string;
  categories?: string;
  place?: string;
  placeCoordinates?: { lat: string; lng: string };
  capacity?: number;
  selfIncluded?: boolean;
  eventStartDate?: string;
  eventStartTime?: string;
  eventEndDate?: string;
  eventEndTime?: string;
  recruitmentStartDate?: string;
  recruitmentStartTime?: string;
  eventDeadlineDate?: string;
  eventDeadlineTime?: string;
  matchType?: string;
  paymentType?: string;
  bankName?: string;
  branchName?: string;
  accountHolderName?: string;
  accountNumber?: number;
  paypalId?: string;
  teamSize?: number;
  participationFee?: number;
  isEventPublished?: boolean;
  hideParticipantName?: boolean;
  isRequiresApproval?: boolean;
  scoringType?: string;
  fullNameCheckBox: number,
  emailCheckBox: number,
  telephoneCheckBox: number,
  handicapCheckBox: number,
  selectedHoles?: string[];
  shotsPerHoles?: string[];
  driverContest?: number;
  nearPinContest?: number;
  
}

const CreateEvent: React.FC = () => {
  const router = useNavigate();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const [formData, setFormData] = useState<CreateEventType>({
    eventType: "",
    eventName: "",
    files: null,
    eventDetails: "",
    eventVideoUrl: "",
    categories: "",
    place: "",
    placeCoordinates: {
      lat: "",
      lng: "",
    },
    capacity: 1,
    selfIncluded: false,
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    recruitmentStartDate: "",
    recruitmentStartTime: "",
    eventDeadlineDate: "",
    eventDeadlineTime: "",
    matchType: "",
    paymentType: "",
    bankName: "",
    branchName: "",
    accountNumber: 0,
    accountHolderName: "",
    paypalId: "",
    teamSize: 1,
    participationFee: 0,
    isEventPublished: false,
    hideParticipantName: false,
    isRequiresApproval: false,
    scoringType: "",
    selectedHoles: [],
    shotsPerHoles: [],
    driverContest: 0,
    nearPinContest: 0,
    fullNameCheckBox: 0,
    emailCheckBox: 0,
    telephoneCheckBox: 0,
    handicapCheckBox: 0,
  });

  console.log(formData, 'CBZ')
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
 
  
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const { checked } = e.target;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleScoringTypeChange = (
    scoringType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, id, checked } = event.target;
    const updatedScoringType = checked ? name : "";
    if (scoringType === "holes") {
      let holes: string[] = formData.selectedHoles || [];
      if (holes.includes(id)) {
        holes = holes.filter((i) => i === id);
      } else {
        holes.push(id);
      }
      setFormData({ ...formData, selectedHoles: holes });
    } else {
      setFormData({ ...formData, scoringType: updatedScoringType });
    }
  };
  const [submitting, setSubmitting] = useState(false);
  
  
  
    
    

  
    
  const getDefaultImageFile = async (imagePath: string): Promise<File> => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const imageName = imagePath.split("/").pop();
    return new File([blob], imageName || "defaultName.png", {
      type: blob.type,
    }); 
  };
  const defaultImage1 = "/img/second-image.jpg";
  const defaultImage2 = "/img/third.jpg";
  const defaultImage3 = "/img/BG-GOLF.jpg";

  const getDefaultImages = async (): Promise<File[]> => {


    const defaultImageFiles = await Promise.all([
      getDefaultImageFile(defaultImage1),
      getDefaultImageFile(defaultImage2),
      getDefaultImageFile(defaultImage3),
    ]);
    return defaultImageFiles;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);

    let updatedFiles: File[] = [];
    if (formData.files && formData.files.length > 0) {
      updatedFiles = formData.files;
      if (formData.files.length === 1) {
        const defaultFiles = await getDefaultImages();
        updatedFiles.push(...defaultFiles.slice(0, 2));
      } else if (formData.files.length === 2) {
        const defaultFiles = await getDefaultImages();
        updatedFiles.push(...defaultFiles.slice(0, 1));
      }
    } else {
      updatedFiles = await getDefaultImages();
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      files: updatedFiles,
    }));

    const formdata = new FormData();

    updatedFiles.forEach((file: File) => {
      formdata.append("files[]", file);
    });

    const selectedScoringType = localStorage.getItem("score") ?? "";
    const selectedHoles = localStorage.getItem("selected") || "[]";
    const numberArray = JSON.parse(selectedHoles)?.map((str: string) =>
      parseInt(str, 10)
    );
    const par = localStorage.getItem("par") || "[]";
    const parArray = JSON.parse(par)?.map((str: string) => parseInt(str, 10));

    const updatedFormData: any = {
      ...formData,
      selectedScoringType: selectedScoringType,
      selectedHoles: numberArray,
      shotsPerHoles: parArray,
    };

    Object.keys(updatedFormData).forEach((key) => {
      let value: any = updatedFormData[key];
      if (key === "files" && value) {
        value.forEach((file: File) => {
          formdata.append("files[]", file);
        });
      } else if (key === "placeCoordinates") {
        formdata.append(
          "placeCoordinates[lat]",
          updatedFormData.placeCoordinates.lat
        );
        formdata.append(
          "placeCoordinates[lng]",
          updatedFormData.placeCoordinates.lng
        );
      } else {
        formdata.append(key, value);
      }
    });

    try {
      const response = await axios.post(API_ENDPOINTS.CREATEEVENT, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

      if (response.status === 201) {
        toast.success(t("EVENT_CREATED"));
        localStorage.removeItem("score");
        localStorage.removeItem("selected");
        localStorage.removeItem("par");
        router("/event-main-page");
      } else {
        toast.error(t("ERROR_ACCURED"));
      }
    } catch (error) {
      toast.error(t("ERROR_ACCURED"));
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentDetailsChange = (
    formDataUpdate: any,
    paymentType: Click
  ) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      paymentType,
    }));
  };

  const handleRecruitmentTabsChange = (formDataUpdate: any, eventType: Tab) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formDataUpdate,
      eventType,
    }));
  };

  const itemInstructions = (updatedValues: any) => {
    const convertedValues = {
        fullNameCheckBox: updatedValues.fullNameCheckbox ? '1' : '0',
        emailCheckBox: updatedValues.emailCheckbox ? '1' : '0',
        telephoneCheckBox: updatedValues.telephoneCheckbox ? '1' : '0',
        handicapCheckBox: updatedValues.handicapCheckbox ? '1' : '0'
    };

    setFormData((prev: any) => ({
        ...prev,
        ...convertedValues,
    }));
};


   


  return (
    
    <ToastProvider iconColor="white" textColor="white">
      {eventId && <div
        className="p-2 xl:p-10 rounded-2x"
      >
        <div className=" animate__animated animate__lightSpeedInRight">
          <TournamentBg />
        </div>

        <form method="post" id="foirm" encType="multipart/form-data">
          <BasicInfo onChange={handleChange} setFormData={setFormData} />
          <PaymentDetails setFormData={setFormData} onChange={handlePaymentDetailsChange} formData={formData}/>
          <Recuitments setFormData={setFormData} onChange={handleRecruitmentTabsChange} />

          <ItemInstruction  handleChange={itemInstructions}/>
          <ScoringCategory
            onChange={handleScoringTypeChange}
            onInputChange={handleChange}
            selectedHoles={formData.selectedHoles || []}
           
          />

          
          <div className="p-2 ">
            <div className="">
              <div className="flex justify-center gap-2 mx-4">
                <div className="py-6">
                  <button
                    type="button"
                    className="  text-[#626262] bg-[#52FF86] hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("PREV")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className=" glow-on-hover text-black bg-[#ffff] border border-[#52FF86] 
                    shadow-xl ring-blue-300  focus:outline-none focus:ring-4 focus:ring-blue-300
                     font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 "
                  >
                    {submitting ? t("CREATING_EVENT") : t("UPDATE")}
                  </button>
                  <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
                    {t("CLEAR")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>}
    </ToastProvider>
  );
};

export default CreateEvent;

function setIsScoringEnabled(enabled: boolean) {
  throw new Error("Function not implemented.");
}

