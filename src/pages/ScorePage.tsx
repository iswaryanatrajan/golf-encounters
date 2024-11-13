import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "../components/Player";
import { singleTeamsContextStore } from "../contexts/teamContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useScoreContext } from "../contexts/scoreContext";

const ScorePage = () => {
  const { isCreated, singleEvent } = singleEventContextStore();
  const hole = singleEvent ? singleEvent.selectedHoles : [];
  const newArrayHole = hole?.split(",").map(Number);

  const { score } = useScoreContext();
  const p = singleEvent ? singleEvent.shotsPerHoles : [];
  const par = p?.split(",").map(Number);

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const holes = Array.from({ length: 18 }, (_, index: number) => index + 1);

  const totalPar = par?.reduce((acc: number, curr: number) => acc + curr, 0);

  const uId = localStorage.getItem("id");
  const isCreator = uId == singleEvent?.creatorId;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center gap-10">
        <div className="relative w-[90.5px] h-[147.5px]">
          <img
            className="absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]"
            alt=""
            src="/img/ellipse-2303.svg"
          />
          <img
            className="absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover"
            alt=""
            src="/img/rectangle-1249@2x.png"
          />
        </div>
        <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl">
          {t("ADD_SCORE")}
        </h2>
      </div>
      <p>
        Scoring Type:{" "}
        <span className="font-bold">{singleEvent?.scoringType} PERIA</span>{" "}
      </p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
          <tr>
            <th className="px-2 py-3 text-center">HOLE</th>
            {holes.map((hole) => {
              let bgColor = "";
              if (isCreator) {
                const match = newArrayHole?.includes(hole);
                bgColor = match ? "bg-red" : "";
              }

              return (
                <th className={`text-center px-2 py-3 ${bgColor}`} key={hole}>
                  {hole}
                </th>
              );
            })}

            <th className="px-2 py-3 text-center">Total</th>
            {isCreator && (
              <>
                <th className="px-2 py-3 text-center">HDCP</th>
                <th className="px-2 py-3 text-center">Net</th>
              </>
            )}
          </tr>
          <tr>
            <th className="px-2 py-3">PAR</th>

            {par?.map((parValue: any, index: any) => (
              <th key={index} className="px-2 py-3 text-center">
                {parValue}
              </th>
            ))}
            <th className="px-2 py-3 text-center">{totalPar}</th>
            {isCreator && (
              <>
                <th className="px-2 py-3 text-center">{totalPar}</th>
                <th className="px-2 py-3 text-center">{totalPar}</th>
              </>
            )}
          </tr>
          {score?.map((member: any, memberIndex: number) => {
            return (
              <tr key={memberIndex} className="py-4 pl-4 whitespace-nowrap">
                <Player
                  isCreator={isCreated}
                  key={memberIndex}
                  showNumber={false}
                  enableHover={true}
                  onDelete={() => {}}
                  name={member.userId}
                  imageUrl={member.imageUrl}
                />
                {JSON.parse(member.scorePerShot).map(
                  (score: any, index: any) => (
                    <td key={index}>{score}</td>
                  )
                )}
                <td className="px-2 py-3 text-center">{member.totalScore}</td>
                {isCreator && (
                  <>
                    <th className="px-2 py-3 text-center">
                      {member.handiCapValue}
                    </th>
                    <th className="px-2 py-3 text-center">{member.netValue}</th>
                  </>
                )}
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default ScorePage;
