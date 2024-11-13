import React, { useState, useRef } from "react";

interface ProfileAvatarProps {
  icon?: any;
  label?: string;
  pname?: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  defaultImageUrl?: string;
  onChangeImage?: any; 
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
icon,
  label,
  placeholder,
  colSpanSm = 8,
  colSpanMd = 5,
  colSpanLg = 4,
  iconWidth = "24px",
  iconHeight = "24px",
  pname,
  defaultImageUrl,
  onChangeImage,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        if (onChangeImage) {
          onChangeImage(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div
        onClick={handleImageClick}
        style={{ cursor: "pointer", width: "150px", height: "150px" }}
        className="rounded-full bg-gray-200 flex items-center justify-center"
      >
        {!imageUrl && !defaultImageUrl ? (
          <svg
            className="w-6 h-6 text-gray-600 rounded-full" // This sets the icon size and color
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        ) : (
          <img
            className="rounded-full w-40 h-40"
            src={imageUrl || defaultImageUrl}
            alt={pname}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
