import { FunctionComponent } from "react";
import ChampionShipName from "../components/ChampionShipName";
import ScoringTab from "../components/ScoringTabs"
const OngoingIndiviualScore: FunctionComponent = () => {
  return (
    <div className="mt-20 text-lg text-left text-white font-poppins">
      <ChampionShipName />
       <div className="[background:linear-gradient(180deg,_#edfffd,_#f2fffa)] max-w-screen-2xl mx-auto mt-[50px] border-solid border-2 border-[#51ff85] rounded-md">
        <div className="max-w-screen-xl mx-auto">
        {/* <div className="grid grid-cols-6 gap-4 p-2 mt-8 bg-white rounded shadow-md">
        <div className="col-span-6 md:col-span-3 ">
          <div className="flex items-center h-20 gap-4 rounded">
            <img
              className="h-full"
              src="img/rectangle-1267@2x.png"
              alt="World Ranking"
            />
            <div className="text-2xl font-bold text-black ">
              <h2 className="m-0">Fore Friends</h2>
              <p className="flex items-center gap-2 m-0">world Ranking <span>10</span></p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="flex justify-end h-20 rounded">
            <img className="h-full " src="/img/golf-player.png" alt="Golf Player" />
          </div>
        </div>
      </div> */}
      <div className="flex items-center gap-2 py-10">
        <img src="/img/short.png" alt="" className="w-40 h-40" />
        <h2 className="text-4xl font-bold text-blue-900">Team Score Card</h2>
      </div>
      <ScoringTab/>
        </div>
       </div>
      
    </div>
  );
};

export default OngoingIndiviualScore;
