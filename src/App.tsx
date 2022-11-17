import React, { useState,useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaSun, FaMoon } from 'react-icons/fa'
import CountryCard from './components/CountryCard';
import CountryDetailedView from './components/CountryDetailedView';
import FilterMenu from './components/FilterMenu';
import countriesStore from './store/CountriesStore';
import globalStore from './store/GlobalStore';

let fetchTimeout: NodeJS.Timeout = null;

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const globals = globalStore(state=> state);
  const countriesState = countriesStore(state=> state);

  useEffect(() => {
    countriesState.setCountries(globals.region, globals.searchText);
    localStorage.theme = 'light';
    handleDarkMode();
  }, [])

  const handleDarkMode = () => {
    if (localStorage.theme === 'dark' ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    globals.setsearchText(evt.target.value);

    if (fetchTimeout !== undefined) {
      clearTimeout(fetchTimeout);
    }
    fetchTimeout = setTimeout(() => {
      countriesState.setCountries(globals.region, evt.target.value);
    }, 300);
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 min-h-screen relative">

      <header className='flex py-4 bg-slate-50 dark:bg-slate-700 shadow-md justify-center items-center'>
        <div className='flex max-w-[1320px] w-screen px-3 justify-between items-center'>
          <h1 className='text-lg sm:text-2xl font-bold dark:text-white'>Where in the world?</h1>
          <div className='flex items-center'>
            <div className='p-2'>
              {
                isDarkMode ? <FaMoon className='text-xl text-white cursor-pointer' onClick={() => {
                  localStorage.theme = 'light';
                  handleDarkMode();
                  setIsDarkMode(false);
                }} /> : <FaSun className='text-xl cursor-pointer' onClick={() => {
                  localStorage.theme = 'dark'
                  handleDarkMode();
                  setIsDarkMode(true);
                }} />
              }
            </div>
            <h5 className='xs:hidden sm:block font-semibold select-none m-0 dark:text-white'>Dark Mode</h5>
          </div>
        </div>
      </header>

      {
        countriesState.selectedCountry == null ?

          <>
            < div className='flex items-center justify-center py-10'>
              <div className='flex flex-col sm:flex-row items-center justify-between px-3 max-w-[1320px] w-screen gap-3 sm:gap-5'>
                <div className='flex items-center w-[90%] sm:w-96 bg-slate-50 dark:bg-slate-700 p-3 rounded shadow-md'>
                  <AiOutlineSearch className='text-xl text-gray-500 dark:text-slate-100' />
                  <input className='outline-none ml-2 flex-1 bg-slate-50 dark:bg-slate-700 placeholder:dark:text-slate-100 dark:text-slate-100' type="text" placeholder='Search for a country...' value={globals.searchText} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    handleSearchChange(evt);
                  }} />
                </div>
                <FilterMenu />
              </div>
            </div>

            <div className={`${countriesState.loading && 'hidden'} flex items-center justify-center py-10`}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-3 max-w-[1320px] w-screen'>
                {
                  countriesState.countries.map((item, index) => {
                    return (
                      <CountryCard key={index} countryData={item} />
                    )
                  })
                }
              </div>
            </div>
          </>
          :
          <CountryDetailedView />
      }

      {/* loading bar */}
      <div className={`${!countriesState.loading && 'hidden'} absolute left-2/4 top-2/4 w-16 h-16 rounded-full border-gray-300 border-[6px] border-t-blue-400 animate-spin`}></div>

    </div >
  );
}

export default App;
