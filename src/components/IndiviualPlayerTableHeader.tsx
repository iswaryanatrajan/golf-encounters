import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
const IndiviualPlayerTableHeader: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  
  return (
    <div className="mt-9 flex items-center gap-3 box-border p-3 rounded-10xs text-white bg-lightseagreen-200 shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)]  h-20 min-w-full xl:min-w-[120px]">
      <div className="basis-1/2 ">
        <div className="flex gap-2 text-sm font-body-b2">
          <div className="leading-[20px]  text-springgreen ">USER</div>
          <img className="" alt="" src="/img/vector1.svg" />
        </div>
      </div>
      <div className="flex gap-3 items-center basis-1/2 ">
        
        <div>{t("PLAYERS")}</div>
      </div>
      <div className="basis-1/2 min-w-[111px] uppercase">{t("TEAM_NAME")}</div>
      <div className="text-center uppercase basis-1/3">{t("SCORE")}</div>
    </div>
  );
}; 
export default IndiviualPlayerTableHeader;
