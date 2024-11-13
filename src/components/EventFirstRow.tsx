import { FunctionComponent, useMemo, type CSSProperties } from "react";

type EventFirstRowType = {
  ellipse2311?: string;
  golfMasters?: string;
  nov13SUN?: string;
  zOZOCHAMPIONSHIP?: string;
  groupDivTop?: CSSProperties["top"];
  propWidth?: CSSProperties["width"];
};

const EventFirstRow: FunctionComponent<EventFirstRowType> = ({
  ellipse2311,
  golfMasters,
  nov13SUN,
  zOZOCHAMPIONSHIP,
  groupDivTop,
  propWidth,
}) => {
  const groupDiv7Style: CSSProperties = useMemo(() => {
    return {
      top: groupDivTop,
    };
  }, [groupDivTop]);

  const groupDiv8Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className="absolute top-[0px] left-[0px] w-[948.7px] h-[71.2px] text-left text-[15.62px] text-darkslategray-600 font-poppins"
      style={groupDiv7Style}
    >
      <div className="absolute top-[0px] left-[0.8px] rounded-[1.56px] bg-lavender-300 shadow-[0px_0px_3.12px_#bcfff9] w-[947.9px] h-[71.1px]" />
      <div className="absolute top-[0.1px] left-[0px] w-[23.4px] h-[71.1px] text-white">
        <div className="absolute top-[0px] left-[0px] bg-indianred w-[23.4px] h-[71.1px]" />
        <div className="absolute top-[51.5px] left-[0px] capitalize font-medium [transform:_rotate(-90deg)] [transform-origin:0_0]">
          FULL
        </div>
      </div>
      <img
        className="absolute top-[14.2px] left-[40.6px] rounded-[50%] w-[42.2px] h-[42.2px] object-cover"
        alt=""
        src={ellipse2311}
      />
      <div className="absolute top-[23.6px] left-[92.9px] capitalize font-medium text-darkslategray-700">
        {golfMasters}
      </div>
      <div className="absolute top-[23.6px] left-[210.1px] leading-[150%] text-center">
        12:00 PM
      </div>
      <div className="absolute top-[15.8px] left-[851.9px] w-[58.6px] h-[39px] text-[10.93px] text-white">
        <div className="absolute top-[0px] left-[0px] w-[16.4px] h-[39px]">
          <div className="absolute top-[0px] left-[0px] w-[16.4px] h-[39px]">
            <div className="absolute top-[0px] left-[0px] rounded-[1.56px] bg-lightseagreen-200 w-[16.4px] h-[39px]" />
            <div className="absolute h-[88.97%] w-full top-[4.1%] right-[0%] bottom-[6.92%] left-[0%]">
              <img
                className="absolute h-[33.43%] w-[64.02%] top-[0%] right-[17.07%] bottom-[66.57%] left-[18.9%] rounded-[1.56px] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/img/vector31.svg"
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
      <div className="absolute top-[19.7px] left-[662px] leading-[15.62px] inline-block w-[163.2px]">
        It's a organizer's note. Keep in mind
      </div>
      <div className="absolute top-[23.6px] left-[295.8px] text-center">
        {nov13SUN}
      </div>
      <div
        className="absolute top-[17.3px] left-[411.6px] w-[156.5px] h-[36.7px] text-[12.49px] text-gray1-900"
        style={groupDiv8Style}
      >
        <div className="absolute top-[0px] left-[0px] tracking-[-0.13px] leading-[14.05px] font-medium">
          {zOZOCHAMPIONSHIP}
        </div>
        <div className="absolute top-[18.7px] left-[0px] w-[156.5px] h-[18px] text-center text-[11.71px] text-darkslategray-600">
          <div className="absolute top-[0px] left-[12.5px]">
            Yokohama Country Club
          </div>
          <img
            className="absolute h-[63.89%] w-[6.26%] top-[18.33%] right-[94.12%] bottom-[17.78%] left-[-0.38%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/img/group-1000009274.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default EventFirstRow;
