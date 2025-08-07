import { useRef, useState } from "react";
import ScoringTable from "./LiveScoringTable";
import ScoringTableRow from "./ScoringTableRow";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../contexts/scoreContext";
import IndiviualPlayerTableRow from "./IndiviualPlayerTableRow";
type Tab = "REGULAR" | "HANDICAP";
const ScoringTableColumn = (props: {
  title: string;
  className: string;
  dir?: string;
}) => {
  return (
    <td className={` p-2 leading-[20px]  ${props.className}`} dir={props.dir}>
      {props.title}
    </td>
  );
};
const ScoringTabs = ({ singleEvent }: any) => {
  const [activeTab, setActiveTab] = useState<Tab>("REGULAR");
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };
  const { score } = useScoreContext();
  const groupedScores = score?.reduce((acc: any, obj: any) => {
    const { teamId, scorePerShot, totalScore, handiCapValue, netValue } = obj;
    const parsedScorePerShot = JSON.parse(scorePerShot);
    const slicedScorePerShot1 = parsedScorePerShot.slice(0, 9);
    const slicedScorePerShot2 = parsedScorePerShot.slice(9, 18);
    if (
      teamId !== undefined &&
      scorePerShot !== undefined &&
      totalScore !== undefined &&
      handiCapValue !== undefined &&
      netValue !== undefined
    ) {
      if (acc[teamId]) {
        acc[teamId].scorePerShot = acc[teamId].scorePerShot.map(
          (val: any, idx: any) => val + parsedScorePerShot[idx]
        );
        acc[teamId].totalScore += totalScore;
        acc[teamId].handiCapValue += handiCapValue;
        acc[teamId].netValue += netValue;
        // Update scorePerShot1 and scorePerShot2
        acc[teamId].scorePerShot1 = acc[teamId].scorePerShot.slice(0, 9);
        acc[teamId].scorePerShot2 = acc[teamId].scorePerShot.slice(9, 18);
      } else {
        acc[teamId] = {
          teamId,
          scorePerShot: parsedScorePerShot,
          scorePerShot1: slicedScorePerShot1,
          scorePerShot2: slicedScorePerShot2,
          totalScore,
          netValue,
          handiCapValue,
        };
      }
    }
    return acc;
  }, {});

  const mergedScores = Object.values(groupedScores || {});

  console.log(mergedScores, "Net Values")
  mergedScores.sort((a: any, b: any) => b?.totalScore - a.totalScore);

  mergedScores.forEach((team: any, index) => {
    switch (index + 1) {
      case 1:
        team.rank = "1st";
        break;
      case 2:
        team.rank = "2nd";
        break;
      case 3:
        team.rank = "3rd";
        break;
      default:
        team.rank = `${index + 1}th`;
    }
  });

  const shotsPar = singleEvent?.shotsPerHoles?.split(",").map(Number);
  let firstNine = shotsPar?.slice(0, 9);
  let afterNine = shotsPar?.slice(9);
  let sumFirstNine = firstNine?.reduce((acc: any, curr: any) => acc + curr, 0);
  let sumLastNine = firstNine?.reduce((acc: any, curr: any) => acc + curr, 0);
  let totalPar = shotsPar?.reduce((acc: any, curr: any) => acc + curr, 0);

  // console.log(shotsPar);
  return (
    <div className=" ">
      <div className=" mx-auto xl:mx-0 ">
      <div className="hidden xl:flex gap-4 mt-2 xl:mt-10">
          <img
            className="w-[50px] h-[60px]"
            alt=""
            src="/img/leaderboard.png"
          />
          <b className="relative left-[-24px] top-[35px] z-[-1] text-xl lg:text-2xl pl-3 text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            {t("TEAM_RESULT")}
          </b>
        </div>
        <div className="flex justify-end gap-2 ">
          <div className="flex justify-end gap-2">
            <button
              className={` ${activeTab === "REGULAR"
                  ? "bg-[#17b3a6] rounded-md p-4 cursor-pointer  border-none py-4 px-20 text-white text-[16px]"
                  : "bg-transparent border-solid border-[#17b3a6] border-2  rounded-md p-4 cursor-pointer  py-4 px-20 text-[#17b3a6] text-[16px] font-bold"
                } px-4 py-2 border rounded-full`}
              onClick={() => handleTabClick("REGULAR")}
            >
              {t("REGULAR")}
            </button>
            <button
              className={`${activeTab === "HANDICAP"
                  ? "bg-[#17b3a6] rounded-md p-4 cursor-pointer  border-none py-4  text-white text-[16px]"
                  : "bg-transparent border-solid border-[#17b3a6] border-2  rounded-md p-4 cursor-pointer  py-4 px-20 text-[#17b3a6] text-[16px] font-bold"
                } px-4 py-2   rounded-full`}
              onClick={() => handleTabClick("HANDICAP")}
            >
              {t("HDCP_INDEX")}
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll sm:overflow-x-auto ">
          {activeTab === "REGULAR" && (
            <div className="xl:mx-0 mt-10">
              <div className="">
                <div className="px-3 ">
                  <table className="w-full border-spacing-y-[1px] leaderboard_tbl">
                    <thead className="text-left text-white ">
                      <tr className=" h-[52px] text-[#00822d]">
                        <ScoringTableColumn
                          title={t("HOLE")}
                          className="rounded-s-[3px]  text-[18px] text-center ml-4 uppercase border-b-[2px] border-solid border-b-[#33333340]"
                        />

                        {Array.from({ length: 9 }, (_, index) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index + 1}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          />
                        ))}

                        <ScoringTableColumn
                          title="Out"
                          className="bg-black  text-[18px] font-medium text-center border-[1px] border-solid border-white"
                        />
                        {Array.from({ length: 9 }, (_, index) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index + 10}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          />
                        ))}
                        <ScoringTableColumn
                          title="In"
                          className="bg-black text-[18px] font-medium text-center min-w-[24px] border-[1px] border-solid border-white"
                        />
                        <ScoringTableColumn
                          title={t("TOTAL")}
                          className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />

                        <ScoringTableColumn
                          title={t('Net Value')}
                          className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                          dir='rtl'
                        />
                        <ScoringTableColumn
                          title={t("RESULT")}
                          className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          dir="rtl"
                        />
                      </tr>
                      <tr className=" h-[52px] text-[#00822d]">
                        <ScoringTableColumn
                          title={t("PAR")}
                          className="rounded-s-[3px]  text-[18px] text-center ml-4 uppercase border-b-[2px] border-solid border-b-[#33333340]"
                        />

                        {firstNine?.map((index: any) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          />
                        ))}
                        <ScoringTableColumn
                          title={sumFirstNine}
                          className="bg-black  text-white text-[18px] font-medium text-center border-[1px] border-solid border-white"
                        />
                        {afterNine?.map((index: any) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          />
                        ))}
                        <ScoringTableColumn
                          title={sumLastNine}
                          className="bg-black  text-white text-[18px] font-medium text-center border-[1px] border-solid border-white"
                        />
                        <ScoringTableColumn
                          title={totalPar}
                          className=" text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />
                        <ScoringTableColumn
                          title={t("Net Value")}
                          className=" text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />
                        <ScoringTableColumn
                          title={t("RESULT")}
                          className=" text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />

                      </tr>
                    </thead>

                    <tbody>

                      {mergedScores?.map((item: any) => {
                        return (
                          item?.nearPinContest !== "" && (
                            <ScoringTableRow
                              teamImageUrl="/img/ellipse-23114@2x.png"
                              teamName={"team " + item?.teamId}
                              teamId={item?.teamId}
                              background="#red"
                              teamBG="#D3D3D3"
                              score1={item.scorePerShot1}
                              score2={item.scorePerShot2}
                              total={item.totalScore}
                              rank={item.rank}
                              netValue={item.netValue}
                            />
                          )
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "HANDICAP" && (
            <div>
              <div className='mx-0 mt-10 '>
                <div className='px-3 '>
                <h4 className="flex items-center gap-2">{t("SCORING_TYPE")} : <span className="text-[#17b3a6]">{singleEvent?.scoringType}</span> </h4>
                  <table className='w-full leaderboard_tbl'>
                    <thead className='text-left text-white '>
                      <tr className='h-[52px] text-[#00822d]'>
                        <ScoringTableColumn
                          title={t('HOLE')}
                          className='rounded-s-[3px]  text-[18px] text-center ml-4 uppercase border-b-[2px] border-solid border-b-[#33333340]'
                        />

                        {Array.from({ length: 9 }, (_, index) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index + 1}`}
                            className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                          />
                        ))}

                        <ScoringTableColumn
                          title='Out'
                          className='bg-[#164f2a]  text-[18px] font-medium text-center text-white'
                        />
                        {Array.from({ length: 9 }, (_, index) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index + 10}`}
                            className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                          />
                        ))}
                        <ScoringTableColumn
                          title='In'
                          className='bg-[#164f2a] text-white text-[18px] font-medium text-center min-w-[24px]'
                        />
                        <ScoringTableColumn
                          title={t('TOTAL')}
                          className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                        />


                        <ScoringTableColumn
                          title={t('Net Value')}
                          className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                        />
                        <ScoringTableColumn
                          title={t('HCP')}
                          className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                        />
                        <ScoringTableColumn
                          title={t('RESULT')}
                          className='text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]'
                          dir='rtl'
                        />
                      </tr>
                      <tr className="h-[52px] text-[#00822d]">
                        <ScoringTableColumn
                          title={t("PAR")}
                          className="rounded-s-[3px]  text-[18px] text-center ml-4 uppercase border-b-[2px] border-solid border-b-[#33333340]"
                        />
                        {firstNine?.map((index: any) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                          />
                        ))}
                        <ScoringTableColumn
                          title={sumFirstNine}
                          className="bg-[#164f2a]  text-white text-[18px] font-medium text-center"
                        />
                        {afterNine?.map((index: any) => (
                          <ScoringTableColumn
                            key={index}
                            title={`${index}`}
                            className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340] "
                          />
                        ))}
                        <ScoringTableColumn
                          title={sumLastNine}
                          className="bg-[#164f2a]  text-white text-[18px] font-medium text-center"
                        />
                        <ScoringTableColumn
                          title={totalPar}
                          className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />

                        <ScoringTableColumn
                          title={t("Net Value")}
                          className="text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />
                        <ScoringTableColumn
                          title={t("HCP Value")}
                          className=" text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />
                        <ScoringTableColumn
                          title={t("RESULT")}
                          className=" text-[18px]  uppercase text-center border-b-[2px] border-solid border-b-[#33333340]"
                        />
                      </tr>
                    </thead>
                    <tbody>

                      {mergedScores?.map((item: any) => {
                        return (
                          item?.nearPinContest !== "" && (
                            <ScoringTableRow
                              teamImageUrl="/img/ellipse-23114@2x.png"
                              teamName={"team " + item?.teamId}
                              background="#CDD5FF"
                              teamBG="#D3D3D3"
                              score1={item.scorePerShot1}
                              score2={item.scorePerShot2}
                              total={item.totalScore}
                              handicape={item.handiCapValue}
                              rank={item.rank}
                              netValue={item.netValue}
                              tab={"hcp"}
                            />
                          )
                        );
                      })}
                    </tbody>


                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoringTabs;
