import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
interface HoverSideMenuProps {
    onItemClick: () => void;
  }
const HoverSideMenu: FunctionComponent <HoverSideMenuProps>= ({ onItemClick }) => {
  const {t} = useTranslation();
  return (
    <div className="w-[231px] h-[1246px] text-center text-xl text-white font-poppins">
      <div className="absolute top-[0px] left-[0px] w-[270px] h-[1246px]">
        <div className="absolute top-[0px] left-[0px] bg-lightseagreen-200 w-[270px] h-[1246px]" />
      </div>
      <div className="absolute h-[64.65%] w-[96.1%] top-[11.88%] right-[1.73%] bottom-[2
        3.48%] left-[2.16%]">
        <div className="absolute h-full w-[83.78%] top-[0%] right-[8.11%] bottom-[0%] left-[16px]">
          <div className="absolute h-[3.85%] w-[54.84%] top-[8%] right-[0] bottom-[0] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[0%] right-[72.55%] bottom-[9.68%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/vector.png"
            />
            <div className="absolute top-[1px] left-[42px]">{t('HOME')}</div>
          </div>
          <div className="absolute h-[3.72%] w-[84.41%] top-[20.8%] right-[15.59%] bottom-[85.47%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[0%] right-[82.17%] bottom-[0%] left-[0%] "
              alt=""
              src="/img/Notification.png"
            />
            <div className="absolute top-[0px] left-[42px]">{t('NOTIFICATIONS')}</div>
          </div>
          <div className="absolute h-[3.72%] w-[51.08%] top-[31.48%] right-[48.92%] bottom-[74.8%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[3.33%] right-[70.53%] bottom-[3.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/Post.png"
            />
            <div className="absolute top-[0px] left-[42px]">{t('POSTS')}</div>
          </div>
          <div className="absolute h-[3.72%] w-full top-[70.83%] right-[0%] bottom-[53.45%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[23.33%] right-[84.95%] bottom-[20.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/FindTeacher.png"
            />
            <div className="absolute top-[0px] left-[42px]">{t('FIND_TEACHER')}</div>
          </div>
          <div className="absolute h-[3.72%] w-[60.22%] top-[115.54%] right-[39.78%] bottom-[10.74%] left-[0%]">
            <img
              className="absolute first-line:h-[24px] w-[24px] top-[0%] right-[75%] bottom-[1.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/setting.png"
            />
            <div className="absolute top-[0px] left-[42px]">{t('SETTING')}</div>
          </div>
          <div className="absolute h-[3.79%] w-[62.37%] top-[130.21%] right-[37.63%] bottom-[0%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[3.28%] right-[75.86%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/logout.png"
            />
            <div className="absolute top-[0px] left-[42px]">{t('LOGOUT')}</div>
          </div>
          <div className="absolute top-[300px] left-[0px] w-[103px] h-[30px]">
            <div className="absolute top-[0px] left-[42px] w-[61px] h-[30px]">
              <div className="absolute top-[0px] left-[0px]">{t('PROFILE')}</div>
            </div>
            <img
              className="absolute h-[24px] w-[24px] top-[6.67%] right-[76.7%] bottom-[13.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/profile.png"
            />
          </div>
        </div>
        <div className="absolute top-[220px] left-[0px] w-[222px] h-[60px] text-lightseagreen-200">
          <div className="absolute top-[0px] left-[0px] w-[222px] h-[60px]">
            <div className="absolute top-[0px] left-[0px] rounded-10xs bg-white w-[222px] h-[60px]" />
            <div className="absolute top-[15px] left-[18px] w-[107px] h-[30px]">
              <div className="absolute top-[0px] left-[42px]">{t('EVENT')}</div>
              <img
                className="absolute h-4/5 w-[22.43%] top-[3.33%] right-[77.57%] bottom-[16.67%] left-[0%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/img/Event.png"
              />
            </div>
          </div>
          <img
            className="absolute h-[15%] w-[6.58%] top-[41.67%] right-[17.75%] bottom-[43.33%] left-[75.68%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/img/vector9.svg"
          />
        </div>
        <div className="absolute h-[3.72%] w-[81.35%] top-[100.51%] right-[10.54%] bottom-[42.77%] left-[16px]">
          <div className="absolute h-full w-[75.3%] top-[0%] right-[24.7%] bottom-[0%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[3.33%] right-[79.41%] bottom-[3.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/Calender.png"
            />
            <div className="absolute top-[0px] left-[42px]">Calendar</div>
          </div>
          <img
            className="absolute h-[30%] w-[8.08%] top-[33.33%] right-[0%] bottom-[36.67%] left-[91.92%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/img/vector11.svg"
          />
        </div>
        <div className="absolute h-[3.72%] w-[81.35%] top-[84.86%] right-[10.54%] bottom-[21.42%] left-[16px]">
          <div className="absolute h-full w-[73.09%] top-[0%] right-[26.91%] bottom-[0%] left-[0%]">
            <img
              className="absolute h-[24px] w-[24px] top-[10%] right-[78.79%] bottom-[12.33%] left-[0%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/message.png"
            />
            <div className="absolute top-[0px] left-[42px]">Message</div>
          </div>
          <img
            className="absolute h-[30%] w-[8.08%] top-[33.33%] right-[0%] bottom-[36.67%] left-[91.92%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/img/Arrow.png"
          />
        </div>
      </div>
      <img
        className="absolute top-[30px] left-[78px] rounded w-[75px] h-[72px] object-cover"
        alt=""
        src="/img/logo.png"
        onClick={onItemClick}
      />
    </div>
  );
};

export default HoverSideMenu;