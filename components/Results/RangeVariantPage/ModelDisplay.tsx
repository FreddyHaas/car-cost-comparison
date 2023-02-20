import React, { useState } from "react"
import useSearch from "@/hooks/useSearch"
import style from "@/styles/Results.module.css"
import { FaInfoCircle } from "react-icons/fa"
import InfoTextField from "@/components/Overarching/InfoTextField"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import infoStyle from "@/styles/InfoTextField.module.css"
import Link from "next/link"
import CostScore from "../CostScore"

interface Props {
    variant: { [key: string]: any }
    displayNone: boolean
}

function ModelDisplay({ variant, displayNone }: Props) {
    const { kilometers } = useSearch()
    const { months } = useSearch()

    // Control info fields
    const [scoreInfoActive, setScoreInfoActive] = useState(false)

    const toggleScoreInfoActive = () => {
        setScoreInfoActive(!scoreInfoActive)
    }

    const [costInfoActive, setCostInfoActive] = useState(false)

    const toggleCostInfoActive = () => {
        setCostInfoActive(!costInfoActive)
    }

    if (!displayNone) {
        return null
    }

    // Sort models by price
    variant.models.sort((a: any, b: any) => {
        if (a.minCosts[months][kilometers] === undefined) {
            if (b.minCosts[months][kilometers] === undefined) {
                return 1
            }
            return -1
        }
        if (b.minCosts[months][kilometers] === undefined) {
            return 1
        }
        return (
            parseInt(a.minCosts[months][kilometers].cost, 10) -
            parseInt(b.minCosts[months][kilometers].cost, 10)
        )
    })

    // Display models in table
    const models: JSX.Element[] = []

    variant.models.forEach((carModel: any) => {
        let motor = carModel.motorType

        if (motor === "Otto") {
            motor = "Benziner"
        } else if (motor === "Otto (Mild-Hybrid)") {
            motor = "Benziner (Mild-Hybrid)"
        }

        models.push(
            <tr key={carModel.modelNameShort} className={style.tableRow}>
                <td>
                    <Link
                        href={`/${variant.name.brand}/${variant.name.range}/${variant.name.variant}/${carModel.modelNameShort}`}
                    >
                        {carModel.modelNameShort.slice(0, 1) === "("
                            ? carModel.modelNameShort.slice(1, -1)
                            : carModel.modelNameShort}
                    </Link>
                </td>
                <td className={style.fuel}>
                    <Link
                        href={`/${variant.name.brand}/${variant.name.range}/${variant.name.variant}/${carModel.modelNameShort}`}
                    >
                        {motor}
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/${variant.name.brand}/${variant.name.range}/${variant.name.variant}/${carModel.modelNameShort}`}
                    >
                        {carModel.minCosts[months][kilometers] === undefined ||
                        carModel.minCosts[months][kilometers].costScore ===
                            null ? (
                            "n/a"
                        ) : (
                            <CostScore
                                costScore={
                                    carModel.minCosts[months][kilometers]
                                        .costScore
                                }
                            />
                        )}
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/${variant.name.brand}/${variant.name.range}/${variant.name.variant}/${carModel.modelNameShort}`}
                    >
                        <div className={style.prices}>
                            {carModel.minCosts[months][kilometers]?.cost
                                ? `ab ${carModel.minCosts[months][
                                      kilometers
                                  ].cost.toLocaleString("de-DE")} €`
                                : "nicht verfügbar"}
                        </div>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/${variant.name.brand}/${variant.name.range}/${variant.name.variant}/${carModel.modelNameShort}`}
                        className={style.detailsButton}
                    >
                        <span>Details</span>{" "}
                        <MdOutlineArrowForwardIos
                            className={style.arrowIconRight}
                        />{" "}
                    </Link>
                </td>
            </tr>
        )
    })

    return (
        <>
            <thead>
                <tr className={style.tableRow}>
                    <th>Motor</th>
                    <th className={style.fuel}>Kraftstoff</th>
                    <th>
                        Kosten-Bewertung{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleScoreInfoActive}
                        />
                        <InfoTextField
                            text="Für die Kostenbewertung werden Fahrzeuge in derselben Klasse (z.B. Mittelklasse) und mit identischer Karosserieform (z.B. SUV) verglichen. Die Top 20% erhalten die beste Bewertung, alle anderen entsprechend weniger (ebenfalls in 20% Schritten)."
                            active={scoreInfoActive}
                            toggleActive={toggleScoreInfoActive}
                        />
                    </th>
                    <th>
                        Monatliche Kosten{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleCostInfoActive}
                        />
                        <InfoTextField
                            text="Die monatlichen Kosten enthalten alle relevanten Kosten inkl. Wertverlust, Sprit, Versicherung, Steuer sowie Wartungs- & Werkstattkosten."
                            active={costInfoActive}
                            toggleActive={toggleCostInfoActive}
                        />
                    </th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>{models}</tbody>
        </>
    )
}

export default ModelDisplay
