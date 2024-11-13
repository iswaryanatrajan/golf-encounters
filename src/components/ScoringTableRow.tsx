import { FunctionComponent, useState } from 'react';
import { singleTeamsContextStore } from '../contexts/teamContext';

const ScoringTableColumn = (props: {
    title: string;
    className: string;
    dir?: string;
}) => {
    return (
        <td
            className={` p-2 leading-[20px]  ${props.className}`}
            dir={props.dir}
        >
            {props.title}
        </td>
    );
};

interface ScoringTableRowProps {
    teamImageUrl: string;
    teamName: string;
    teamId?: any;
    background: string;
    teamBG: string;
    score1?: any;
    score2?: any;
    total?: any;
    rank?: any;
    netValue?: any;
    handicape?: any;
    handicapeTotal?: any;
    tab?: any
}

const ScoringTableRow: FunctionComponent<ScoringTableRowProps> = ({
    teamImageUrl,
    teamName,
    background,
    teamBG,
    score1,
    score2,
    total,
    rank,
    netValue,
    handicape,
    handicapeTotal,
    tab,
    teamId
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const { teams } = singleTeamsContextStore()

    return (
        <tr
            className={`h-[69px] font-medium text-black bg-[#e8f7f6] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] z-[-1]`}

        >
            <td className='cursor-pointer whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] '>
                <div
                    className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-black`}
                    style={{ backgroundColor: teamBG }}
                    onClick={toggleDropdown}

                >

                    {teamName}
                    <div className='absolute top-[50%] z-20 -right-[20px] -translate-y-2/4   h-[58px] w-[58px]  overflow-hidden   text-lg  leading-5 font-semibold'>
                        <img
                            className='w-full h-full object-cover rounded-[50%] '
                            alt=''
                            src={teamImageUrl}
                        />
                    </div>
                </div>
                <td>
                    <div className="relative z-[999]">

                        {isDropdownOpen && (
                            <div className="absolute top-10 left-[-166px] p-6  bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] border border-gray-300 p-2">
                                Team Members
                                {
                                    teams?.map((item: any) => {
                                        const checkTeam = item.id === teamId;
                                        if (checkTeam) {
                                            return item.members?.map((i: any) => (
                                                <p className='flex items-center gap-2' key={i.id}>
                                                    <img  src={i.imageUrl} className='w-8 h-8 rounded-full' alt="" />
                                                    {i.nickName}
                                                </p>
                                            ));
                                        }
                                        return null; 
                                    })
                                }



                            </div>
                        )}
                    </div>
                </td>
            </td>
            {
                score1?.map((s: any) => (
                    <ScoringTableColumn
                        title={`${s}`}
                        className='text-[18px] text-center font-medium border-solid border-l-[1px] border-white '
                    />
                ))
            }
            <td
                className={`text-white leading-[20px] text-[18px] text-center font-medium  box-border`}
            >
                <div className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  text-[18px] font-medium text-center text-black h-[60px] flex items-center justify-center'>
                    {score1?.reduce((acc: any, val: any) => acc + val, 0)}
                </div>
            </td>


            {
                score2?.map((s: any) => (
                    <ScoringTableColumn
                        title={`${s}`}
                        className='text-[18px] text-center font-medium border-solid border-l-[1px] border-white '
                    />
                ))
            }
            <td
                className={`text-white leading-[20px] text-[18px] text-center font-medium  box-border`}
            >
                <div className='bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  text-[18px] font-medium text-center text-black h-[60px] flex items-center justify-center'>
                    {score2?.reduce((acc: any, val: any) => acc + val, 0)}
                </div>
            </td>
            <td
                className={` p-2 leading-[20px] text-[18px] text-center font-medium border-solid border-l-[1px] border-white `}
            >
                {total}
            </td>
            <td
                className={` p-2 leading-[20px] text-[18px] text-center font-medium border-solid border-l-[1px] border-white `}
            >
                {netValue}
            </td>
            {
                tab == "hcp" &&

                <td
                    className={` p-2 leading-[20px] text-[18px] text-center font-medium border-solid border-l-[1px] border-white `}
                >
                    {handicape ? handicape : '0'}
                </td>
            }


            <td
                className={`leading-[20px] text-[18px]text-center font-medium  box-border rounded-s-[3px]`}
                dir='rtl'
            >
                <div className='  mx-auto rounded-md  w-20 h-[41px] border-solid border-[2px] border-[#585858] flex items-center justify-center'>
                    {rank}
                </div>
            </td>
        </tr>
    );
};
export default ScoringTableRow;
