import { FunctionComponent, useEffect, useRef, useState } from "react";
import ChampionShipName from "../components/ChampionShipName";
import Slider from "../components/Slider";
import LeaderBoardSection from "../components/LeaderBoardSection";
import IndiviualPlayerScore from "../components/LeaderBoardPlayerScore";
import TeamPerformance from "../components/TeamPerformance";
import ScoringTable from "../components/LiveScoringTable";
import { useTranslation } from "react-i18next";
import {
  ScoreContextProvider,
  useScoreContext,
} from "../contexts/scoreContext";
import LeaderBoardTables from "../components/leaderBoard/leaderBoard";
import { singleEventContextStore } from "../contexts/eventContext";
import { ScoreSlider } from "../components/sliders/ScoreSlider";
import AllMembers from "../components/AllMembers";
import { FlexitySlider } from "../components/sliders/FlickitySlider";

import CommentModel from "../components/CommentModel";
import { AboutEvent } from "../components/event/AboutEventSingle";
import { singleTeamsContextStore } from "../contexts/teamContext";
import ScoringTabs from "../components/ScoringTabs";
import { FinalEventGallery } from "../components/FinalEventGallery";
import { FinalSlider } from "../components/sliders/FinalEventSlider";
import EventDetails from "../components/event/EventDetails";
import CeremonyModal from "../components/CeremonyModal";
import EventCeremonyDetails from "../components/EventCeremonyDetails";
import IndiviualPlayerTableRow from "../components/IndiviualPlayerTableRow";
import LeaderBoardIndiviualPlayerScore from "../components/LeaderBoardPlayerScore";

const ScoreBoard: FunctionComponent = () => {
  const { t } = useTranslation();

  const { isCreated, singleEvent } = singleEventContextStore();
  const { totalJoinedMembers } = singleTeamsContextStore();
  const { score, scoreLoading } = useScoreContext();
  const positions = ["1st", "2nd", "3rd"];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const shouldShowPlayerScore = !(singleEvent?.driverContest === 0 || singleEvent?.nearPinContest === 0);
  const sortedScore = score?.sort((a: any, b: any) => b.totalScore - a.totalScore);
  const [ceremonyModel, setCeremonyModel] = useState(false)
  const topThreeScores = sortedScore?.slice(0, 3);
  const topThreeScoresWithPosition = topThreeScores?.map((score: any, index: any) => ({
    ...score,
    position: positions[index]
  }));

  console.log(topThreeScoresWithPosition, " postion");
  const onClose = (value: any) => {
    setCeremonyModel(value)
  }
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <div className="max-w-7xl  mx-auto">

        <EventDetails />

      {/**  {singleEvent?.scoringType !== "Normal" && (
          <div className="grid  w-full p-0  mx-auto mt-[110px] mb-3">
            {scoreLoading ? (
              <div className="flex justify-center items-center ">
                <div>
                  <img
                    className="w-10 h-10 animate__animated animate__bounce animate__infinite"
                    src="/img/golfball.jpg"
                    alt=""
                  />
                  <p>loading...</p>
                </div>
              </div>
            ) : (
              topThreeScores.length > 2 || screenWidth < 600 ?
                <FlexitySlider>
                  {topThreeScoresWithPosition?.map((item: any) => {
                    return <ScoreSlider item={item} />;
                  })}
                </FlexitySlider> : <div className="flex self-center w-full p-16 py-12 justify-around xl:w-[1200px] mx-auto">{topThreeScoresWithPosition?.map((item: any) => {
                  return <ScoreSlider item={item} />;
                })}
                </div>
            )}
          </div>
        )}*/}
        <div
          className={
            singleEvent?.scoringType === "Normal"
              ? "mt-[220px]"
              : "mt-[200px] xl:max-w-7xl mx-auto "
          }
        >
          <FinalEventGallery >
            {singleEvent.imageUrl?.map((item: any) => {
              return <FinalSlider item={item} type="top" />;
            })}
            {singleEvent.imageUrl?.map((item: any) => {
              return <FinalSlider item={item} />;
            })}

          </FinalEventGallery>


        </div>
        {isCreated &&
          <div className="mr-20 flex justify-end">
            <button onClick={() => {
              onClose(true)

            }} className="cursor-pointer p-2 bg-[#17b3a6] rounded-md text-white">{t("ADD_EVENT_DETEIALS")}</button>
          </div>
        }
        {
          ceremonyModel && <CeremonyModal onClose={onClose} eventId={singleEvent.id} />
        }
        <EventCeremonyDetails />


        {(singleEvent?.scoringType !== "Regular" && singleEvent?.scoringType !== "Normal" && (score?.length > 0)) && (
          <>
            <div className="max-w-6xl mx-auto">
              <LeaderBoardTables />
              <LeaderBoardIndiviualPlayerScore />

              <ScoringTabs singleEvent={singleEvent} />
            </div>
          </>
        )}


        {singleEvent?.id && (
          <table className="w-full max-w-5xl xl:max-w-6xl mx-auto my-6">
            <CommentModel eventIsd={singleEvent?.id} closeModal={() => { }} />
          </table>
        )}
         <div className="w-full  max-w-5xl xl:max-w-6xl lg:mx-auto">
         <AllMembers/>
         </div>
       
        <div className="w-full  max-w-5xl xl:max-w-6xl lg:mx-auto mb-7">
          <AboutEvent totalJoinedMembers={totalJoinedMembers} />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
