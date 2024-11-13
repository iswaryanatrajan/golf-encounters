

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Select from "react-select";

interface OptionType {
  label: string;
  value: string;
}

type GroupedOptionType = GroupBase<OptionType>;

interface LocationFilterProps {
  handleLocationChange: any
  reset: boolean;
  setReset: any;
}



export const LocationFilter: React.FC<LocationFilterProps> = ({ handleLocationChange, reset,setReset }) => {
  const { t, i18n } = useTranslation();

    const JapanCities: GroupedOptionType[] = [
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

      const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

      const handleChange = (selectedOption: any) => {
        setSelectedLocation(selectedOption);
        handleLocationChange(selectedOption?.value);
      };
    
      useEffect(() => {
          setSelectedLocation(selectedLocation);
          if(reset){
            setSelectedLocation('');
            handleLocationChange('');
            setReset(false);
          }
      }, [reset, selectedLocation]);

    return (
        <div className="relative text-start w-full col-span-8 mt-8 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-2">
              <label
                className="block mb-2 text-lg tracking-wide text-[#626262] captilize"
                htmlFor="place"
              >
                {t("PLACE")}
              </label>
              <Select
                name="place"
                options={
                  JapanCities as OptionsOrGroups<
                    OptionType,
                    GroupBase<OptionType>
                  >
                }
                value={selectedLocation || ""}
                onChange={handleChange}
                className="w-full text-base border border-gray-300 rounded shadow hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              
            </div>
    )
}
