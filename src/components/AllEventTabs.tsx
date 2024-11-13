import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const AllEventTabs: FunctionComponent = () => {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <div className="absolute top-[423px] left-[103px] w-[1273px] h-[73px] text-left text-lg text-lightseagreen-200 font-poppins">
      <div className="absolute top-[0px] left-[6px] rounded-10xs bg-paleturquoise shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-[1267px] h-[72px]" />
      <div className="absolute top-[0px] left-[0px] w-[593px] h-[73px]">
        <div className="absolute top-[5px] left-[161px] w-[432px] h-[63px]">
          <div className="absolute top-[0px] left-[0px] w-[432px] h-[63px]">
            <div className="absolute top-[0px] left-[0px] w-[432px] h-[63px]">
              <div className="absolute top-[0px] left-[0px] w-[68px] h-[63px] text-white">
                <div className="absolute top-[0px] left-[0px] rounded bg-royalblue w-[68px] h-[63px]" />
                <div className="absolute top-[21px] left-[24px] leading-[20px]">
                <Link className="text-white no-underline" to="/event-main-page">All</Link>
                </div>
              </div>
              <div className="absolute top-[0px] left-[78px] w-28 h-[63px]">
                <div className="absolute top-[0px] left-[0px] rounded bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-28 h-[63px]" />
                <div className="absolute top-[21px] left-[39px] leading-[20px]">
                 <Link className="no-underline text-lightseagreen-200" to="/ongoing-event">LIVE</Link>
                </div>
              </div>
              <div className="absolute top-[0px] left-[199px] w-28 h-[63px]">
                <div className="absolute top-[0px] left-[0px] rounded bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-28 h-[63px]" />
                <div className="absolute  text-gray-600 hover:text-blue-500 no-underline top-[21px] left-[35px] leading-[20px]">
                 <Link className="no-underline text-lightseagreen-200" to="/"> PAST </Link>
                </div>
              </div>
              <div className="absolute top-[0px] left-[320px] w-28 h-[63px]">
              
                <div className="absolute top-[0px] left-[0px] rounded bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] w-28 h-[63px]" />
                <div className="absolute top-[21px] left-[7px] leading-[20px]">
                 <Link className="no-underline text-lightseagreen-200" to="/"> UPCOMING </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] w-[119px] h-[73px] text-white">
          <div className="absolute top-[0px] left-[0px] rounded-tl-10xs rounded-tr-none rounded-br-none rounded-bl-10xs bg-lightseagreen-200 shadow-[0px_0px_7px_rgba(0,_0,_0,_0.25)] w-[119px] h-[73px]" />
          <div className="absolute top-[26px] left-[21px] w-[76.1px] h-5">
            <div className="absolute top-[0px] left-[23.1px] leading-[20px]">
              {t('TOKYO')}
            </div>
            <img
              className="absolute h-[97.5%] w-[21.68%] top-[1.5%] right-[79.24%] bottom-[1%] left-[-0.92%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/group-1000009273.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventTabs;
