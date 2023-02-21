import React, { useState } from "react"
import { FaInfoCircle } from "react-icons/fa"
import style from "@/styles/Results.module.css"
import InfoTextField from "@/components/Overarching/InfoTextField"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import Link from "next/link"
import CostScore from "../CostScore"

interface Props {
    variantList: Array<{ [key: string]: any }>
    displayNone: boolean
    brand: string
    range: string
}

function VariantDisplay({ variantList, displayNone, brand, range }: Props) {
    // Control info fields
    const [scoreInfoActive, setScoreInfoActive] = useState(false)

    const toggleScoreInfoActive = () => {
        setScoreInfoActive(!scoreInfoActive)
    }

    const [costInfoActive, setCostInfoActive] = useState(false)

    const toggleCostInfoActive = () => {
        setCostInfoActive(!costInfoActive)
    }

    // Display nothing if arrow was clicked to hide variants
    if (!displayNone) {
        return null
    }

    // Display variants in table
    const variants: JSX.Element[] = []

    variantList.forEach((variant) => {
        const rangeSlug = range.replaceAll("/", "_") // Avoids errors in URL due to slashes

        variants.push(
            <tr key={variant.name} className={style.tableRow}>
                <td>
                    <Link href={`/${brand}/${rangeSlug}/${variant.name}`}>
                        {variant.name}
                    </Link>
                </td>
                <td className={style.bodyType}>
                    <Link href={`/${brand}/${rangeSlug}/${variant.name}`}>
                        {variant.bodyType}
                    </Link>
                </td>
                <td>
                    <Link href={`/${brand}/${rangeSlug}/${variant.name}`}>
                        {variant.costs === undefined ||
                        variant.costs.costScore === null ? (
                            "n/a"
                        ) : (
                            <CostScore costScore={variant.costs.costScore} />
                        )}
                    </Link>
                </td>
                <td>
                    <Link href={`/${brand}/${rangeSlug}/${variant.name}`}>
                        <div className={style.prices}>
                            {variant.costs?.cost
                                ? `ab ${variant.costs.cost.toLocaleString(
                                      "de-DE"
                                  )} €`
                                : "n/a"}
                        </div>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/${brand}/${rangeSlug}/${variant.name}`}
                        className={style.detailsButton}
                    >
                        <span>Ausstattung</span>{" "}
                        <MdOutlineArrowForwardIos
                            className={style.arrowIconRight}
                        />
                    </Link>
                </td>
            </tr>
        )
    })

    return (
        <>
            <thead>
                <tr className={style.tableRowBrand}>
                    <th>Variante</th>
                    <th className={style.bodyType}>Fahrzeugtyp</th>
                    <th>
                        Kosten-
                        <span className={style.block}>
                            Bewertung{" "}
                            <FaInfoCircle
                                className={style.infoIcon}
                                onClick={toggleScoreInfoActive}
                            />
                            <InfoTextField
                                text="Für die Kostenbewertung werden Fahrzeuge in derselben Klasse (z.B. Mittelklasse) und mit identischer Karosserieform (z.B. SUV) verglichen. Die Top 20% erhalten die beste Bewertung, alle anderen entsprechend weniger (ebenfalls in 20% Schritten)."
                                active={scoreInfoActive}
                                toggleActive={toggleScoreInfoActive}
                            />
                        </span>
                    </th>
                    <th>
                        Monatliche{" "}
                        <span className={style.block}>
                            Kosten{" "}
                            <FaInfoCircle
                                className={style.infoIcon}
                                onClick={toggleCostInfoActive}
                            />
                            <InfoTextField
                                text="Die monatlichen Kosten enthalten alle relevanten Kosten inkl. Wertverlust, Sprit, Versicherung, Steuer sowie Wartungs- & Reparaturkosten."
                                active={costInfoActive}
                                toggleActive={toggleCostInfoActive}
                            />
                        </span>
                    </th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>{variants}</tbody>
        </>
    )
}

export default VariantDisplay
