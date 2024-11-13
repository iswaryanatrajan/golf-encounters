import { useTranslation } from "react-i18next";

interface IProps {
  place: any;
}

export const Clip = ({ place }: IProps) => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  
  return (
    <div className="animate__animated animate__lightSpeedInRight">
      <span className="inline-flex items-center gap-x-1 rounded-md bg-[#17B3A6] px-2 py-1 text-base font-normal text-white ring-1 ring-inset ring-gray-500/10">
        {place}
      </span>
    </div>
  );
};
