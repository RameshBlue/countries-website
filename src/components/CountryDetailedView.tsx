import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import countriesStore from '../store/CountriesStore';

function CountryDetailedView() {

    const selectedCountry = countriesStore(state=> state.selectedCountry);
    const setSelectedCountryNull = countriesStore(state=> state.setSelectedCountryNull);

    function getCurrencyString() {

        let currenciesString = '';
        selectedCountry.currencies.forEach((currency) => {
            if (currenciesString !== "") {
                currenciesString += "," + currency.name;
            } else {
                currenciesString += currency.name;
            }
        })
        return currenciesString;
    }

    function getLanguageString() {

        let languageString = '';
        selectedCountry.languages.forEach((language) => {
            if (languageString !== "") {
                languageString += ", " + language.name;
            } else {
                languageString += language.name;
            }
        })
        return languageString;
    }

    return (
        <>
            <div className=' flex justify-center py-10'>
                <div className='flex flex-col justify-center px-3 max-w-[1320px] w-screen'>
                    <div className='flex w-min rounded shadow-md py-2 px-4 gap-2 items-center cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-slate-700 hover:dark:bg-slate-600' onClick={() => {
                        setSelectedCountryNull()
                    }}>
                        <div className='dark:text-slate-100'>
                            <HiOutlineArrowNarrowLeft />
                        </div>
                        <div className='font-semibold text-md select-none dark:text-slate-100'>Back</div>
                    </div>
                    <div className={`flex flex-col md:flex-row justify-between items-center gap-5 mt-16`}>
                        <img className='w-[60%] md:w-[40%] object-contain md:self-start' src={selectedCountry.flags?.png} alt="" />
                        <div className='flex flex-col justify-center w-[85%] md:w-[50%]'>

                            <div className='font-bold text-[35px] dark:text-slate-100'>
                                {selectedCountry.name}
                            </div>

                            <div className='flex justify-between mt-6 gap-3'>
                                <div className='flex flex-col gap-2'>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Native Name: <span className='font-normal '>{selectedCountry.nativeName}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Population: <span className='font-normal'>{selectedCountry.population.toString()}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Region: <span className='font-normal'>{selectedCountry.region}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Sub Region: <span className='font-normal'>{selectedCountry.subRegion}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Capital: <span className='font-normal'>{selectedCountry.capital}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Top Level Domain: <span className='font-normal'>{selectedCountry.topLevelDomain[0]}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Currencies: <span className='font-normal'>{getCurrencyString()}</span>
                                    </div>
                                    <div className='font-semibold text-md dark:text-slate-100'>
                                        Language: <span className='font-normal'>{getLanguageString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-5 mt-10'>
                                <div className='font-semibold text-md dark:text-slate-100'>
                                    Border Countries:
                                </div>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        selectedCountry.borders?.map((item, index) => {
                                            return (
                                                <div key={index} className='text-sm rounded shadow-md border-[1px] border-solid border-gray-400 dark:border-gray-700 px-4  dark:text-slate-100'>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryDetailedView