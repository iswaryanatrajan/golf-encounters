import { useNavigate } from "react-router-dom";

const IndiviualPlayerTableRow = ({item, type}: any) => {
  const router = useNavigate();
  return (
    
    <div className="mt-12 height flex relative items-center gap-3 box-border p-3 rounded-10xs  bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] py-10" onClick={() => router('/user-page/'+item?.userId)}>
      <div className="basis-1/2 min-w-[120px] ">
        <div className="absolute top-[-10px] w-[99px] h-32 left-[0px] border-solid border-[#17b3a6] border-2 rounded-md">
          <img
            className="object-cover w-full h-full  rounded-8xs "
            alt=""
            src={item?.userScoreCard.imageUrl}
          />
          
        </div>
      </div>
      <div className="flex gap-3 items-center basis-1/2 ">
        
        <div>{item?.userScoreCard.nickName}</div>
      </div>
      <div className="basis-1/2 min-w-[111px]">Team {item?.teamId}</div>
      <div className="basis-1/3 text-center leading-[9.22px] text-2xl font-bold text-seagreen-100">
        {type == 'driverContest' ? item?.driverContest : item?.nearPinContest} yard
      </div>
    </div>
  );
};
export default IndiviualPlayerTableRow;
