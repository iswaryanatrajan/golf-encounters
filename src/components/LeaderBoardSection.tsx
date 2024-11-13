import { FunctionComponent } from "react";
import LeaderBoardHeader from "../components/LeaderBoardHeader";
import LeaderBoardFirstRow from "../components/LeaderBoardRow";
import Team from "../utils/Team";
import { useTranslation } from "react-i18next";
import { useScoreContext } from "../contexts/scoreContext";

const LeaderBoardSection: FunctionComponent = () => {
  const holes = Array.from({ length: 18 }, (_, index: number) => index + 1);

  const { score } = useScoreContext();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <>
      <div className="mt-20 mx-5 md:mx-[80px] bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]  p-[80px]  animate__animated animate__bounceInDown">
        <div>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
              <tr>
                <th>User</th>
                <th className="px-2 py-3 text-center">HOLE</th>
                {holes.map((hole, idx) => {
                  return (
                    <th className={`text-center px-2 py-3`} key={idx}>
                      {hole}
                    </th>
                  );
                })}
                <th className="px-2 py-3 text-center">Total</th>
                <th className="px-2 py-3 text-center">Net Value</th>
                <th className="px-2 py-3 text-center">Handi Cap Value</th>
              </tr>
            </thead>
            {score?.map((scored: any, index: any) => {
              let arr = scored.scorePerShot;
              arr = JSON.parse(arr);
              return (
                <tbody className="bg-[#054a51] text-white text-center">
                  <tr>
                    <td>{scored.userId}</td>
                    <td className="px-2 py-3 text-center">PAR</td>
                    {arr?.map((shot: any, idx: any) => (
                      <td className="px-2 py-3 text-center" key={idx}>
                        {shot}
                      </td>
                    ))}
                    <td>{scored.totalScore}</td>
                    <td>{scored.netValue}</td>
                    <td>{scored.handiCapValue}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default LeaderBoardSection;
