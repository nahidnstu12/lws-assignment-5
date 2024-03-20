import { createContext } from "react";
import { useContext } from "react";
import SearchComponent from "../components/SearchComponent";
import { useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [isOpenSearch, setIsOpenSearch] = useState("");
    
   

    return (
      <SearchContext.Provider value={{ isOpenSearch, setIsOpenSearch }}>
        {children}
      </SearchContext.Provider>
    );
}

export const useSearch = () => {

    return useContext(SearchContext);
}

export default SearchProvider;