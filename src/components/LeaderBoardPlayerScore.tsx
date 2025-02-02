import { FunctionComponent } from "react";
import IndiviualPlayerTableHeader from "./IndiviualPlayerTableHeader";
import IndiviualPlayerTableRow from "./IndiviualPlayerTableRow";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../contexts/scoreContext";
import { singleEventContextStore } from "../contexts/eventContext";

const LeaderBoardIndiviualPlayerScore: FunctionComponent = () => {
  const { t } = useTranslation();
  const { singleEvent } = singleEventContextStore();
  const { score } = useScoreContext();

  const shouldShowPlayerScore = !(singleEvent?.driverContest === 0 && singleEvent?.nearPinContest === 0);

  return (
    shouldShowPlayerScore && (
      <div className="my-5 mx-6 xl:mx-0 xl:my-[100px] relative">
        <div className="hidden xl:flex gap-2 items-center">
          <img src="/img/golfplyr.png" alt="" width="40px" />
          <b className="text-xl lg:text-2xl text-darkslateblue-300 leading-[18px] ">
            {t("INDIVIUAL_SCORE")}
          </b>
        </div>

        {/* Flex container for horizontal alignment */}
        <div className="lg:mt-20 flex flex-col xl:flex-row gap-8">
          {/* Driver Contest Section */}
          <div className="flex-1">
            <div className="flex items-center justify-center h-[80px] bg-[#0AA3BC]">
              <div className="font-medium text-white text-2xl">
                {t("DRIVE_CONTEXT")}{" "}
                <span className="bg-white text-black rounded-full h-4 w-4 p-2">
                  {singleEvent?.driverContest ?? "0"}
                </span>
              </div>
            </div>
            <IndiviualPlayerTableHeader />
            {singleEvent?.driverContest !== 0 ? (
              score?.length ? (
                score.map((item: any) => (
                  item?.driverContest !== "" && (
                    <IndiviualPlayerTableRow item={item} type="driverContest" />
                  )
                ))
              ) : (
                <p className="text-center mt-4">{t("NO_PLAYER_DATA")}</p>
              )
            ) : (
              <p className="text-center mt-[100px]">{t("NOT_SELECTED")}</p>
            )}
          </div>

          {/* Near Pin Contest Section */}
          <div className="flex-1">
            <div className="flex items-center justify-center h-[80px] bg-[#0AA3BC]">
              <div className="font-medium text-white text-2xl">
                {t("NEAR_CONTEXT")}{" "}
                <span className="bg-white text-black rounded-full h-4 w-4 p-2">
                  {singleEvent?.nearPinContest ?? "0"}
                </span>
              </div>
            </div>
            <IndiviualPlayerTableHeader />
            {singleEvent?.nearPinContest !== 0 ? (
              score?.length ? (
                score.map((item: any) => (
                  item?.nearPinContest !== "" && (
                    <IndiviualPlayerTableRow item={item} />
                  )
                ))
              ) : (
                <p className="text-center mt-4">{t("NO_PLAYER_DATA")}</p>
              )
            ) : (
              <p className="text-center mt-4">{t("NOT_SELECTED")}</p>
            )}
          </div>
        </div>

       
        <div className="absolute top-[148.4px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[170.7px] h-[229.6px] hidden lg:block">
          <img
            className="absolute top-[78.4px] left-0 w-[170.7px] h-[151.2px]"
            alt="Ellipse"
            src="/img/ellipse-2305.svg"
          />
          <img
            className="absolute top-0 left-[7.7px] w-[109.5px] h-[197.5px] object-cover"
            alt="Leaderboard"
            src="/img/leaderboard.png"
          />
        </div>
      </div>
    )
  );
};

export default LeaderBoardIndiviualPlayerScore;
