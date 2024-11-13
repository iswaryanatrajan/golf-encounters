import { FunctionComponent, useMemo, type CSSProperties } from 'react';

type SearchInputType = {
    search?: string;

   
    stateDefaultWidth?: CSSProperties['width'];
    stateDefaultPosition?: CSSProperties['position'];
    stateDefaultTop?: CSSProperties['top'];
    stateDefaultLeft?: CSSProperties['left'];
    stateDefaultBorder?: CSSProperties['border'];
    stateDefaultHeight?: CSSProperties['height'];
    searchFontSize?: CSSProperties['fontSize'];
};

const StateDefault: FunctionComponent<SearchInputType> = ({
    search,
    stateDefaultPosition,
    stateDefaultTop,
    stateDefaultLeft,
    stateDefaultBorder,
    stateDefaultHeight,
    searchFontSize,
}) => {
    const stateDefaultStyle: CSSProperties = useMemo(() => {
        return {
            position: stateDefaultPosition,
            top: stateDefaultTop,
            left: stateDefaultLeft,
            border: stateDefaultBorder,
            height: stateDefaultHeight,
        };
    }, [
        stateDefaultPosition,
        stateDefaultTop,
        stateDefaultLeft,
        stateDefaultBorder,
        stateDefaultHeight,
    ]);

    const searchStyle: CSSProperties = useMemo(() => {
        return {
            fontSize: searchFontSize,
        };
    }, [searchFontSize]);

    return (
        <div className={`relative w-full md:w-[490px]`} >
            <input
                placeholder='Search player score here...'
                className={`' px-16 rounded-md w-full bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.06),_0px_0px_0px_1px_rgba(104,_113,_130,_0.16)] overflow-hidden  py-1.5  box-border text-left text-sm text-gray-300 font-body-b2'`}
                style={stateDefaultStyle}
            />
            <img
                className='absolute w-6 h-6 left-5 top-0 right-0 bottom-0 mx-2 my-auto'
                alt=''
                src='/img/search.svg'
            />

            <div></div>
        </div>
    );
};

export default StateDefault;
