import { singleEventContextStore } from ".././././../contexts/eventContext";
export const ScoreSlider = ({ item }: any) => {
  const scorePerShot = item?.scorePerShot?.slice(1, -1);
  const { singleEvent } = singleEventContextStore();
  const handiCapPerShot = item?.handiCapPerShot?.slice(1, -1);
  const nickName = item?.userScoreCard?.nickName;
  const displayNickName =
    nickName && nickName?.length > 6 ? `${nickName?.substring(0, 6)}` : nickName;
  return (
    <div className="relative sajid px-4 z-[1]">
      <div className="xl:absolute xl:h-[230px] transform scale-150 skew-x-[-4deg] p-2 w-[430px] left-[104px] rounded-lg bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] z-0" />
      <div className="relative z-1 bg-blue">
        <div className="lg:flex gap-[60px]">
          <div className="p-1">
            <h4 className="m-0 mb-3 font-base"><label className="w-[100px] inline-block">Handicap: </label>{item?.handiCapValue}</h4>
            <h4 className="m-0 mb-3"><label className="w-[100px] inline-block">Total: </label>{item?.totalScore}</h4>
            <h4 className="m-0 mb-3"><label className="w-[100px] inline-block">Net Value: </label>{item?.netValue}</h4>
            <h4 className="m-0 mb-3 flex items-center gap-1">
              <img
                className="w-10 h-10 rounded-full "
                src={item?.userScoreCard?.imageUrl}
                alt=""
              />{" "}
              {displayNickName}
            </h4>
            <h4 className="m-0 mb-3"><label className="w-[100px] inline-block">POS: </label>{item.position}</h4>
          </div>
          <div
            className="flex items-center bg-cover pe-3 rounded-lg"
            style={{
              backgroundImage: "url('/img/FullScorebg.png')",
            }}
          >
            <div className="h-full">
              <img className="object-fit border-solid border border-[#17b3a6] bg-contain lg:w-[150px] w-20"   height="99%" src={item?.userScoreCard?.imageUrl} alt="" />
            </div>
            <div className="px-2">
              <h4 className="m-0 text-[#00E7FA] my-1">
                {item?.userScoreCard?.nickName}
              </h4>
              <div >
                <ul className="bg-white p-1 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]">
                  <li className="list-none text-[11px] tracking-wide ">
                  <span className="text-[#17b3a6] font-bold">Holes</span>  1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18
                  </li>
                </ul>
                <ul className="bg-white p-1 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] my-2">
                  <li className="list-none text-[11px] tracking-wide">
                   
                  <span className="text-[#17b3a6] font-bold">PAR </span>&nbsp;&nbsp; {singleEvent?.shotsPerHoles}
                  </li>
                </ul>
                <ul className="flex gap-2 bg-white p-1 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-1">
                <li className="list-none text-[11px] tracking-wide text-black">
                <span className="text-[#17b3a6] font-bold">Score</span> {scorePerShot}
                  </li>
                </ul>
              </div>
             
              <div className="flex justify-center mt-2 items-center">
                <p className="m-0 text-xs text-white">Player Score: </p>{" "}
                <span className="bg-[#B10000] p-1 text-white rounded-md ml-2	">
                  {item.totalScore}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 py-4 px-4">
          <div>
          <h2 className="m-0 inline">Total Score: </h2>{" "}
          <span className="bg-[#17b3a6] p-3 text-white rounded-md ml-2">
            {item.totalScore}
          </span>
          </div>
          <div>
          <h2 className="m-0 inline">Total Par: </h2>{" "}
          <span className="bg-[#17b3a6] p-3 text-white rounded-md ml-2	">
            {item.netValue}
          </span>
          </div>
        </div>
      </div>
    </div>
  );
};
