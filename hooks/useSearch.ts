import { useContext } from "react"
import SearchContext from "@/context/context"

const useSearch = () => useContext(SearchContext)

export default useSearch
