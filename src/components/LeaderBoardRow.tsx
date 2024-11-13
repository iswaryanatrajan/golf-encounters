import { FunctionComponent } from "react";
interface PlayerScoreProps {
  // data: {
  //   pos: number;
  //   teamName: string;
  //   score1: number;
  //   score2: number;
  //   score3: number;
  //   totalPar: number;
  //   teamImage: string;
  //   rowBackgroundColor?: string;
  //   teamBackgroundColor?: string;
  // };
  // rowBackgroundColor: string;
  // teamBackgroundColor: string;
}
const LeaderBoardRow = ({ data }: any) => {
  const {
    teamName,
    score1,
    score2,
    score3,
    teamImage,
    rowBackgroundColor,
    teamBackgroundColor,
    pos,
    totalPar,
  } = data;
  return (
    <div
      className={`mt-6 rounded-md  bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-24 text-black font-poppins text-center`}
    >
      <div className="flex items-center h-full gap-4 px-3 leading-[18px]">
        <div className="flex text-xl text-lightseagreen-100 leading-[20px] basis-1/6 ">
          <div className="">
            <b>{pos}</b>
          </div>
        </div>
        <div className="flex gap-1 text-base basis-4 text-seagreen-100 ">
          <img className="" alt="" src="/img/vector.svg" />
          <div className="leading-[20px]">3</div>
        </div>
        <div className="relative flex gap-2 basis-1/2">
          <div className="absolute top-[-10px] left-[0px] w-[161px] h-6">
            <div className="absolute top-[0px] left-[0px] flex flex-row items-center  gap-[8px]">
              <img
                className="relative rounded-[50%] w-10 h-10 object-cover"
                alt=""
                src={teamImage}
              />
              <div className="relative  leading-[18px] font-medium">
                {data.userId}
              </div>
            </div>
          </div>
          u
        </div>
        <div className="basis-1/3">
          <div className="relative w-[148px] h-[41px] text-white">
            <div
              className="absolute top-[0px] left-[0px] rounded  w-[148px] h-[41px] text-center "
              style={{
                backgroundColor: teamBackgroundColor,
              }}
            />
            <div className="absolute top-[11px] left-[7px] leading-[20px] font-medium">
              {teamName}
            </div>
          </div>
        </div>
        <div className="basis-1/5  leading-[20px] font-medium text-lg">
          {score1}
        </div>
        <div className="basis-1/5 leading-[20px] font-medium text-lg ">
          {score2}
        </div>
        <div className="basis-1/5 leading-[20px] font-medium text-lg">
          {score3}
        </div>
        <div className="basis-1/5 leading-[20px] font-medium text-lg">
          {data.totalScore}
        </div>
        {/* <div className="flex justify-center basis-1/2">
          {" "}
          <div className="relative w-[101px] h-[54.7px] text-center text-[1.97px] text-darkslategray-200 font-lato">
            <div className="absolute top-[0px] left-[calc(50%_-_50.5px)] w-[101px] h-[54.7px]">
              <div className="absolute top-[0px] left-[calc(50%_-_50.5px)] shadow-[0px_0.1px_0.49px_rgba(0,_0,_0,_0.25)] w-[101px] h-[54.7px]" />
              <div className="absolute top-[2px] left-[2.5px] w-[95.4px] h-[47.5px]">
                <div className="absolute top-[5.8px] left-[0px] w-[95.4px] h-[41.7px] text-[1.72px]">
                  <div className="absolute top-[6.6px] left-[0px] w-[95.4px] h-[35.1px]">
                    <div className="absolute top-[32px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[25.9px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[19.7px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[13.6px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[7.4px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[1.3px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                    <div className="absolute top-[30px] left-[0.5px] text-[1.97px] leading-[2.7px] font-semibold">
                      0
                    </div>
                    <div className="absolute top-[32.1px] left-[7.4px] leading-[2.7px] font-semibold">
                      2
                    </div>
                    <div className="absolute top-[32.1px] left-[14.6px] leading-[2.7px] font-semibold">
                      4
                    </div>
                    <div className="absolute top-[32.1px] left-[21.9px] leading-[2.7px] font-semibold">
                      6
                    </div>
                    <div className="absolute top-[32.1px] left-[29.1px] leading-[2.7px] font-semibold">
                      7
                    </div>
                    <div className="absolute top-[32.1px] left-[36.4px] leading-[2.7px] font-semibold">
                      8
                    </div>
                    <div className="absolute top-[32.1px] left-[42.6px] leading-[2.7px] font-semibold">
                      10
                    </div>
                    <div className="absolute top-[32.1px] left-[49.9px] leading-[2.7px] font-semibold">
                      12
                    </div>
                    <div className="absolute top-[32.1px] left-[57.1px] leading-[2.7px] font-semibold">
                      13
                    </div>
                    <div className="absolute top-[32.1px] left-[64.4px] leading-[2.7px] font-semibold">
                      14
                    </div>
                    <div className="absolute top-[32.1px] left-[71.6px] leading-[2.7px] font-semibold">
                      15
                    </div>
                    <div className="absolute top-[32.1px] left-[78.9px] leading-[2.7px] font-semibold">
                      16
                    </div>
                    <div className="absolute top-[32.1px] left-[86.1px] leading-[2.7px] font-semibold">
                      17
                    </div>
                    <div className="absolute top-[32.1px] left-[93.4px] leading-[2.7px] font-semibold">
                      18
                    </div>
                    <div className="absolute top-[24.6px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                      10
                    </div>
                    <div className="absolute top-[18.3px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                      20
                    </div>
                    <div className="absolute top-[12.2px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                      30
                    </div>
                    <div className="absolute top-[6px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                      40
                    </div>
                    <div className="absolute top-[0px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                      50
                    </div>
                  </div>
                  <div className="absolute top-[1.8px] left-[3.9px] box-border w-[91.3px] h-[0.1px] border-t-[0.1px] border-solid border-gray1-800" />
                  <div className="absolute top-[-0.1px] left-[3.9px] box-border w-[0.1px] h-[38.8px] border-r-[0.1px] border-solid border-gray1-800" />
                  <div className="absolute top-[0.5px] left-[0px] text-[1.97px] leading-[2.7px] font-semibold">
                    60
                  </div>
                </div>
                <div className="absolute top-[0px] left-[26.2px] w-[11.9px] h-[3px]">
                  <div className="absolute top-[0.4px] left-[0px] rounded-[0.25px] bg-firebrick-100 w-0.5 h-0.5" />
                  <div className="absolute top-[0px] left-[3.9px] leading-[2.7px]">
                    Total Par
                  </div>
                </div>
                <div className="absolute top-[0px] left-[49.4px] w-[12.9px] h-[3px]">
                  <div className="absolute top-[0.4px] left-[0px] rounded-[0.25px] bg-mediumseagreen-100 w-0.5 h-0.5" />
                  <div className="absolute top-[0px] left-[2.9px] leading-[2.7px]">
                    Scored Par
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22.4px] left-[8.1px] w-[3.9px] h-[23.8px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[23.8px]" />
              <div className="absolute top-[7.7px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[16.1px]" />
            </div>
            <div className="absolute top-[14.6px] left-[15.4px] w-[3.9px] h-[31.6px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[31.6px]" />
              <div className="absolute top-[10.3px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[21.3px]" />
            </div>
            <div className="absolute top-[35.3px] left-[22.6px] w-[3.9px] h-[10.9px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[10.9px]" />
              <div className="absolute top-[3.6px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[7.4px]" />
            </div>
            <div className="absolute top-[10.2px] left-[29.9px] w-[3.9px] h-9">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-9" />
              <div className="absolute top-[11.7px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[24.3px]" />
            </div>
            <div className="absolute top-[29.9px] left-[37.1px] w-[3.9px] h-[16.3px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[16.3px]" />
              <div className="absolute top-[5.3px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[11px]" />
            </div>
            <div className="absolute top-[37.6px] left-[44.4px] w-[3.9px] h-[8.6px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[8.6px]" />
              <div className="absolute top-[2.8px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[5.8px]" />
            </div>
            <div className="absolute top-[24.8px] left-[51.6px] w-[3.9px] h-[21.4px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[21.4px]" />
              <div className="absolute top-[6.9px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[14.4px]" />
            </div>
            <div className="absolute top-[13.5px] left-[58.9px] w-[3.9px] h-[32.7px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[32.7px]" />
              <div className="absolute top-[10.6px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[22.1px]" />
            </div>
            <div className="absolute top-[30.1px] left-[66.1px] w-[3.9px] h-[16.1px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[16.1px]" />
              <img
                className="absolute top-[10.8px] left-[0px] w-[3.9px] h-[5.3px]"
                alt=""
                src="/rectangle-117.svg"
              />
            </div>
            <div className="absolute top-[26.4px] left-[73.4px] w-[3.9px] h-[19.8px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[19.8px]" />
              <div className="absolute top-[11.7px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[8.1px]" />
            </div>
            <div className="absolute top-[16.3px] left-[80.6px] w-[3.9px] h-[29.9px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[29.9px]" />
              <div className="absolute top-[9.7px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[20.2px]" />
            </div>
            <div className="absolute top-[36.6px] left-[87.9px] w-[3.9px] h-[9.6px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[9.6px]" />
              <div className="absolute top-[3.1px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[6.5px]" />
            </div>
            <div className="absolute top-[31.7px] left-[95.1px] w-[3.9px] h-[14.5px]">
              <div className="absolute top-[0px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-firebrick-100 w-[3.9px] h-[14.5px]" />
              <div className="absolute top-[4.7px] left-[0px] rounded-t-[0.74px] rounded-b-none bg-mediumseagreen-100 w-[3.9px] h-[9.8px]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeaderBoardRow;
