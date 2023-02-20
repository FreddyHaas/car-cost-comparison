import React from "react"
import style from "@/styles/Search.module.css"
import SearchFormModel from "./SearchFormModel"
import SearchOptions from "./SearchOptions"
import SearchFormCheap from "./SearchFormCheap"

interface Props {
    smallView: boolean
}

function SearchFormContainer({ smallView }: Props) {
    return (
        <div className={style.searchContainer}>
            <SearchOptions smallView={smallView} />
            <SearchFormModel smallView={smallView} />
            <SearchFormCheap smallView={smallView} />
        </div>
    )
}

export default SearchFormContainer
