import React, { ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { GroupBase, OptionsOrGroups } from "react-select";
interface InputWithIconProps {
  icon: ReactNode;
  label: string;
  pname: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  value?: string;
  ptype?: string;
  onChange?: any;
  variant?: string;
  handleImageChange?: any;
  handleLocationChange?: any;
  handleLevelChange?: any;
}

interface OptionType {
  label: string;
  value: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  label,
  pname,
  ptype,
  placeholder,
  colSpanSm = 4,
  colSpanMd = 5,
  colSpanLg = 4,
  iconWidth = "24px",
  iconHeight = "24px",
  value,
  onChange,
  variant,
  handleImageChange,
  handleLocationChange,
  handleLevelChange,
}) => {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const JapanCities: any[] = [
    {
      label: t('HOKKAIDO_TOHOKU'),
      options: [
        { value: "北海道 (Hokkaido)", label: t('北海道 (Hokkaido)') },
        { value: "青森県 (Aomori Prefecture)", label: t('青森県 (Aomori Prefecture)') },
        { value: "岩手県 (Iwate Prefecture)", label: t('岩手県 (Iwate Prefecture)') },
        { value: "宮城県 (Miyagi Prefecture)", label: t('宮城県 (Miyagi Prefecture)') },
        { value: "秋田県 (Akita)", label: t('秋田県 (Akita)') },
        { value: "山形県 (Yamagata Prefecture)", label: t('山形県 (Yamagata Prefecture)') },
        { value: "福島県 (Fukushima Prefecture)", label: t('福島県 (Fukushima Prefecture)') },
       
      ],
    },
    {
      label: t('KANTO'),
      options: [
        { value: "茨城県 (Ibaraki Prefecture)", label: t('茨城県 (Ibaraki Prefecture)') },
        { value: "栃木県 (Tochigi Prefecture)", label: t('栃木県 (Tochigi Prefecture)') },
        { value: "群馬県 (Gunma Prefecture)", label: t('群馬県 (Gunma Prefecture)') },
        { value: "埼玉県 (Saitama)", label: t('埼玉県 (Saitama)') },
        { value: "千葉県 (Chiba prefecture)", label: t('千葉県 (Chiba prefecture)') },
        { value: "東京都 (Tokyo)", label: t('東京都 (Tokyo)') },
        { value: "神奈川県 (Kanagawa Prefecture)", label: t('神奈川県 (Kanagawa Prefecture)') },
      ],
    },
    {
      label: t('中部 (Chubu)'),
      options: [
        { value: "神奈川県 (Niigata Prefecture)", label: t('神奈川県 (Niigata Prefecture)') },
        { value: "富山県 (Toyama Prefecture)", label: t('富山県 (Toyama Prefecture)') },
        { value: "富山県 (Ishikawa Prefecture)", label: t('富山県 (Ishikawa Prefecture)') },
        { value: "福井県 (Fukui prefecture)", label: t('福井県 (Fukui prefecture)') },
        { value: "山梨県 (Yamanashi Prefecture)", label: t('山梨県 (Yamanashi Prefecture)') },
        { value: "長野県 (Nagano Prefecture)", label: t('長野県 (Nagano Prefecture)') },
      ],
    },
    {
      label: t('TOKAI'),
      options: [
        { value: "静岡 (Shizuoka Prefecture)", label: t('静岡 (Shizuoka Prefecture)') },
        { value: "愛知県 (Aichi prefecture)", label: t('愛知県 (Aichi prefecture)') },
        { value: "三重県 (Mie Prefecture)", label: t('三重県 (Mie Prefecture)') },
        { value: "岐阜県 (Gifu Prefecture)", label: t('岐阜県 (Gifu Prefecture)') },
      ],
    },
    {
      label: t('近畿 (Kinki)'),
      options: [
        { value: "滋賀県 (Shiga Prefecture)", label: t('滋賀県 (Shiga Prefecture)') },
        { value: "京都府 (Kyoto)", label: t('京都府 (Kyoto)') },
        { value: "大阪府 (Osaka prefecture)", label: t('大阪府 (Osaka prefecture)') },
        { value: "兵庫県 (Hyogo prefecture)", label: t('兵庫県 (Hyogo prefecture)') },
        { value: "奈良県 (Nara Prefecture)", label: t('奈良県 (Nara Prefecture)') },
        { value: "和歌山県 (Wakayama Prefecture)", label: t('和歌山県 (Wakayama Prefecture)') },

      ],
    },
    {
      label: t('SHIKOKU'),
      options: [
        { value: "鳥取県 (Tottori prefecture)", label: t('鳥取県 (Tottori prefecture)') },
        { value: "島根県 (Shimane Prefecture)", label: t('島根県 (Shimane Prefecture)') },
        { value: "岡山県 (Okayama Prefecture)", label: t('岡山県 (Okayama Prefecture)') },
        { value: "広島県 (Hiroshima)", label: t('広島県 (Hiroshima)') },
        { value: "山口県 (Yamaguchi Prefecture)", label: t('山口県 (Yamaguchi Prefecture)') },
        { value: "徳島県 (Tokushima)", label: t('徳島県 (Tokushima)') },
        { value: "香川県 (Kagawa Prefecture)", label: t('香川県 (Kagawa Prefecture)') },
        { value: "愛媛県 (Ehime Prefecture)", label: t('愛媛県 (Ehime Prefecture)') },
        { value: "高知県 (Kochi Prefecture)", label: t('高知県 (Kochi Prefecture)') },
      ],
    },
    {
      label: t('九州・沖縄 (Kyushu-Okinawa)'),
      options: [
        { value: "福岡県 (Fukuoka Prefecture)", label: t('福岡県 (Fukuoka Prefecture)') },
        { value: "佐賀県 (Saga Prefecture)", label: t('佐賀県 (Saga Prefecture)') },
        { value: "長崎県 (Nagasaki Prefecture)", label: t('長崎県 (Nagasaki Prefecture)') },
        { value: "熊本県 (Kumamoto Prefecture)", label: t('熊本県 (Kumamoto Prefecture)') },
        { value: "大分県 (Oita Prefecture)", label: t('大分県 (Oita Prefecture)') },
        { value: "宮崎県 (Miyazaki prefecture)", label: t('宮崎県 (Miyazaki prefecture)') },
        { value: "鹿児島県 (Kagoshima prefecture)", label: t('鹿児島県 (Kagoshima prefecture)') },
        { value: "沖縄県 (Okinawa Prefecture)", label: t('沖縄県 (Okinawa Prefecture)') },
      ],
    },
  ];
  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    
  };
  const levelOptions: readonly any[] = [
    { value: t('ENTRY'), label: t('ENTRY') },
    { value: t('Beginner'), label: t('Beginner')},
    { value: t('INTERMEDIATE'), label: t('INTERMEDIATE') },
    { value: t('ADVANCED'), label: t('ADVANCED') },
    { value: t('AMBASSADOR'), label: t('AMBASSADOR') },
  ];
  
  if (variant == "levelDropdown") {
    return (
      
      <Select
        name="level"
        required
        placeholder={value}
        onChange={handleLevelChange}
        options={levelOptions}
        className="w-full text-base border text-black border-gray-300 rounded  hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  }
  return (
    <div>
      <div
        className={`col-span-12 mx-0 lg:mx-4 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-0 xl:py-2 md:mr-0 md:mb-0`}
      >
        <label
          className="mb-2 text-xs font-bold tracking-wide text-gray-700 capitalize flex items-center gap-2"
          htmlFor={pname}
        >
          <span
            className="p-1 rounded-full  inline-block text-white  my-2"
            style={{ width: iconWidth, height: iconHeight }}
          >
            {icon}
          </span>
          {label}
        </label>
        {variant == "video" ? (
          <>
            <div className="flex flex-wrap gap-4 mt-2  ">
              {selectedFiles.map((file: any, index: any)  => (
                <div key={index} className="relative ">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file-${index}`}
                    className="w-16 h-16 object-cover rounded-lg "
                  />
                  <button
                    className="absolute top-0 right-[-10px] h-4 w-4 bg-[#61cbc2] rounded-full text-white text-[14px] flex justify-center items-center cursor-pointer"
                    onClick={() => removeSelectedFile(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <input
              id="file-upload"
              name="mediaFiles"
              ref={fileInputRef}
              className="hidden "
              type="file"
              multiple
              onChange={handleImageChange}
              accept="video/*"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center p-4  border-2 border-dashed rounded-lg border-[#61cbc2] cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </label>
          </>
        ) : variant === "dropdown" ? (
          <Select
            name="place"
            placeholder={value}
            required
            options={
              JapanCities as OptionsOrGroups<OptionType, GroupBase<OptionType>>
            }
            onChange={handleLocationChange}
            className="w-full text-base border text-black border-gray-300 rounded shadow hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <input
            className="appearance-none block w-full bg-white text-gray-700 border border-[#d9d9d9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            id={pname}
            type={ptype}
            name={pname}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default InputWithIcon;

export interface TextAreaProp {
  label: string;
  pname: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  value?: string;
}

export const CustomTextArea: React.FC<TextAreaProp> = ({
  label,
  pname,
  placeholder,
  colSpanSm = 8,
  colSpanMd = 5,
  colSpanLg = 4,
  value,
}) => {
  return (
    <div>
      <div
        className={`col-span-12 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-2 md:mr-0 md:mb-0`}
      >
        <label
          className="text-xs font-bold tracking-wide text-gray-700 capitalize"
          htmlFor={pname}
        >
          {label}
        </label>
        <textarea
          className=" appearance-none w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
          id={pname}
          name={pname}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};

export interface FileInputProps {
  label: string;
  pname: string;
}

export const FileInputComponents: React.FC<FileInputProps> = ({
  label,
  pname,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="postMedia"
      >
        {label}
      </label>
      <input type="file" name={pname} id={pname} />
    </div>
  );
};
