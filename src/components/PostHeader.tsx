import React from 'react';
import { postContext } from '../contexts/postsContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
interface FilterCategory {}

const PostHeader: React.FC<FilterCategory> = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { handleCategory } = postContext();

  return (
    <div className="grid grid-cols-1   md:grid-cols-12 gap-8 items-center justify-between ">

      <div className="flex justify-start  relative text-center mt-2 rounded-md shadow-sm mx-8 md:mx-0 md:col-span-10">
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={t("SEARCH")}
        />
        <div className="pointer-events-none absolute inset-y-0 right-[10px] flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      <div className="mx-4 md:mx-0 relative  flex items-center md:col-span-2">
        <button className="font-semibold text-start bg-transparent text-md w-[100px] md:w-[150px]">{t("FILTER")}</button>
        <select
          className="block appearance-none w-full bg-white border-solid border-[#51ff85] hover:border-gray-500 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => handleCategory(e.target.value)}
        >
           <option value="Public">{t("PUBLIC")}</option>
          <option value="Private">{t("PRIVATE")}</option>
          <option value="MyPost">{t("MY_POST")}</option>
          <option value="All">{t("ALL")}</option>
        </select>
      </div>
    </div>
  );
};

export default PostHeader;
