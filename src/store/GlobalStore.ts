import create from "zustand";

interface GlobalState {
    region: string;
    searchText: string;
    setRegion: (region: string)=> void;
    setsearchText: (searchText: string)=> void;
}

const globalStore = create<GlobalState>(set => ({
    region: "All",
    searchText: "",
    setRegion: (region: string)=> {
        set({region: region})
    },
    setsearchText: (searchText: string)=>{
        set({searchText: searchText})
    }
}));

export default globalStore;