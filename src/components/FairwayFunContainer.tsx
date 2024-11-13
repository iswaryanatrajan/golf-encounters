import { FunctionComponent, useMemo, type CSSProperties } from "react";

type FairwayFunContainerType = {
  imageDimensions?: string;
  activityImageUrl?: string;
  eventDate?: string;
  championshipName?: string;
  imageDimensionsText?: string;
  propTop?: CSSProperties["top"];
  propWidth?: CSSProperties["width"];
};

const FairwayFunContainer: FunctionComponent<FairwayFunContainerType> = ({
  imageDimensions,
  activityImageUrl,
  eventDate,
  championshipName,
  imageDimensionsText,
  propTop,
  propWidth,
}) => {
  const groupDiv9Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  const groupDiv10Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className="absolute top-[92.3px] left-[0.8px] w-[947.9px] h-[71.1px] text-left text-[15.62px]  font-poppins"
      style={groupDiv9Style}
    >
      <div className="absolute top-[0px] left-[0px] rounded-[1.56px] bg-[#3A66C0] shadow-[-3.9px_3.9px_3.12px_#0052fb] w-[947.9px] h-[71.1px] text-white" />
      <img
        className="absolute top-[14.1px] left-[39.8px] rounded-[50%] w-[42.2px] h-[42.2px] object-cover"
        alt=""
        src={imageDimensions}
      />
      <div className="absolute top-[23.4px] left-[92.1px] capitalize font-medium">
        {activityImageUrl}
      </div>
      <div className="absolute top-[23.4px] left-[209.3px] leading-[150%] text-center">
        12:00 PM
      </div>
      <div className="absolute top-[15.6px] left-[851.1px] w-[58.6px] h-[39px] text-[10.93px]">
        <div className="absolute top-[0px] left-[0px] w-[16.4px] h-[39px]">
          <div className="absolute top-[0px] left-[0px] w-[16.4px] h-[39px]">
            <div className="absolute top-[0px] left-[0px] rounded-[1.56px] bg-lightseagreen-200 w-[16.4px] h-[39px]" />
            <div className="absolute h-[88.97%] w-full top-[4.1%] right-[0%] bottom-[6.92%] left-[0%]">
              <img
                className="absolute h-[33.43%] w-[64.02%] top-[0%] right-[17.07%] bottom-[66.57%] left-[18.9%] rounded-[1.56px] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector31.svg"
              />
              <div className="absolute top-[16px] left-[-0.4px] box-border w-[17.2px] h-[0.8px] border-t-[0.8px] border-solid border-white" />
              <div className="absolute top-[18.7px] left-[1.6px] capitalize">
                20
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[0px] left-[21.1px] w-[16.4px] h-[39px]">
          <div className="absolute top-[0px] left-[0px] w-[16.4px] h-[39px]">
            <div className="absolute top-[0px] left-[0px] rounded-[1.56px] bg-lightseagreen-200 w-[16.4px] h-[39px]" />
            <div className="absolute top-[18px] left-[0px] w-[16.4px] h-[18.3px]">
              <div className="absolute top-[-0.4px] left-[-0.4px] box-border w-[17.2px] h-[0.8px] border-t-[0.8px] border-solid border-white" />
              <div className="absolute top-[2.3px] left-[3.1px] capitalize">
                12
              </div>
            </div>
          </div>
          <img
            className="absolute h-[24.1%] w-[66.46%] top-[8.97%] right-[17.07%] bottom-[66.92%] left-[16.46%] rounded-[1.56px] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/img/vector41.svg"
          />
        </div>
        <img
          className="absolute top-[0px] left-[42.2px] w-[16.4px] h-[39px]"
          alt=""
          src="/img/group-1000009295.svg"
        />
      </div>
      <div className="absolute top-[19.5px] left-[661.2px] leading-[15.62px] inline-block w-[163.2px]">
        It's a organizer's note. Keep in mind
      </div>
      <div className="absolute top-[23.4px] left-[295px] text-center">
        {eventDate}
      </div>
      <div
        className="absolute top-[17.2px] left-[410.8px] w-[174px] h-[36.7px] text-[12.49px]"
        style={groupDiv10Style}
      >
        <div className="absolute top-[0px] left-[0px] tracking-[-0.13px] leading-[14.05px] font-medium">
          {championshipName}
        </div>
        <div className="absolute top-[18.7px] left-[0px] w-[156.5px] h-[18px] text-center text-[11.71px]">
          <div className="absolute top-[0px] left-[12.5px]">
            Yokohama Country Club
          </div>
          <img
            className="absolute h-[63.89%] w-[6.26%] top-[18.33%] right-[94.12%] bottom-[17.78%] left-[-0.38%] max-w-full overflow-hidden max-h-full"
            alt=""
            src={imageDimensionsText}
          />
        </div>
      </div>
    </div>
  );
};

export default FairwayFunContainer;
