import { useContext } from "react"
import SearchContext from "@/src/context/context"

const useSearch = () => useContext(SearchContext)

export default useSearch
