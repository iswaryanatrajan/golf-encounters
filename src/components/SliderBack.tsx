import { FunctionComponent, useMemo, type CSSProperties } from "react";

type SliderBackType = {
  /** Style props */
  groupDivLeft?: CSSProperties["left"];
};

const SliderBack: FunctionComponent<SliderBackType> = ({
  groupDivLeft,
}) => {
  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      left: groupDivLeft,
    };
  }, [groupDivLeft]);

  return (
    <div
      className="absolute top-[53px] left-[766px] w-[445px] h-[299px] text-left text-[13.55px] text-black font-poppins"
      style={groupDivStyle}
    >
      <div className="absolute top-[13px] left-[17px] w-[428px] h-[273.8px]">
        <div className="absolute top-[0px] left-[0px] w-[428px] h-[273.8px]">
          <div className="absolute top-[0px] left-[0px] w-[428px] h-[273.8px]">
            <img
              className="absolute top-[-2.7px] left-[-1.8px] w-[431.7px] h-[279.2px]"
              alt=""
              src="/img/group-1000008671.svg"
            />
            <div className="absolute top-[12.9px] left-[19.6px] w-[388.5px] h-[248.7px]">
              <div className="absolute top-[0px] left-[0px] w-[388.5px] h-[248.7px]">
                <img
                  className="absolute top-[-6.8px] left-[-5.9px] rounded-[6.78px] w-[400.3px] h-[262.3px]"
                  alt=""
                  src="/img/rectangle-10.svg"
                />
                <div className="absolute top-[35.9px] left-[34.4px] w-[97.5px] h-[28.5px] font-body-b2">
                  <img
                    className="absolute top-[-2.7px] left-[-2.7px] w-[102.9px] h-[33.9px]"
                    alt=""
                    src="/img/rectangle-5.svg"
                  />
                  <div className="absolute top-[8.1px] left-[17.5px] tracking-[-0.11px] leading-[12.2px]">
                    <span>{`POS / `}</span>
                    <b className="text-lightseagreen-200">3rd</b>
                  </div>
                </div>
                <b className="absolute top-[80.6px] left-[34.4px] tracking-[-0.11px] leading-[12.2px] inline-block text-gray1-200 w-[82.6px]">
                  Driver: John
                </b>
                <b className="absolute top-[107.8px] left-[34.4px] tracking-[-0.11px] leading-[12.2px] text-gray1-200">
                  Driver: Robert
                </b>
                <div className="absolute top-[132.2px] left-[34.4px] w-[198.4px] h-[23px]">
                  <b className="absolute top-[5.4px] left-[0px]  leading-[12.2px] inline-block w-[58.7px]">
                    Name :
                  </b>
                  <div className="absolute top-[5.4px] left-[92.4px]  leading-[12.2px] font-semibold text-lightseagreen-200">
                    Rory McIlroy
                  </div>
                  <img
                    className="absolute top-[0px] left-[65.4px] rounded-[50%] w-[22.9px] h-[23px] object-cover"
                    alt=""
                    src="/img/ellipse-11@2x.png"
                  />
                </div>
                <div className="absolute top-[176.2px] left-[29px] w-[140.3px] h-[33.9px] text-darkslategray-500">
                  <div className="absolute top-[0px] left-[0px] w-[140.3px] h-[33.9px]">
                    <div className="absolute top-[0px] left-[0px] w-[140.3px] h-[33.9px]">
                      <b className="absolute top-[10.8px] left-[0px]  leading-[12.2px] inline-block w-[87.6px]">
                        Total Par :
                      </b>
                      <div className="absolute top-[0px] left-[102.5px] w-[37.8px] h-[33.9px] text-[27.11px] text-white">
                        <div className="absolute top-[0px] left-[0px] w-[37.8px] h-[33.9px]">
                          <div className="absolute top-[0px] left-[0px] w-[37.8px] h-[33.9px]">
                            <div className="absolute top-[0px] left-[0px] rounded-[3.39px] bg-firebrick-200 shadow-[0px_0px_2.71px_rgba(0,_0,_0,_0.25)] w-[37.8px] h-[33.9px]" />
                            <b className="absolute top-[10.8px] left-[5.4px]  leading-[12.2px] inline-block w-[26.9px]">
                              71
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[34.5px] left-[187.5px] w-[155.8px] h-[84.6px] text-[5.34px] text-white font-body-b2">
                <div className="absolute top-[0px] left-[0px] w-[155.2px] h-[84.6px]">
                  <div className="absolute top-[0px] left-[0px] rounded-sm [background:linear-gradient(180deg,_#2168f8,_#3c5099_37.5%,_#404144)] w-[155.2px] h-[84.6px]" />
                  <img
                    className="absolute top-[0px] left-[0px] w-[66.7px] h-[84.6px] object-cover"
                    alt=""
                    src="/img/rectangle-53@2x.png"
                  />
                  <div className="absolute top-[11.2px] left-[70.9px] text-[6.68px] tracking-[-0.04px] leading-[4.01px] uppercase font-semibold text-darkturquoise-200 flex items-center w-[70.7px] h-1 [-webkit-text-stroke:0.2px_#00eafe] [transform:_rotate(-6.97deg)] [transform-origin:0_0]">
                    Sarut Vongchaisit
                  </div>
                  <div className="absolute top-[19.1px] left-[70.5px] w-[80.5px] h-[7.1px] [transform:_rotate(-4.02deg)] [transform-origin:0_0] text-[3.56px] text-black">
                    <div className="absolute top-[0px] left-[0px] rounded-[1.11px] bg-white w-[80.5px] h-[7.1px] [transform:_rotate(-4.02deg)] [transform-origin:0_0]" />
                    <div className="absolute top-[1.3px] left-[3.4px] w-0.5 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      <div className="absolute top-[0px] left-[0px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-0.5 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                        1
                      </div>
                    </div>
                    <div className="absolute top-[-0.6px] left-[30.6px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-1.1px] left-[37.7px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      5
                    </div>
                    <div className="absolute top-[-1.8px] left-[47.6px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      6
                    </div>
                    <div className="absolute top-[-2.4px] left-[56.9px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      7
                    </div>
                    <div className="absolute top-[-3px] left-[65.3px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      8
                    </div>
                    <div className="absolute top-[-3.7px] left-[75.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      9
                    </div>
                    <div className="absolute top-[0.8px] left-[11.2px] w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      <div className="absolute top-[0px] left-[0px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                        2
                      </div>
                    </div>
                    <div className="absolute top-[0.1px] left-[21.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      3
                    </div>
                  </div>
                  <div className="absolute top-[39.9px] left-[70.5px] w-[80.5px] h-[7.1px] [transform:_rotate(-4.02deg)] [transform-origin:0_0] text-[3.56px] text-black">
                    <div className="absolute top-[0px] left-[0px] rounded-[1.11px] bg-white w-[80.5px] h-[7.1px] [transform:_rotate(-4.02deg)] [transform-origin:0_0]" />
                    <div className="absolute top-[1.3px] left-[3.4px] w-[5px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      <div className="absolute top-[0px] left-[0px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[5px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                        10
                      </div>
                    </div>
                    <div className="absolute top-[-0.6px] left-[30.6px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      13
                    </div>
                    <div className="absolute top-[-1.1px] left-[37.7px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[5px] h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      14
                    </div>
                    <div className="absolute top-[-1.8px] left-[47.6px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      15
                    </div>
                    <div className="absolute top-[-2.4px] left-[56.9px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      16
                    </div>
                    <div className="absolute top-[-3px] left-[65.3px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      17
                    </div>
                    <div className="absolute top-[-3.7px] left-[75.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      18
                    </div>
                    <div className="absolute top-[0.8px] left-[11.2px] w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      <div className="absolute top-[0px] left-[0px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                        11
                      </div>
                    </div>
                    <div className="absolute top-[0.1px] left-[21.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-4.02deg)] [transform-origin:0_0]">
                      12
                    </div>
                  </div>
                  <div className="absolute top-[29.4px] left-[73.8px] w-[76.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                    <div className="absolute top-[0.9px] left-[0.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-1.7px] left-[29.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-3.1px] left-[45.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-2.4px] left-[37.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      5
                    </div>
                    <div className="absolute top-[-4.8px] left-[64.3px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      3
                    </div>
                    <div className="absolute top-[-5.5px] left-[72.3px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-0.7px] left-[7.9px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] border-[0.2px] border-solid border-white" />
                            <div className="absolute top-[0.8px] left-[1.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3.3px] h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                              4
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[-1.6px] left-[17.9px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] rounded-[0.45px] box-border w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] border-[0.2px] border-solid border-white" />
                        <div className="absolute top-[0.7px] left-[1.8px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          4
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[-4.7px] left-[53px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] rounded-[0.45px] box-border w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] border-[0.2px] border-solid border-white" />
                          <div className="absolute top-[0.7px] left-[1.8px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                            5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[49.9px] left-[73.6px] w-[76.3px] h-1.5 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                    <div className="absolute top-[1.3px] left-[0.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      5
                    </div>
                    <div className="absolute top-[-1.3px] left-[25.5px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      3
                    </div>
                    <div className="absolute top-[-2px] left-[34.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      4
                    </div>
                    <div className="absolute top-[-4.3px] left-[61.9px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                      3
                    </div>
                    <div className="absolute top-[-0.7px] left-[7.9px] w-[68.4px] h-1.5 [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[68.4px] h-1.5 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] w-[68.4px] h-1.5 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[68.4px] h-1.5 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0.4px] left-[0px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]" />
                              <div className="absolute top-[0.8px] left-[0.7px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3.3px] h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                                4
                              </div>
                            </div>
                            <div className="absolute top-[-2.6px] left-[34.9px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] border-[0.2px] border-solid border-white" />
                              <div className="absolute top-[0.8px] left-[1.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3.3px] h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                                4
                              </div>
                            </div>
                            <div className="absolute top-[-5.5px] left-[62.6px] w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[5.5px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] border-[0.2px] border-solid border-white" />
                              <div className="absolute top-[0.8px] left-[1.2px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-[3.3px] h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                                3
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[-1.1px] left-[17px] w-[7.8px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[7.8px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] w-[7.8px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          <div className="absolute top-[-0.1px] left-[0.9px] rounded-[0.45px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]" />
                          <div className="absolute top-[0.7px] left-[0.1px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                            4
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[-4.2px] left-[53px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0] text-8xs-9">
                      <div className="absolute top-[0px] left-[0px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] rounded-[0.45px] w-[6.9px] h-[5.6px] [transform:_rotate(-5.02deg)] [transform-origin:0_0]" />
                          <div className="absolute top-[0.7px] left-[0.4px] tracking-[-0.04px] leading-[4.01px] font-semibold flex items-center w-1 h-1 [transform:_rotate(-5.02deg)] [transform-origin:0_0]">
                            4
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[56.3px] left-[93.3px] w-[35px] h-3.5">
                    <div className="absolute top-[5.9px] left-[0px] tracking-[-0.04px] leading-[4.01px] uppercase font-semibold flex items-center w-[17.9px] h-1 [transform:_rotate(-5deg)] [transform-origin:0_0]">
                      Total
                    </div>
                    <div className="absolute top-[0.7px] left-[21.1px] w-[13.3px] h-[13.4px] [transform:_rotate(-3.01deg)] [transform-origin:0_0] text-[8.02px]">
                      <div className="absolute top-[0px] left-[0px] w-[13.3px] h-[13.4px] [transform:_rotate(-3.01deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] rounded-[0.67px] bg-crimson-200 w-[13.3px] h-[13.4px] [transform:_rotate(-3.01deg)] [transform-origin:0_0]" />
                        <b className="absolute top-[4.9px] left-[2.4px] tracking-[-0.04px] leading-[4.01px] flex items-center w-[9px] h-1 [transform:_rotate(-8.04deg)] [transform-origin:0_0]">
                          71
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[48.5px] left-[67.8px] rounded-[50%] bg-mediumslateblue [filter:blur(32.07px)] w-[32.8px] h-[33px]" />
                <div className="absolute top-[46.1px] left-[123px] rounded-[50%] bg-mediumslateblue [filter:blur(31.84px)] w-[32.8px] h-[33px]" />
              </div>
            </div>
          </div>
          <div className="absolute top-[189.1px] left-[201px] w-[140.3px] h-[33.9px] text-darkslategray-500">
            <div className="absolute top-[10.8px] left-[0px] w-[91.6px] h-[13px]">
              <b className="absolute top-[0px] left-[0px]  leading-[12.2px] inline-block w-[91.6px]">
                Score Par :
              </b>
            </div>
            <div className="absolute top-[0px] left-[102.5px] w-[37.8px] h-[33.9px] text-[27.11px] text-white">
              <div className="absolute top-[0px] left-[0px] rounded-[3.39px] bg-lightseagreen-200 shadow-[0px_0px_2.71px_rgba(0,_0,_0,_0.25)] w-[37.8px] h-[33.9px]" />
              <b className="absolute top-[10.8px] left-[1.3px]  leading-[12.2px] inline-block w-[34.8px]">
                78
              </b>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-[calc(50%_-_149.5px)] left-[calc(50%_-_221.2px)] rounded-3xs w-[445px] h-[299px]"
        alt=""
        src="/img/rectangle-8.svg"
      />
    </div>
  );
};

export default SliderBack;
