import create from "zustand";
import globalStore from "./GlobalStore";

export interface CountriesData{
    name: string
    nativeName: string
    population: number
    region: string
    subRegion: string
    capital: string
    flags: {
        png: string,
        svg: string 
    }
    borders: string[]
    topLevelDomain: string[]
    currencies: Name[]
    languages: Name[]
}

interface Name{
    name: string
}

export interface CountriesState{
    countries: CountriesData[]
    selectedCountry: CountriesData,
    loading: boolean,
    setCountries : (region: string, searchText: string) => void,
    clearCountries: ()=> void,
    setSelectedCountry : (countryName: string)=> void,
    setSelectedCountryNull: ()=> void
}

const countriesStore = create<CountriesState>(set => ({
    countries: [],
    selectedCountry : null,
    loading: false,

    setCountries: async (region: string, searchText: string)=>{
        set({loading: true});
        const res = await fetch("https://restcountries.com/v2/all");
        let data: CountriesData[] = await res.json();

        if (region !== 'All') {
            console.log(region);
            data = data.filter((country) => {
                return region === country.region;
            })
        }
    
        if (searchText !== "") {
            console.log(searchText);
            data = data.filter((country) => {
                return country.name?.toLowerCase().includes(searchText.toLowerCase());
            })
        }
        set({loading: false});
        set({countries : data});
    },

    clearCountries: ()=>{
        set({countries: []});
    },

    setSelectedCountry: async (countryName: string)=>{
        set({loading: true});
        const res = await fetch("https://restcountries.com/v2/all");
        let allCountries: CountriesData[] = await res.json();
        let country: CountriesData = null;
    
        allCountries.forEach((item) => {
            if (item.name === countryName) {
                country = item;
                return;
            }
        })
        set({loading: false});
        set({selectedCountry: country});
    },

    setSelectedCountryNull: ()=>{
        set({selectedCountry: null});
    }

}));

export default countriesStore;