import React from "react"
import style from "@/src/styles/Results.module.css"
import useSearch from "@/src/hooks/useSearch"
import SearchFormContainer from "@/src/components/SearchForm/SearchFormContainer"
import fixVariantNaming from "@/src/utils/variantNaming"
import RangeDisplay from "./RangeDisplay"

interface Props {
    variantList: Array<{ [key: string]: any }>
    brand: string
}

function BrandPage({ variantList, brand }: Props) {
    const { kilometers } = useSearch()
    const { months } = useSearch()

    // Sort cars by range
    const variantByRange: { [key: string]: any } = {}

    variantList.forEach((variant) => {
        const rangeName = variant.name.range
        let variantCosts: string | undefined
        if (variant.minCosts[months] === undefined) {
            variantCosts = undefined
        } else if (variant.minCosts[months][kilometers] === undefined) {
            variantCosts = undefined
        } else {
            variantCosts = variant.minCosts[months][kilometers]
        }

        variantByRange[rangeName] = variantByRange[rangeName] || []

        variantByRange[rangeName].push({
            name: variant.name.variant,
            costs: variantCosts,
            bodyType: fixVariantNaming(variant.models[0].bodyType),
        })
    })

    const rangeNames = Object.keys(variantByRange)

    const rangeDisplay: JSX.Element[] = []

    // Display results by range
    rangeNames.forEach((rangeName) => {
        rangeDisplay.push(
            <RangeDisplay
                key={rangeName}
                variantList={variantByRange[rangeName]}
                rangeName={rangeName}
                brand={brand}
            />
        )
    })

    return (
        <section className={style.pageContainer}>
            <SearchFormContainer smallView />
            <div className={style.resultsDisplay}>
                <h1 className={style.header}>{brand}</h1>
                <h2 className={style.subHeader}>Alle Modelle</h2>
                {rangeDisplay}
            </div>
        </section>
    )
}

export default BrandPage
