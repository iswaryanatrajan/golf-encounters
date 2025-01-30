import { FunnelIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";

const SearchMainEventFilter: FunctionComponent = () => {
  const { t } = useTranslation();
  const { handleSearch, handleInitialSearch } = eventContextStore();
  // const [input, setInput] = useState<string>("");
  // const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // useEffect(() => {
  //   const searchTerms = selectedItems.map(item => item.eventName + " " + item.location).concat(input).filter(Boolean);
  //   const searchQuery = searchTerms.join(" ").trim();
  //   if (searchQuery.length === 0) {
  //     handleInitialSearch("");  // Fetch all events if no filter is applied
  //   } else {
  //     handleSearch(searchQuery);
  //   }
  // }, [input, selectedItems, handleSearch, handleInitialSearch]);

  // const handleChange = (e: any) => {
  //   const inputValue = e.target.value;
  //   setInput(inputValue);
  //   if (inputValue === "") {
  //     // Explicitly call handleInitialSearch when input is cleared
  //     handleSearch(e.target.value);
  //   }
  // };

  // const handleItemClick = (item: any) => {
  //   setSelectedItems([...selectedItems, item]);
  //   setInput("");
  // };

  // const handleRemoveItem = (index: number) => {
  //   const newItems = selectedItems.filter((_, i) => i !== index);
  //   setSelectedItems(newItems);
  //   if (newItems.length === 0 && !input) {
  //     // Call handleInitialSearch if no filters are left
  //     handleInitialSearch("");
  //   }
  // };

  return (
    <form className="flex xl:w-full py-2 gap-2 bg-white rounded-lg">
      <div className="flex-grow mr-2">
        {/* {selectedItems.map((item, index) => (
          <div key={index} className="bg-blue-100 rounded-full p-2 flex items-center">
            <span className="text-sm font-medium">{`${item.eventName} (${item.location})`}</span>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))} */}
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm p-2"
          placeholder={t('SEARCH_EVENTS')}
        />
      </div>
      <button
        type="button"
        // onClick={() => handleSearch(input)}
        className="flex items-center border-blue-500 bg-white hover:border-2 focus:border-2 border-solid border  rounded-md ml-3 px-4 py-2"
      >
        <FunnelIcon className="h-5 w-5 pr-1" aria-hidden="true" />
        {t("Filter")}
      </button>
    </form>
  );
};

export default SearchMainEventFilter;
