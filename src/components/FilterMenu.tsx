import { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import countriesStore from '../store/CountriesStore';
import globalStore from '../store/GlobalStore';

const CountriesData = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']

function FilterMenu() {

    const [toggleFilterMenu, setToggleFilterMenu] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const globals = globalStore(state => state);
    const countriesState = countriesStore(state => state);

    return (
        <div className='flex items-center justify-between w-[90%] sm:w-[180px] rounded shadow-md bg-slate-50 dark:bg-slate-700 text-center font-semibold p-3 cursor-pointer relative select-none' onClick={() => {
            setToggleFilterMenu(!toggleFilterMenu);
        }}>
            <div className='dark:text-slate-100'>Filter</div>
            <div className='rotate-90 dark:text-slate-100'>
                <IoIosArrowForward />
            </div>
            <div className={` ${toggleFilterMenu ? 'flex' : 'hidden'} flex-col w-full absolute left-0 top-16 bg-slate-50 dark:bg-slate-700 rounded shadow-md text-left`}>
                {
                    CountriesData.map((item, index) => (
                        <h6 key={index} className={`font-semibold m-0 px-4 py-2 dark:text-slate-100 ${currentIndex === index && 'bg-gray-300 dark:bg-gray-600'} ${currentIndex === index ? 'hover:bg-gray-300 hover:dark:bg-gray-600' : 'hover:bg-gray-100 hover:dark:bg-gray-600'}`} onClick={() => {
                            if (item === "America") {
                                item = "Americas";
                            } 
                            globals.setRegion(item);
                            countriesState.clearCountries();
                            setCurrentIndex(index);
                            countriesState.setCountries(item, globals.searchText);
                        }}>{item}</h6>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterMenu