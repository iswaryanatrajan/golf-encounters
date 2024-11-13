import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";

export const UploaderInput = ({
  handleUploadChange,
  ref,
  handleInputClick,
  isOpen,
  videoUrl,
  videoUrlValue,
  handleVideoUrlChange
}: any) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2] ml-2 cursor-pointer">
      <input
        className="w-[106px]"
        id="portfolioVideo"
        name="portfolioVideo"
        ref={ref}
        type="file"
        multiple
        onChange={handleUploadChange}
        accept="video/*"
      />
      <label
        htmlFor="portfolioVideo"
        className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
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
      {videoUrl && (
        <video className="mt-2" src={videoUrl} controls width="100px"></video>
      )}
      {
        isOpen ? (
          <>
            <ArrowUpIcon className="h-[16px] mt-2 p-[2px] border-2 border-solid rounded-full" onClick={handleInputClick} data-tooltip-id="upload-url-tooltip" />
            <input
              type="text"
              value={videoUrlValue}
              onChange={handleVideoUrlChange}
              placeholder="Enter video URL"
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </>
        ) : (
          <>
            <ArrowDownIcon
              className="h-[16px] mt-2 p-[2px] border-2 border-solid rounded-full"
              onClick={handleInputClick}
              data-tooltip-id="upload-url-tooltip" 
            />
            <Tooltip id="upload-url-tooltip" content="Add Video URL" />
          </>
        )
      }
    </div>
  );
};
