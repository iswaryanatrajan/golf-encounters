import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const FullScoreCard: FunctionComponent = () => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <div className="w-[480px] h-[348.2px] text-left text-[14.82px] text-black font-body-b2 [transform:_rotate(0deg)] [transform-origin:0_0]">
      <div className="absolute top-[80px] left-[-1px] w-[480px] h-[348.2px]">
        <div className="absolute top-[0px] left-[0px] w-[480px] h-[348.2px]">
          <img
            className="absolute top-[-50px] left-[1px] rounded-[9.02px] w-[480px] h-[340.2px]"
            alt=""
            src="/img/FullScorebg.png"
          />
          <img
            className="absolute top-[-36px] left-[35px] w-[168.7px] h-[300px] object-cover [transform:_rotate(3.5deg)] [transform-origin:0_0]"
            alt=""
            src="/img/rectangle-531@2x.png"
          />
          <div className="absolute top-[20.7px] left-[205.6px] text-3xl tracking-[-0.15px] leading-[16.67px] uppercase font-semibold text-darkturquoise-200 [-webkit-text-stroke:0.9px_#00eafe]">
            Sarut Vongchaisit 
          </div>
          <div className="absolute top-[67.2px] left-[214.5px] w-[219.8px] h-[34.5px] [transform:_rotate(-3deg)] [transform-origin:0_0]">
            <div className="absolute top-[-0.1px] left-[1.3px] rounded-[4.63px] bg-white w-[219px] h-[19.3px]" />
            <div className="absolute top-[3.6px] left-[131px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
              6
            </div>
            <div className="absolute top-[3.6px] left-[156.3px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[5.9px] h-[11.1px]">
              7
            </div>
            <div className="absolute top-[3.6px] left-[179.2px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
              8
            </div>
            <div className="absolute top-[3.6px] left-[205.7px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
              9
            </div>
          </div>
          <div className="absolute top-[71.5px] left-[219.1px] w-[206.2px] h-[56.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
            <div className="absolute top-[0px] left-[0px] w-[13.5px] h-[39.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
              <div className="absolute top-[1.7px] left-[8.2px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[5.2px] h-[11.1px]">
                1
              </div>
              <div className="absolute top-[27px] left-[3.3px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
                4
              </div>
            </div>
            <div className="absolute top-[0px] left-[74px] w-[14.8px] h-[39.1px] [transform:_rotate(5deg)] [transform-origin:0_0]">
              <div className="absolute top-[2.7px] left-[8.3px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
                4
              </div>
              <div className="absolute top-[27.1px] left-[6.3px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
                4
              </div>
            </div>
            <div className="absolute top-[30px] left-[125.6px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
              4
            </div>
            <div className="absolute top-[-0.1px] left-[97px] w-[13.8px] h-[39.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
              <div className="absolute top-[3.6px] left-[7.3px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
                5
              </div>
              <div className="absolute top-[27.2px] left-[3.3px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
                5
              </div>
            </div>
            <div className="absolute top-[27px] left-[177.9px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
              3
            </div>
            <div className="absolute top-[27px] left-[199.6px] text-xl tracking-[-0.15px] leading-[16.67px] text-white flex items-center w-[9.8px] h-[11.1px]">
              4
            </div>
            <div className="absolute top-[0.4px] left-[19.1px] w-[20.7px] h-[43.1px] [transform:_rotate(2deg)] [transform-origin:0_0]">
              <div className="absolute top-[1.2px] left-[13.2px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
                2
              </div>
              <div className="absolute top-[22.2px] left-[3.6px] w-[19.1px] h-[19.1px] text-xl text-white">
                <div className="absolute top-[0px] left-[0px] w-[19.1px] h-[19.1px]">
                  <div className="absolute top-[0px] left-[0px] w-[19.1px] h-[19.1px]">
                    <div className="absolute top-[0px] left-[4px] w-[19.1px] h-[19.1px]">
                      <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[19.1px] h-[19.1px] border-[0.9px] border-solid border-white" />
                      <div className="absolute top-[4.2px] left-[3.6px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                        4
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[0.4px] left-[48.1px] w-[20.3px] h-[42.8px] [transform:_rotate(0deg)] [transform-origin:0_0]">
              <div className="absolute top-[1.2px] left-[9.2px] tracking-[-0.15px] leading-[16.67px] font-semibold flex items-center w-[6.5px] h-[11.1px]">
                3
              </div>
              <div className="absolute top-[22.2px] left-[3.6px] w-[18.7px] h-[18.8px] text-xl text-white">
                <div className="absolute top-[0px] left-[0px] w-[18.7px] h-[18.8px]">
                  <div className="absolute top-[0px] left-[0px] rounded-[1.85px] box-border w-[18.7px] h-[18.8px] border-[0.9px] border-solid border-white" />
                  <div className="absolute top-[3.9px] left-[2.7px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                    4
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[22.6px] left-[147.4px] w-[18.7px] h-[18.9px] text-xl text-white">
              <div className="absolute top-[0px] left-[0px] w-[18.7px] h-[18.9px]">
                <div className="absolute top-[3px] left-[0px] w-[18.7px] h-[18.9px]">
                  <div className="absolute top-[0px] left-[0px] rounded-[1.85px] box-border w-[18.7px] h-[18.9px] border-[0.9px] border-solid border-white" />
                  <div className="absolute top-[4.3px] left-[3.7px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[8.5px] h-[11.1px]">
                    5
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[123.7px] left-[214.1px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
            <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
              <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                <img
                  className="absolute top-[32.4px] left-[34.2px] w-[16.3px] h-[16.3px]"
                  alt=""
                  src="/vector61.svg"
                />
                <div className="absolute top-[31.4px] left-[56.8px] w-[18.7px] h-[15.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                  <div className="absolute top-[0px] left-[0px] w-[18.7px] h-[15.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                    <div className="absolute top-[0px] left-[0px] w-[18.7px] h-[15.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                      <div className="absolute top-[0px] left-[0px] rounded-[1.85px] w-[18.7px] h-[15.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                  <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                    <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                      <div className="absolute top-[23px] left-[153px] rounded-[1.85px] w-[18.7px] h-[15.1px] [transform:_rotate(-5deg)] [transform-origin:0_0]" />
                      <div className="absolute top-[0px] left-[0px] w-[219.9px] h-[71.2px] [transform:_rotate(30deg)] [transform-origin:0_0]">
                        <div className="absolute top-[-0.1px] left-[1.7px] w-[219px] h-[19.3px]">
                          <div className="absolute top-[0px] left-[0px] rounded-[4.63px] bg-white w-[219px] h-[19.3px]" />
                          <div className="absolute top-[0.9px] left-[8.8px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            10
                          </div>
                          <div className="absolute top-[0.9px] left-[78.1px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            13
                          </div>
                          <div className="absolute top-[0.9px] left-[100.1px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            14
                          </div>
                          <div className="absolute top-[0.9px] left-[174.1px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            17
                          </div>
                          <div className="absolute top-[1px] left-[33.5px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            11
                          </div>
                          <div className="absolute top-[0.9px] left-[126.9px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            15
                          </div>
                          <div className="absolute top-[0.9px] left-[199.8px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            18
                          </div>
                          <div className="absolute top-[0.9px] left-[53.1px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            12
                          </div>
                          <div className="absolute top-[0.9px] left-[151.6px] tracking-[-0.15px] leading-[16.67px] font-medium">
                            16
                          </div>
                        </div>
                        <div className="absolute top-[28.3px] left-[9.9px] w-[206.3px] h-[24.2px] text-xl text-white">
                          <div className="absolute top-[6.4px] left-[0px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.8px] h-[11.1px]">
                            5
                          </div>
                          <div className="absolute top-[6.4px] left-[69px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.8px] h-[11.1px]">
                            3
                          </div>
                          <div className="absolute top-[6.4px] left-[90px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.8px] h-[11.1px]">
                            4
                          </div>
                          <div className="absolute top-[6.4px] left-[164.7px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.8px] h-[11.1px]">
                            3
                          </div>
                          <div className="absolute top-[6.4px] left-[22.6px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                            4
                          </div>
                          <div className="absolute top-[0px] left-[110.3px] w-[24.2px] h-[24.2px]">
                            <div className="absolute top-[0px] left-[1.9px] w-[22.3px] h-[22.3px] [transform:_rotate(5deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[22.3px] h-[22.3px] [transform:_rotate(5deg)] [transform-origin:0_0] border-[0.9px] border-solid border-white" />
                              <div className="absolute top-[3.3px] left-[3.6px] tracking-[-0.15px] leading-[16.67px]">
                                4
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-[0px] left-[182.8px] w-[23.5px] h-[23.5px]">
                            <div className="absolute top-[0px] left-[1.9px] w-[21.6px] h-[21.6px] [transform:_rotate(5deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[21.6px] h-[21.6px] [transform:_rotate(5deg)] [transform-origin:0_0] border-[0.9px] border-solid border-white" />
                              <div className="absolute top-[6.2px] left-[3.6px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                                3
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-[6.4px] left-[43.1px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                            4
                          </div>
                          <div className="absolute top-[6.4px] left-[142.3px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[9.1px] h-[11.1px]">
                            4
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[183.1px] left-[275.3px] w-[105.9px] h-[38px] text-xl text-white">
            <div className="absolute top-[0px] left-[0px] w-[105.9px] h-[38px]">
              <div className="absolute top-[16.4px] left-[0px] tracking-[-0.15px] leading-[16.67px] uppercase font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                {t('TOTAL')}
              </div>
              <div className="absolute top-[1.9px] left-[67.9px] w-[36.2px] h-[36.2px] [transform:_rotate(-3deg)] [transform-origin:0_0] text-5xl">
                <div className="absolute top-[0px] left-[0px] w-[36.2px] h-[36.2px] [transform:_rotate(-3deg)] [transform-origin:0_0]">
                  <div className="absolute top-[0px] left-[0px] rounded-[2.78px] bg-crimson-200 w-[36.2px] h-[36.2px] [transform:_rotate(-3deg)] [transform-origin:0_0]" />
                  <b className="absolute top-[11.6px] left-[3.9px] tracking-[-0.15px] leading-[16.67px] flex items-center w-[30px] h-[14.2px] [transform:_rotate(-8deg)] [transform-origin:0_0]">
                    71
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScoreCard;
