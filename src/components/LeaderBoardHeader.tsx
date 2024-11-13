import { FunctionComponent } from "react";
import StateDefault from "./StateDefault";
import { useTranslation } from "react-i18next";

const LeaderBoardHeader: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <>
      <div className="flex gap-[8px]">
        <div className="flex items-center justify-center rounded-md bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] box-border w-[55px] h-[62px] border-[1px] border-solid border-silver">
          <img className="h-[33.87%] w-[32.73]" alt="" src="/img/icon.svg" />
        </div>
        <StateDefault
          search="Search player score here..."
          stateDefaultBorder="1px solid #b5b5b5"
          stateDefaultHeight="62px"
          searchFontSize="19px"
        />
      </div>

      <div className=" mt-12 tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl ">
        {t("LEADER_BOARD")}
      </div>
      <div className="mt-10">
        <div className=" rounded-md bg-darkslategray-400 h-[57px] text-lg text-white font-poppins text-center">
          <div className="flex items-center h-full gap-4 px-3 leading-[18px]">
            <div className="flex gap-2 text-sm basis-1/6 font-body-b2">
              <div className="">POS</div>
              <img className="" alt="" src="/img/vector1.svg" />
            </div>
            <div className="basis-4">
              <img className="" alt="" src="/img/group-1000008891.svg" />
            </div>
            <div className="flex gap-2 basis-1/2">
              <div className="">{t("PLAYERS")}</div>
              <img className="h-[18px]" alt="" src="/img/players_arrow.svg" />
            </div>
            <div className="uppercase basis-1/3">{t("TEAM_NAME")}</div>
            <div className="uppercase basis-1/5">{t("SCORE")}</div>
            <div className="uppercase basis-1/5">{t("DRIVE_POS")}</div>
            <div className="uppercase basis-1/5">{t("NEAR_PIN")}</div>
            <div className="uppercase basis-1/5">{t("TOTAL_PAR")}</div>
            <div className="uppercase basis-1/2">{t("STATS")}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoardHeader;
