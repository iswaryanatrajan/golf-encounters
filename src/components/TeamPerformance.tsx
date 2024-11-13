import { FunctionComponent } from 'react';
import Player from './Player';
import { useTranslation } from 'react-i18next';

interface TeamPerformanceProps {
    title: string;
}

const TeamPerformance: FunctionComponent<TeamPerformanceProps> = ({
    title,
}) => {
    const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
    return (
        <div className='mt-20 mx-5 md:mx-[0px]'>
            <div className='flex overflow-hidden'>
                <img
                    className='rounded-[50%] w-[71px] h-[71px] object-cover'
                    alt=''
                    src='/img/ellipse-2300@2x.png'
                />
                <b className='relative left-[-24px] top-[35px] text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]'>
                    {title}
                </b>
                <img
                    className='w-[57px] h-[103px] object-cover'
                    alt=''
                    src='/img/rectangle-1248@2x.png'
                />
            </div>
            <div className='text-13xl font-semibold  text-seagreen-100 [text-shadow:0px_6px_4px_rgba(0,_0,_0,_0.25)]'>
                {t('TEAM_PERFOMANCE')}
            </div>

            <div className='px-3 overflow-x-auto'>
                <table className='w-full border-spacing-y-5 '>
                    <thead className='text-left text-whitesmoke-100'>
                        <tr className='shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-lightseagreen-200  h-[55px] text-xl '>
                            <th className='pl-4 py-3 whitespace-nowrap rounded-s-[3px]  leading-[10.25px] font-medium '>
                            {t('TEAM_NAME')}
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('PLAYER')}1
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('PLAYER')}2
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('PLAYER')}3
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('PLAYER')}4
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('PLAYER')}5
                            </th>
                            <th className='pl-4 py-3  leading-[10.25px] font-medium'>
                            {t('TOTAL')}
                            </th>
                            <th
                                className='pl-4 py-3 rounded-s-[3px]  leading-[10.25px] font-medium'
                                dir='rtl'
                            >
                                {t('POSITION')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-[#fbfbfb] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  h-[69px]   font-medium'>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                Apple Mac
                            </td>
                            <td className='py-4 pl-4 whitespace-nowrap'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px] '>
                                17
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                1st
                            </td>
                        </tr>
                        <tr className='bg-[#fbfbfb] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[69px]   font-medium'>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                Apple Mac
                            </td>
                            <td className='py-4 pl-4 whitespace-nowrap'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px] '>
                                17
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                1st
                            </td>
                        </tr>
                        <tr className='bg-[#fbfbfb] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  h-[69px]   font-medium'>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                Apple Mac
                            </td>
                            <td className='py-4 pl-4 whitespace-nowrap'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px] '>
                                17
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                1st
                            </td>
                        </tr>
                        <tr className='bg-[#fbfbfb] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]  h-[69px]   font-medium'>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                Apple Mac
                            </td>
                            <td className='py-4 pl-4 whitespace-nowrap'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4 '>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='py-4 pl-4'>
                                {' '}
                                <Player showNumber={true}  name='babu' />
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px] '>
                                17
                            </td>
                            <td className='pl-4 py-4 tracking-[1.45px] leading-[9.22px]'>
                                1st
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamPerformance;
