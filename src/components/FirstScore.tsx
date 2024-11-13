import { FunctionComponent } from "react";

interface FirstScoreProps {
  data: {
    teamName: string;
    score1: number;
    score2: number;
    score3: number;
    teamImage: string;
    rowBackgroundColor: string;
    teamBackgroundColor?: string;
  };
  rowBackgroundColor: string;
  teamBackgroundColor: string;
}

const FirstScore: FunctionComponent<FirstScoreProps> = ({ data }) => {
  const {
    teamName,
    score1,
    score2,
    score3,
    teamImage,
    rowBackgroundColor,
    teamBackgroundColor,
  } = data;
  return (
    <div className="flex flex-row items-center justify-center relative gap-[10px] text-left text-base text-white font-poppins">
      <div className="relative w-[1302px] h-[72px] z-[0]">
        <div
          className={`absolute top-[0px] left-[0px] rounded  shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-[1302px] h-[72px]`}
          style={{ backgroundColor: rowBackgroundColor }}
        />
      </div>
      <div className="my-0 mx-[!important] absolute top-[5px] left-[5px] flex flex-row items-center justify-center gap-[13px] z-[1]">
        <div className="relative w-[179px] h-[58px]">
          <div className="absolute top-[0px] left-[0px] flex flex-row items-center justify-start">
            <div className="relative w-[149px] h-[58px]">
              <div
                className="absolute top-[0px] left-[0px] rounded-10xs  w-[149px] h-[58px]"
                style={{ backgroundColor: teamBackgroundColor }}
              />
              <div className="absolute top-[19px] left-[4px] leading-[20px] font-semibold">
                {teamName}
              </div>
            </div>
            <img
              className="relative rounded-[50%] w-[58px] h-[58px] object-cover ml-[-28px]"
              alt=""
              src={teamImage}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[32px] text-lg text-dimgray-100">
          <div className="relative w-[25px] h-[24.1px] text-white ">
            <div className="absolute top-[0px] left-[0px] rounded-sm bg-seagreen-100 w-[25px] h-[24.1px]" />
            <div className="absolute top-[2px] left-[2px] leading-[20px]">
              {score1}
            </div>
          </div>
          <div className="relative w-[27.9px] h-[26.9px] text-white left-[-26px]">
            <div className="absolute top-[0px] left-[0px] rounded-smi bg-blueviolet w-[27.9px] h-[26.9px]" />
            <div className="absolute top-[3px] left-[5px] leading-[20px]">
              {score2}
            </div>
          </div>
          <div className="relative text-xl leading-[20px] font-semibold text-darkslategray-700 left-[-46px]">{`22 `}</div>
          <div className="relative w-[191px] h-5 left-[-60px]">
            <div className="absolute top-[0px] left-[0px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[37px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[71px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[108px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[144px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[181px] leading-[20px]">
              -
            </div>
          </div>
          <div className="relative w-14 h-[62px] text-white left-[-79px]">
            <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
            <div className="absolute top-[21px] left-[17px] leading-[20px] font-medium">
              39
            </div>
          </div>
          <div className="relative w-[191px] h-5 left-[-96px]">
            <div className="absolute top-[0px] left-[0px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[37px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[71px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[108px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[144px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[181px] leading-[20px]">
              -
            </div>
          </div>
          <div className="relative w-[81px] h-5 left-[-106px]">
            <div className="absolute top-[0px] left-[0px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[37px] leading-[20px]">
              -
            </div>
            <div className="absolute top-[0px] left-[71px] leading-[20px]">
              -
            </div>
          </div>
          <div className="relative w-14 h-[62px] text-white left-[-120px]">
            <div className="absolute top-[0px] left-[0px] bg-gray1-1300 w-14 h-[62px]" />
            <div className="absolute top-[21px] left-[17px] leading-[20px] font-medium">
              39
            </div>
          </div>
          <div className="relative leading-[20px] left-[-120px]">-</div>
          <div className="relative leading-[20px] left-[-100px]">-</div>
          <div className="relative leading-[20px] left-[-70px]">-</div>

          <div className="relative w-[87px] h-[41px] text-base text-black left-[-45px]">
            <div className="absolute top-[0px] left-[0px] rounded-md box-border w-[87px] h-[41px] border-[1px] border-solid border-dimgray-100" />
            <div className="flex justify-center items-center">-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstScore;
