import { FunctionComponent, useState } from "react";
import SliderBack from "./SliderBack";
import FullScore from "./FullScore";
import { useScoreContext } from "../contexts/scoreContext";

const Slider: FunctionComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullScore, setShowFullScore] = useState(false);
  const { score } = useScoreContext()

  // const slidesData = [
  //   {
  //     position: "POS",
  //     value: "1st",
  //     driver: "John",
  //     Drivers: "Robert",
  //     name: "RoryMcIlroy",
  //     TotalPar: "70",
  //     TotalScore: "78",
  //     image: "/img/ellipse-11@2x.png",
  //   },
  //   {
  //     position: "POS",
  //     value: "2nd",
  //     driver: "Robert",
  //     Drivers: "Jhon",
  //     name: "ArleneMcCoy",
  //     TotalPar: "70",
  //     TotalScore: "74",
  //     image: "/img/ellipse-14@2x.png",
  //   },
  //   {
  //     position: "POS",
  //     value: "3nd",
  //     driver: "Alex",
  //     Drivers: "Robin",
  //     name: "KathrynMurphy",
  //     TotalPar: "70",
  //     TotalScore: "72",
  //     image: "/img/ellipse-13@2x.png",
  //   },
  // ];

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + score?.length) % score?.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % score?.length);
  };


  return (
    <div className=" text-black font-poppins  animate__animated animate__backInUp">
      <SliderBack />
      <SliderBack groupDivLeft="0px" />
      
  
      <div className="absolute top-[0px] left-[278px] w-[638px] h-[404px] text-xl">
        <div className="absolute top-[0px] left-[2px] w-[634.5px] h-[404px]">
          <div className="absolute top-[-4px] left-[-2.7px] w-[639.9px] h-[412px]">
       {score?.map((item:any)=>{
          return <>
          
          <div className="absolute top-[19px] left-[29px] w-[576px] h-[367px]">
     
    
              <div className="absolute top-[0px] left-[0px] w-[576px] h-[367px]">
                <div>
                  <img
                    className="absolute top-[-10px] left-[-8.7px] rounded-3xs w-[593.4px] h-[387px] transition duration-300 transform hover:scale-105"
                    alt=""
                    src="/img/rectangle-101.svg"
                  />
                </div>
                <div className="absolute top-[53px] left-[51px] w-[144.5px] h-[42px] font-body-b2">
                  <img
                    className="absolute top-[-4px] left-[-4px] w-[152.5px] h-[50px]"
                    alt=""
                    src="/img/rectangle-51.svg"
                  />
                  <div className="absolute top-[12px] left-[26px] tracking-[-0.17px] leading-[18px]">
                    <span className="ml-[-10px]">Event Id: {`${item?.eventId}`}</span>
                  </div>
                </div>
                <b className="absolute top-[119px] left-[61px] tracking-[-0.17px] leading-[18px] text-gray1-200">
                  HandiCap Value: {item?.handiCapValue}
                </b>
                <b className="absolute top-[159px] left-[61px] tracking-[-0.17px] leading-[18px] text-gray1-200">
                  Drivers: {item?.Drivers}
                </b>
                <div className="absolute top-[202.2px] left-[60.4px] ">
                  <b className="absolute top-[5.4px] left-[0px]  leading-[12.2px] inline-block ">
                    Name:
                  </b>
                  <div className="absolute top-[10.4px] left-[132.4px] tracking-[-0.17px]  leading-[12.2px] font-semibold text-lightseagreen-100">
                    {item?.userId}
                  </div>
                  <img
                    className="absolute top-[-10px] left-[75.4px] rounded-[50%] w-[50.9px] h-[50px] object-cover"
                    alt=""
                    src={score?.image}
                  />
                </div>
                <div className="absolute top-[276.2px] left-[59px] w-[140.3px] h-[33.9px] text-darkslategray-500">
                  <div className="absolute top-[0px] left-[0px] w-[140.3px] h-[33.9px]">
                    <div className="absolute top-[0px] left-[0px] w-[140.3px] h-[33.9px]">
                      <b className="absolute top-[15.8px] left-[0px]  leading-[12.2px] inline-block w-[87.6px]">
                        TotalPar:
                      </b>
                      <div className="absolute top-[0px] left-[102.5px] w-[37.8px] h-[33.9px] text-[27.11px] text-white">
                        <div className="absolute top-[0px] left-[0px] w-[37.8px] h-[33.9px]">
                          <div className="absolute top-[0px] left-[0px] w-[37.8px] h-[33.9px]">
                            <div className="absolute top-[0px] left-[0px] rounded-[3.39px] bg-firebrick-200 shadow-[0px_0px_2.71px_rgba(0,_0,_0,_0.25)] w-[50.8px] h-[50.9px]" />
                            <b className="absolute top-[20.8px] left-[10.4px]  leading-[12.2px] inline-block w-[46.9px]">
                              {score?.totalScore}
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative cursor-pointer group top-[50.9px] left-[278px] w-[231px] h-[124.9px] text-[7.89px] text-white font-body-b2 "  onMouseEnter={() => setShowFullScore(true)}
                      onMouseLeave={() => setShowFullScore(false)}>
                  {showFullScore && (
                    <div className="absolute top-[-70px] left-[-228.7px] rounded-3xs w-[493.4px] h-[387px] opacity-100 transition duration-300 transform hover:scale-105 z-10">
                      <FullScore />
                    </div>
                  )}
                  <div className="absolute top-[0px] left-[0px] w-[230px] h-[124.9px]" >
                    <div className="absolute top-[0px] left-[0px]  rounded-[2.96px] [background:linear-gradient(180deg,_#2168f8,_#3c5099_37.5%,_#404144)] w-[230px] h-[124.9px]"
                    />
                    <img
                      
                      className="absolute top-[0px] left-[0px] w-[98.9px] h-[124.9px] object-cover"
                      alt=""
                      src="/img/rectangle-531@2x.png"
                    />
                    <div className="absolute top-[16.6px] left-[105.1px] text-[9.86px] tracking-[-0.05px] leading-[5.91px] uppercase font-semibold text-darkturquoise-200 [-webkit-text-stroke:0.3px_#00eafe] [transform:_rotate(-6.95deg)] [transform-origin:0_0]">
                      Sarut Vongchaisit
                    </div>
                    <div className="absolute top-[28.2px] left-[104.5px] w-[119.3px] h-[10.5px] [transform:_rotate(-4deg)] [transform-origin:0_0] text-[5.26px] text-black">
                      <div className="absolute top-[0px] left-[0px] rounded-[1.64px] bg-white w-[119.3px] h-[10.5px] [transform:_rotate(-4deg)] [transform-origin:0_0]" />
                      <div className="absolute top-[2px] left-[5.1px]w-[3px] h-1.5 [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                          1
                        </div>
                      </div>
                      <div className="absolute top-[-0.9px] left-[45.4px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-1.6px] left-[55.9px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        5
                      </div>
                      <div className="absolute top-[-2.6px] left-[70.6px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        6
                      </div>
                      <div className="absolute top-[-3.6px] left-[84.4px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        7
                      </div>
                      <div className="absolute top-[-4.5px] left-[96.9px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        8
                      </div>
                      <div className="absolute top-[-5.5px] left-[111.3px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        9
                      </div>
                      <div className="absolute top-[1.1px] left-[16.6px] w-1 h-1.5 [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                          2
                        </div>
                      </div>
                      <div className="absolute top-[0.1px] left-[31.3px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        3
                      </div>
                    </div>
                    <div className="absolute top-[58.9px] left-[104.5px] w-[119.3px] h-[10.5px] [transform:_rotate(-4deg)] [transform-origin:0_0] text-[5.26px] text-black">
                      <div className="absolute top-[0px] left-[0px] rounded-[1.64px] bg-white w-[119.3px] h-[10.5px] [transform:_rotate(-4deg)] [transform-origin:0_0]" />
                      <div className="absolute top-[2px] left-[5.1px] w-1.5 h-1.5 [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                          10
                        </div>
                      </div>
                      <div className="absolute top-[-0.9px] left-[45.4px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        13
                      </div>
                      <div className="absolute top-[-1.6px] left-[55.9px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        14
                      </div>
                      <div className="absolute top-[-2.6px] left-[70.6px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        15
                      </div>
                      <div className="absolute top-[-3.6px] left-[84.4px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        16
                      </div>
                      <div className="absolute top-[-4.5px] left-[96.9px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        17
                      </div>
                      <div className="absolute top-[-5.5px] left-[111.3px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        18
                      </div>
                      <div className="absolute top-[1.1px] left-[16.6px] w-[5px] h-1.5 [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        <div className="absolute top-[0px] left-[0px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                          11
                        </div>
                      </div>
                      <div className="absolute top-[0.1px] left-[31.3px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-4deg)] [transform-origin:0_0]">
                        12
                      </div>
                    </div>
                    <div className="absolute top-[43.4px] left-[109.4px] w-[113.4px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                      <div className="absolute top-[1.3px] left-[0.1px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-2.5px] left-[43.3px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-4.5px] left-[66.9px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-3.5px] left-[55.1px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        5
                      </div>
                      <div className="absolute top-[-7px] left-[95.4px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        3
                      </div>
                      <div className="absolute top-[-8.1px] left-[107.2px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-1px] left-[11.8px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0px] left-[0px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] border-[0.3px] border-solid border-white" />
                              <div className="absolute top-[1.2px] left-[1.8px] tracking-[-0.05px] leading-[5.91px] font-semibold flex items-center w-[4.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                4
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[-2.3px] left-[26.5px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] rounded-[0.66px] box-border w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] border-[0.3px] border-solid border-white" />
                          <div className="absolute top-[1.1px] left-[2.7px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            4
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[-6.9px] left-[78.6px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0px] left-[0px] rounded-[0.66px] box-border w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] border-[0.3px] border-solid border-white" />
                            <div className="absolute top-[1.1px] left-[2.7px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                              5
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[73.6px] left-[109.1px] w-[113.2px] h-[8.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                      <div className="absolute top-[1.9px] left-[0.2px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        5
                      </div>
                      <div className="absolute top-[-1.9px] left-[37.8px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        3
                      </div>
                      <div className="absolute top-[-2.9px] left-[50.7px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        4
                      </div>
                      <div className="absolute top-[-6.4px] left-[91.7px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        3
                      </div>
                      <div className="absolute top-[-1px] left-[11.8px] w-[101.3px] h-[8.9px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[101.3px] h-[8.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[101.3px] h-[8.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0px] left-[0px] w-[101.3px] h-[8.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                              <div className="absolute top-[0.6px] left-[0.1px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                <div className="absolute top-[0px] left-[0px] rounded-[50%] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]" />
                                <div className="absolute top-[1.2px] left-[1px] tracking-[-0.05px] leading-[5.91px] font-semibold flex items-center w-[4.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                  4
                                </div>
                              </div>
                              <div className="absolute top-[-3.8px] left-[51.7px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] border-[0.3px] border-solid border-white" />
                                <div className="absolute top-[1.2px] left-[1.8px] tracking-[-0.05px] leading-[5.91px] font-semibold flex items-center w-[4.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                  4
                                </div>
                              </div>
                              <div className="absolute top-[-8.1px] left-[92.8px] w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-[8.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] border-[0.3px] border-solid border-white" />
                                <div className="absolute top-[1.2px] left-[1.8px] tracking-[-0.05px] leading-[5.91px] font-semibold flex items-center w-[4.9px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                                  3
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[-1.6px] left-[25.3px] w-[11.5px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[11.5px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[11.5px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            <div className="absolute top-[-0.1px] left-[1.3px] rounded-[0.66px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]" />
                            <div className="absolute top-[1px] left-[0.1px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                              4
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-[-6.3px] left-[78.6px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0] text-[7.23px]">
                        <div className="absolute top-[0px] left-[0px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]">
                            <div className="absolute top-[0px] left-[0px] rounded-[0.66px] w-[10.2px] h-[8.2px] [transform:_rotate(-5deg)] [transform-origin:0_0]" />
                            <div className="absolute top-[1.1px] left-[0.6px] tracking-[-0.05px] leading-[5.91px] font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                              4
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[83.1px] left-[138.3px] w-[51.9px] h-[20.7px]">
                      <div className="absolute top-[8.7px] left-[0px] tracking-[-0.05px] leading-[5.91px] uppercase font-semibold [transform:_rotate(-5deg)] [transform-origin:0_0]">
                        Total
                      </div>
                      <div className="absolute top-[1px] left-[31.2px] w-[19.7px] h-[19.7px] [transform:_rotate(-3deg)] [transform-origin:0_0] text-[11.83px]">
                        <div className="absolute top-[0px] left-[0px] w-[19.7px] h-[19.7px] [transform:_rotate(-3deg)] [transform-origin:0_0]">
                          <div className="absolute top-[0px] left-[0px] rounded-[0.99px] bg-crimson-200 w-[19.7px] h-[19.7px] [transform:_rotate(-3deg)] [transform-origin:0_0]" />
                          <b className="absolute top-[7.2px] left-[3.6px] tracking-[-0.05px] leading-[5.91px] [transform:_rotate(-8deg)] [transform-origin:0_0]">
                            71
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[100.9px] left-[98px] w-[231px] h-[124.9px] text-[7.89px] text-white font-body-b2">
              <div className="absolute top-[189.1px] left-[201px] w-[140.3px] h-[33.9px] text-darkslategray-500">
                <div className="absolute top-[10.8px] left-[0px] w-[91.6px] h-[13px]">
                  <b className=" text-xl absolute top-[10px] left-[0px]  leading-[12.2px] inline-block w-[101.6px]">
                    Net Value:
                  </b>
                </div>
                <div className="absolute top-[0px] left-[102.5px] w-[37.8px] h-[33.9px] text-[27.11px] text-white">
                  <div className="absolute top-[0px] left-[0px] rounded-[3.39px] bg-lightseagreen-200 shadow-[0px_0px_2.71px_rgba(0,_0,_0,_0.25)] w-[50.8px] h-[50.9px]" />
                  <b className="absolute top-[20.8px] left-[6.3px]  leading-[12.2px] inline-block w-[34.8px]">
                    {item.netValue}
                  </b>
                </div>
              </div>
            </div>
          </>
        })}
          </div>

        </div>
        <img
          style={{ cursor: "pointer" }}
          onClick={prevSlide}
          className="absolute top-[150px] left-[10.7px] w-[70px] h-[70px]"
          alt=""
          src="/img/Prev.png"
        />
        <img
          style={{ cursor: "pointer" }}
          onClick={nextSlide}
          className="absolute top-[150px] right-[10px] w-[70px] h-[70px]"
          alt=""
          src="/img/Next.png"
        />
      </div>
      
    </div>
  );
};

export default Slider;
