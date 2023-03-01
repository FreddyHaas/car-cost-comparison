import React, { useState } from "react"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import style from "@/src/styles/Results.module.css"
import VariantDisplay from "./VariantDisplay"

interface Props {
    variantList: Array<{ [key: string]: any }>
    rangeName: string
    brand: string
}

function RangeDisplay({ variantList, rangeName, brand }: Props) {
    // Fold and unfold display of variants
    const [displayVariants, setDisplayVariants] = useState(true)

    const toggleDisplay = () => {
        setDisplayVariants(!displayVariants)
    }

    // Sort variants by price
    variantList.sort((a, b) => {
        if (a.costs === undefined) {
            if (b.costs === undefined) {
                return 1
            }
            return -1
        }
        if (b.costs === undefined) {
            return 1
        }
        return parseInt(a.costs.cost, 10) - parseInt(b.costs.cost, 10)
    })

    return (
        <table className={style.table}>
            <caption>
                {rangeName}{" "}
                <MdOutlineArrowBackIosNew
                    className={
                        displayVariants
                            ? style.arrowIconUp
                            : style.arrowIconDown
                    }
                    onClick={toggleDisplay}
                />
            </caption>
            <VariantDisplay
                variantList={variantList}
                range={rangeName}
                brand={brand}
                displayNone={displayVariants}
            />
        </table>
    )
}

export default RangeDisplay
