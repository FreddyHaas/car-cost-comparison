import React from "react"
import style from "@/styles/Results.module.css"
import SearchFormContainer from "@/components/SearchForm/SearchFormContainer"
import fixVariantNaming from "@/functions/variantNaming"
import VariantDisplay from "./VariantDisplay"

interface Props {
    variantList: Array<{ [key: string]: any }>
    brand: string
    range: string
    variantPage: Boolean
}

function RangeVariantPage({ variantList, brand, range, variantPage }: Props) {
    const variantTables: JSX.Element[] = []

    // Sort list of variants by bodyType if it is a 'Range Page'
    if (!variantPage) {
        variantList.sort((a, b) => {
            if (a.models[0].bodyType > b.models[0].bodyType) {
                return -1
            }
            return 1
        })
    }

    const bodyTypeList: string[] = []

    variantList.forEach((variant) => {
        let bodyTypeHeader = false

        const bodyType = fixVariantNaming(variant.models[0].bodyType)

        if (!bodyTypeList.includes(bodyType)) {
            bodyTypeList.push(bodyType)
            bodyTypeHeader = true
        }

        variantTables.push(
            <VariantDisplay
                key={variant.name.variant}
                variant={variant}
                bodyTypeHeader={bodyTypeHeader}
                bodyTypeName={bodyType}
            />
        )
    })

    return (
        <section className={style.pageContainer}>
            <SearchFormContainer smallView />
            <div className={style.resultsDisplay}>
                <h1 className={style.header}>
                    {brand} {range}
                </h1>
                {variantPage ? null : (
                    <h2 className={style.subHeader}>Alle Varianten</h2>
                )}
                {variantTables}
            </div>
        </section>
    )
}

export default RangeVariantPage
