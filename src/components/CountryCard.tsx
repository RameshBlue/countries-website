import countriesStore, { CountriesData } from "../store/CountriesStore";

interface propTypes {
    countryData: CountriesData
}

function CountryCard(props: propTypes) {

    const countriesState = countriesStore(state => state);

    return (
        <div className='shadow-md rounded overflow-hidden bg-slate-50 dark:bg-slate-700 cursor-pointer' onClick={()=>{
            countriesState.setSelectedCountry(props.countryData.name);
        }}>
            <img src={props.countryData.flags.png} alt="flag" className='w-full aspect-video object-cover' />
            <div className='flex flex-col p-4'>
                <h3 className='font-bold text-sm mb-2 dark:text-white'>{props.countryData.name}</h3>
                <h4 className='font-semibold text-xs dark:text-white'>Population: {props.countryData.population.toLocaleString()}</h4>
                <h4 className='font-semibold text-xs dark:text-white'>Region: {props.countryData.region}</h4>
                <h4 className='font-semibold text-xs dark:text-white'>Capital: {props.countryData.capital}</h4>
            </div>
        </div>
    )
}

export default CountryCard