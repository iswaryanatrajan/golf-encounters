import React, { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export type Click = "bank" | "paypal";

interface PaymentDetailsProps {
  onChange: (formData: Record<string, any>, paymentType: Click) => void;
  formData?: any;
  setFormData?: any;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  onChange,
  setFormData,
  formData,
}) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<Click>("bank");
  // const [formData, setFormData] = useState({
  //   bank: {
  //     bankName: "",
  //     branchName: "",
  //     accountNumber: "",
  //     accountHolderName: "",
  //     participationFee: 0,
  //   },
  //   paypal: {
  //     paypalId: "",
  //     participationFee: 0,
  //     hideParticipantName: false,
  //   },
  // });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData: any) => ({
      ...prevData,
      [activeTab]: {
        ...prevData[activeTab],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  useEffect(() => {
    if (showPaymentDetails) {
      console.log("After update", formData);
      onChange(formData[activeTab], activeTab);
    }
  }, [formData, activeTab, showPaymentDetails]);
  return (
    <div className="p-2 mx-auto lg:max-w-7xl ">
      <div
        className="p-4 mt-4 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.05) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                onChange={() => setShowPaymentDetails(!showPaymentDetails)}
                checked={showPaymentDetails}
              />
              <div
                className={`block bg-gray-600 w-14 h-8 rounded-full ${
                  showPaymentDetails ? "bg-[green]" : ""
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  showPaymentDetails ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
            <div className="ml-3 font-medium text-[#626262]">
              {t("ADD_PAYMENT_DETAILS")}
            </div>
          </label>
        </div>
        {/* <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
            htmlFor="grid-short-video"
          >
            {t("participation Fee")}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
            id="grid-first-name"
            type="text"
            name="participationFee"
            value={formData.participationFee}
            onChange={handleInputChange}
            placeholder={t("BRANCH")}
          />
        </div> */}
        {showPaymentDetails && (
          <>
            <div>
              <h2 className="text-[#52FF86] mt-8 mx-4"> {t("BANK_DETAILS")}</h2>
              <div className="grid grid-cols-9 px-4 py-0 mx-auto lg:gap-x-16 ">
                <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0 ">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-event-name"
                  >
                    {t("BANK_NAME")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none  "
                    id="grid-Event-Name"
                    type="text"
                    name="bankName"
                    onChange={handleInputChange}
                    placeholder={t("BANK_NAME")}
                    value={formData?.bankName}
                  />
                </div>
                <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-short-video"
                  >
                    {t("BRANCH")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
                    id="grid-first-name"
                    type="text"
                    name="branchName"
                    value={formData?.branchName}
                    onChange={handleInputChange}
                    placeholder={t("BRANCH")}
                  />
                </div>
                <div className="col-span-8 py-1 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-1">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-short-video"
                  >
                    {t("ACCOUNT_NUMBER")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
                    id="grid-first-name"
                    type="text"
                    name="accountNumber"
                    value={formData?.accountNumber}
                    onChange={handleInputChange}
                    placeholder={t("ACCOUNT_NUMBER")}
                  />
                </div>
                <div className="col-span-8 py-1 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-1">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-short-video"
                  >
                    {t("ACCOUNT_HOLDER_NAME")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
                    id="grid-first-name"
                    type="text"
                    name="accountHolderName"
                    value={formData?.accountHolderName}
                    onChange={handleInputChange}
                    placeholder={t("ACCOUNT_HOLDER_NAME")}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[#52FF86] mt-8 mx-4">
                {t("PAYPAL_DETAILS")}
              </h2>
              <div className="grid grid-cols-9 px-4 py-0 mx-auto lg:gap-x-16 ">
                <div className="col-span-8 py-2 lg:col-span-7 md:col-span-5 md:mr-0 md:mb-0 ">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-event-name"
                  >
                    {t("PAYPA_ID")}
                  </label>
                  <input
                    className="uppercase appearance-none block w-full bg-gray-200 text-[#626262] border border-[#51ff85] bg-transparent  rounded py-4 px-4 mb-0 leading-tight focus:outline-none "
                    id="grid-Event-Name"
                    type="text"
                    name="paypalId"
                    value={formData?.paypalId}
                    onChange={handleInputChange}
                    placeholder={t("PAYPA_ID")}
                    min="0"
                  />
                </div>

                {/* <div className="flex col-span-12 gap-2 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-[#626262] captilize"
                    htmlFor="grid-short-video"
                  >
                    {t('HIDE_NAME')}
                  </label>
                  <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
                    <input type="checkbox" value="" className="sr-only peer" onChange={handleInputChange} name="hideParticipantName" />

                    <div className="w-11 h-5 border border-solid border-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
