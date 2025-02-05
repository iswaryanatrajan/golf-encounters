import React, { useEffect, useState } from "react";
import TournamentBg from "../components/TournamentBg";
import BasicInfo from "../components/BasicInfo";
import Recuitments, { Tab, formatTimeCreateForm } from "../components/Recruitment";
import ItemInstruction from "../components/ItemInstruction";
import ScoringCategory from "../components/ScoringCategory";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import PaymentDetails, { Click } from "../components/PaymentDetails";
import { ToastProvider } from "../utils/ToastProvider";
import { useToast } from "../utils/ToastProvider";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { CreatedEventContext, createdEventsStore, eventContextStore, singleEventContextStore } from "../contexts/eventContext";
import { toast } from "react-toastify";



const EditEvent: React.FC = () => {
    const { id } = createdEventsStore();
    const {singleEvent} = singleEventContextStore();
    const userId = localStorage.getItem('id');
    const router = useNavigate();
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();

    const [formData, setFormData] = useState<any>({
      
        eventType: singleEvent?.eventType,
        eventName: singleEvent?.eventName,
        address: singleEvent?.address,
        files: null,
        eventDetails: singleEvent?.eventDetails,
        eventVideoUrl: singleEvent?.eventVideoUrl,
        categories: singleEvent?.categories,
        place: singleEvent?.place,
        placeCoordinates: {
        lat: singleEvent?.lat,
        lng: singleEvent?.lng,
        },
        capacity:singleEvent?.capacity,
        selfIncluded: singleEvent?.selfIncluded,
        eventStartDate: "",
        eventStartTime: "",
        eventEndDate: singleEvent?.eventEndDate,
        eventEndTime: singleEvent?.eventEndTime,
        recruitmentStartDate: singleEvent?.recruitmentStartDate,
        recruitmentStartTime: singleEvent?.recruitmentStartTime,
        eventDeadlineDate: singleEvent?.eventDeadlineDate,
        eventDeadlineTime: singleEvent?.eventDeadlineTime,
        matchType: singleEvent?.matchType,
        paymentType: singleEvent?.paymentType,
        bankName: singleEvent?.bankName,
        branchName: singleEvent?.branchName,
        accountNumber: singleEvent?.accountNumber,
        accountHolderName: singleEvent?.accountHolderName,
        paypalId: singleEvent?.paypalId,
        teamSize: singleEvent?.teamSize,
        participationFee: singleEvent?.participationFee,
        isEventPublished: singleEvent?.isEventPublished,
        hideParticipantName: singleEvent?.hideParticipantName,
        isRequiresApproval: singleEvent?.isRequiresApproval,
        scoringType: singleEvent?.scoringType,
        selectedHoles: singleEvent?.selectedHoles,
        shotsPerHoles: singleEvent?.shotsPerHoles,
        driverContest:  singleEvent?.driverContest,
        nearPinContest:  singleEvent?.nearPinContest,
        creatorId: userId,
        fullNameCheckBox: "",
        emailCheckBox: "",
        telephoneCheckBox: "",
        handicapCheckBox: "",

  });

  const { showToast } = useToast();



//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
    
//     if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
//       const { checked } = e.target;
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
 
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
  const defaultImage1 = "/img/BG-GOLF.jpg";
  const defaultImage2 = "/img/BG-GOLF.jpg";
  const defaultImage3 = "/img/BG-GOLF.jpg";

  // const getDefaultImages = async (): Promise<File[]> => {


  //   const defaultImageFiles = await Promise.all([
  //     getDefaultImageFile(defaultImage1),
  //     getDefaultImageFile(defaultImage2),
  //     getDefaultImageFile(defaultImage3),
  //   ]);
  //   return defaultImageFiles;
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (submitting) {
      return;
    }
  
    let updatedFiles: File[] = [];
    // if (formData.files && formData.files?.length > 0) {
    //   updatedFiles = formData.files;
    //   if (formData.files.length === 1) {
    //     const defaultFiles = await getDefaultImages();
    //     updatedFiles.push(...defaultFiles.slice(0, 2));
    //   } else if (formData.files.length === 2) {
    //     const defaultFiles = await getDefaultImages();
    //     updatedFiles.push(...defaultFiles.slice(0, 1));
    //   }
    // } else {
    //   updatedFiles = await getDefaultImages();
    // }
  
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      files: updatedFiles,
    }));
    setSubmitting(true)
    const formdata = new FormData();

    updatedFiles.forEach((file: File) => {
      formdata.append("files[]", file);
    });

    const selectedScoringType = localStorage.getItem("score") ?? "";
    const selectedHoles = localStorage.getItem("selected") || "[]";
    const numberArray = JSON.parse(selectedHoles).map((str: string) =>
      parseInt(str, 10)
    );
    const par = localStorage.getItem("par") || "[]";
    const parArray = JSON.parse(par).map((str: string) => parseInt(str, 10));

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
      const response = await axios.put(API_ENDPOINTS.UPDATE_EVENT + singleEvent?.id, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.removeItem("score");
        localStorage.removeItem("selected");
        localStorage.removeItem("par");
        router('/created-events')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error occurred while editing the event");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentDetailsChange = (
    formDataUpdate: any,
    paymentType: Click,

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
  useEffect(() => {
    if (singleEvent) {
      setFormData({
        eventType: singleEvent?.eventType,
        eventName: singleEvent?.eventName,
        files: singleEvent?.imageUrl,
        eventDetails: singleEvent?.eventDetails,
        eventVideoUrl: singleEvent?.eventVideoUrl,
        categories: singleEvent?.categories,
        address: singleEvent?.address,
        place: singleEvent?.place,
        placeCoordinates: {
        lat: singleEvent?.lat,
        lng: singleEvent?.lng,
        },
        capacity:singleEvent?.capacity,
        selfIncluded: singleEvent?.selfIncluded,
        eventStartDate: singleEvent?.eventStartDate,
        eventStartTime: formatTimeCreateForm(singleEvent?.eventStartTime),
        eventEndDate: singleEvent?.eventEndDate,
        eventEndTime: formatTimeCreateForm(singleEvent?.eventEndTime),
        recruitmentStartDate: singleEvent?.recruitmentStartDate,
        recruitmentStartTime: formatTimeCreateForm(singleEvent?.recruitmentStartTime),
        eventDeadlineDate: singleEvent?.eventDeadlineDate,
        eventDeadlineTime: formatTimeCreateForm(singleEvent?.eventDeadlineTime),
        matchType: singleEvent?.matchType,
        paymentType: singleEvent?.paymentType,
        bankName: singleEvent?.bankName,
        branchName: singleEvent?.branchName,
        accountNumber: singleEvent?.accountNumber,
        accountHolderName: singleEvent?.accountHolderName,
        paypalId: singleEvent?.paypalId,
        teamSize: singleEvent?.teamSize,
        participationFee: singleEvent?.participationFee,
        isEventPublished: singleEvent?.isEventPublished,
        hideParticipantName: singleEvent?.hideParticipantName,
        isRequiresApproval: singleEvent?.isRequiresApproval,
        scoringType: singleEvent?.scoringType,
        selectedHoles: singleEvent?.selectedHoles,
        shotsPerHoles: singleEvent?.shotsPerHoles,
        driverContest:  singleEvent?.driverContest,
        nearPinContest:  singleEvent?.nearPinContest,
        cancellationFee:  singleEvent?.cancellationFee,
        creatorId: userId,
      });
      
    }
  }, [singleEvent]);
  console.log(singleEvent, "assadasd")
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
  

  const itemInstructions = (updatedValues: any) => {
    const convertedValues = {
        fullNameCheckBox: updatedValues?.fullNameCheckbox ? '1' : '0',
        emailCheckBox: updatedValues.emailCheckbox ? '1' : '0',
        telephoneCheckBox: updatedValues.telephoneCheckbox ? '1' : '0',
        handicapCheckBox: updatedValues.handicapCheckbox ? '1' : '0'
    };
    console.log(updatedValues?.fullNameCheckbox, "asdasd");

    setFormData((prev: any) => ({
        ...prev,
        ...convertedValues,
    }));
  }
  const toggleScoringEnabled = (enabled: boolean) => {
    setIsScoringEnabled(enabled);
  };
  return (
    <ToastProvider iconColor="white" textColor="white">
      <div
        className="p-2 xl:p-10 rounded-2x"
      >
        <div className=" animate__animated animate__lightSpeedInRight">
          <TournamentBg />
        </div>

        <form method="post" id="foirm" encType="multipart/form-data">
          <BasicInfo onChange={handleChange} setFormData={setFormData} formData={formData}/>

          <Recuitments setFormData={setFormData} onChange={handleRecruitmentTabsChange} formData={formData}/>

          <ItemInstruction handleChange={itemInstructions}/>
          <ScoringCategory
            onChange={handleScoringTypeChange}
            onInputChange={handleChange}
            selectedHoles={formData.selectedHoles || []}
            formdataa={formData}
          />

          <PaymentDetails setFormData={setFormData} onChange={handlePaymentDetailsChange} formData={formData}/>
          <div className="p-2 ">
            <div className="">
              <div className="flex justify-center gap-2 mx-4">
                <div className="py-6">
                  <button
                    type="button"
                    className="   text-white bg-[#52FF86] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("PREV")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className=" glow-on-hover transform transition duration-300 ease-in-out text-black hover:text-white bg-[#ffff] border border-[#52FF86] shadow-xl ring-blue-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {'Update'}
                  </button>
                  <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
                    {t("CLEAR")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ToastProvider>
  );
};

export default EditEvent;

function setIsScoringEnabled(enabled: boolean) {
  throw new Error("Function not implemented.");
}

