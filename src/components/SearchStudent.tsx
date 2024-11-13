import { useState } from 'react';
import { useTranslation } from "react-i18next";
const SearchAndFiltersStudent: React.FC = () => {
    const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
    const [search, setSearch] = useState(['Rating']);
     const searchHandler = (value: string) => {
        if (search.includes(value)) {
            let items = search.filter((data) => data != value);
            setSearch(items);
            return;
        }
        let addSearchitem = [...search];
        addSearchitem.push(value);
        setSearch(addSearchitem);
    };
    return (
        <>
            <p className=' text-[21.59px] leading-[25.76px] tracking-wide font-bold'>
            {t('FIND_YOUR_ACTIVTIES')}
            </p>
            <div className='flex flex-col items-center justify-between md:flex-row'>
                <div className='relative w-full h-[44.08px] md:w-[204.64px] md:h-[24.08px] '>
                    <input
                        placeholder='search'
                        className='px-2 w-full h-full rounded-md py-1.5  box-border text-sm text-gray-300 border-solid border-[0.42px] border-[#CDCDCD]'
                    />
                    <img
                        className='absolute top-0 bottom-0 right-0 w-2 h-2 mx-2 my-auto'
                        alt=''
                        src='/img/search.svg'
                    />
                </div>
                <div className='flex flex-row items-center'>
                    <p className='text-[12px] font-bold'>Filter By:</p>

                    <div className='flex items-center justify-center gap-x-0'>
                        {['Location', 'Availibilty',].map(
                            (title, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`flex justify-center  p-2 ml-2 rounded-md font-normal text-xs cursor-pointer ${
                                            search.includes(title)
                                                ? 'bg-[#A8FFC2]'
                                                : 'bg-[#D9D9D966]'
                                        } text-xs text-black shadow-sm`}
                                        onClick={() => {
                                            searchHandler(title);
                                        }}
                                    >  
                                        {t(title.toLocaleUpperCase())}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchAndFiltersStudent;