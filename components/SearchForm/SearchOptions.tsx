import React from "react"
import style from "@/styles/Search.module.css"
import useSearch from "@/hooks/useSearch"

interface Props {
    smallView: boolean
}

function SearchOptions({ smallView }: Props) {
    const { searchByModel, setSearchByModel } = useSearch()

    if (smallView) {
        return null
    }

    return (
        <div className={style.searchOptions}>
            <button
                type="button"
                onClick={() => setSearchByModel(true)}
                className={style.searchSelector}
                id={searchByModel ? style.selectedSearch : undefined}
            >
                Autosuche
            </button>
            <button
                type="button"
                onClick={() => setSearchByModel(false)}
                className={style.searchSelector}
                id={searchByModel ? undefined : style.selectedSearch}
            >
                Günstige Autos
            </button>
        </div>
    )
}

export default SearchOptions
