import React, { useState } from "react"
import useSearch from "@/src/hooks/useSearch"
import style from "@/src/styles/Results.module.css"
import InfoTextField from "@/src/components/Overarching/InfoTextField"
import { FaInfoCircle } from "react-icons/fa"
import infoStyle from "@/src/styles/InfoTextField.module.css"

interface Props {
    typeList: Array<{ [key: string]: any }>
    powerDifferences: boolean
}

function TypeList({ typeList, powerDifferences }: Props) {
    const { kilometers } = useSearch()
    const { months } = useSearch()

    // Fuel info box
    const [costFuelActive, setFuelActive] = useState(false)

    const toggleFuelInfoActive = () => {
        setFuelActive(!costFuelActive)
    }
    // Insurance info box
    const [costInsuranceActive, setInsuranceActive] = useState(false)

    const toggleInsuranceInfoActive = () => {
        setInsuranceActive(!costInsuranceActive)
    }
    // Tax info box
    const [costTaxActive, setTaxActive] = useState(false)

    const toggleTaxInfoActive = () => {
        setTaxActive(!costTaxActive)
    }
    // Repair info box
    const [costRepairActive, setRepairActive] = useState(false)

    const toggleRepairInfoActive = () => {
        setRepairActive(!costRepairActive)
    }
    // Depreciation info box
    const [costDepreciationActive, setDepreciationActive] = useState(false)

    const toggleDepreciationInfoActive = () => {
        setDepreciationActive(!costDepreciationActive)
    }

    const names: JSX.Element[] = []
    const prices: JSX.Element[] = []
    const consumptionFirst: JSX.Element[] = []
    const consumptionSecond: JSX.Element[] = []
    const powerInHP: JSX.Element[] = []
    const drivetrain: JSX.Element[] = []
    const gearbox: JSX.Element[] = []

    const deterioration: JSX.Element[] = []
    const fuel: JSX.Element[] = []
    const insurance: JSX.Element[] = []
    const tax: JSX.Element[] = []
    const repairAndMaintenance: JSX.Element[] = []
    const total: JSX.Element[] = []
    const totalExDeterioration: JSX.Element[] = []

    let powerDisplay: JSX.Element | null
    let consumptionSecondDisplay: JSX.Element | null

    // Sort types by price
    typeList.sort((a: any, b: any) => {
        const priceA = a.price
            ? parseInt(a.price.slice(0, -2).replace(".", ""), 10)
            : undefined
        const priceB = b.price
            ? parseInt(b.price.slice(0, -2).replace(".", ""), 10)
            : undefined

        if (priceA === undefined) {
            if (priceB === undefined) {
                return 1
            }
            return -1
        }
        if (priceB === undefined) {
            return 1
        }
        return priceA - priceB
    })

    // Diplay types in table
    typeList.forEach((type, index) => {
        names.push(<th>{type.name}</th>)
        prices.push(<td>{type.price}</td>)
        if (type.consumption.consumptionWLTP === "") {
            consumptionFirst.push(
                <td>{type.consumption.consumptionNEFZ.slice(0, -8)}</td>
            )
        } else {
            consumptionFirst.push(
                <td>{type.consumption.consumptionWLTP.slice(0, -8)}</td>
            )
        }
        if (type.consumption.consumptionWLTPsecond !== "") {
            consumptionSecond.push(
                <td>{type.consumption.consumptionWLTPsecond}</td>
            )
        } else if (type.consumption.consumptionNEFZsecond !== "") {
            consumptionSecond.push(
                <td>{type.consumption.consumptionNEFZsecond}</td>
            )
        }
        powerInHP.push(<td>{type.powerInHP}</td>)
        drivetrain.push(<td>{type.drivetrain}</td>)
        gearbox.push(<td>{type.gearbox}</td>)
        type.costs.forEach((costItem: any) => {
            if (
                costItem.months === months &&
                costItem.kilometers === kilometers
            ) {
                deterioration.push(
                    <td>{costItem.deterioration.toLocaleString("de-DE")} €</td>
                )
                fuel.push(<td>{costItem.fuel.toLocaleString("de-DE")} €</td>)
                insurance.push(
                    <td>{costItem.insurance.toLocaleString("de-DE")} €</td>
                )
                tax.push(<td>{costItem.tax.toLocaleString("de-DE")} €</td>)
                repairAndMaintenance.push(
                    <td>
                        {costItem.repairAndMaintenance.toLocaleString("de-DE")}{" "}
                        €
                    </td>
                )
                total.push(<td>{costItem.total.toLocaleString("de-DE")} €</td>)
                totalExDeterioration.push(
                    <td>
                        {(
                            costItem.total - costItem.deterioration
                        ).toLocaleString("de-DE")}{" "}
                        €
                    </td>
                )
            }
        })
        // Check if there was no cost item found for this type (i.e. there was nothing added for deterioration cost)
        if (deterioration.length < index + 1) {
            deterioration.push(<td>n/a</td>)
            fuel.push(<td>n/a</td>)
            tax.push(<td>n/a</td>)
            insurance.push(<td>n/a</td>)
            repairAndMaintenance.push(<td>n/a</td>)
            total.push(<td>n/a</td>)
            totalExDeterioration.push(<td>n/a</td>)
        }
    })

    if (powerDifferences) {
        powerDisplay = (
            <tr key="Leistung">
                <th>Leistung (PS)</th>
                {powerInHP}
            </tr>
        )
    } else {
        powerDisplay = null
    }

    if (consumptionSecond.length !== 0) {
        consumptionSecondDisplay = (
            <tr key="VerbrauchZwei">
                <th>Verbrauch (zweiter Antrieb)</th>
                {consumptionSecond}
            </tr>
        )
    } else {
        consumptionSecondDisplay = null
    }

    return (
        <table className={style.typesTable}>
            <thead>
                <tr key="Ausstattungslinie">
                    <th>Ausstattungslinie</th>
                    {names}
                </tr>
            </thead>
            <tbody>
                <tr key="Daten">
                    <th colSpan={100} className={style.sectionRow}>
                        Daten
                    </th>
                </tr>
                <tr key="Grundpreis">
                    <th>Grundpreis</th>
                    {prices}
                </tr>
                <tr key="Verbrauch">
                    <th>Verbrauch (l/100 km)</th>
                    {consumptionFirst}
                </tr>
                {consumptionSecondDisplay}
                <tr key="Getriebe">
                    <th>Getriebe</th>
                    {gearbox}
                </tr>
                <tr key="Antrieb">
                    <th>Antrieb</th>
                    {drivetrain}
                </tr>
                {powerDisplay}
                <tr key="Kosten">
                    <th className={style.sectionRow} colSpan={100}>
                        Kosten pro Monat
                    </th>
                </tr>
                <tr key="Spritkosten">
                    <th>
                        Spritkosten{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleFuelInfoActive}
                        />
                        <InfoTextField
                            text="Die Spritkosten ergeben sich aus dem Verbrauch nach NEFZ/ WLTP und den durchschnittlichen Spritpreisen der letzten 3 Monate."
                            active={costFuelActive}
                            toggleActive={toggleFuelInfoActive}
                            width={320}
                        />
                    </th>

                    {fuel}
                </tr>
                <tr key="Versicherung">
                    <th>
                        Versicherung{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleInsuranceInfoActive}
                        />
                        <InfoTextField
                            text="Die Berechnung beinhaltet Haftpflicht und Vollkaskoversicherung (500 € Selbstbeteilung) bei einem Beitragssatz von 50%."
                            active={costInsuranceActive}
                            toggleActive={toggleInsuranceInfoActive}
                            width={320}
                        />
                    </th>
                    {insurance}
                </tr>
                <tr key="Steuer">
                    <th>
                        Steuer{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleTaxInfoActive}
                        />
                        <InfoTextField
                            text="KFZ-Steuer bei Erstzulassung nach 2021."
                            active={costTaxActive}
                            toggleActive={toggleTaxInfoActive}
                        />
                    </th>
                    {tax}
                </tr>
                <tr key="Wartung">
                    <th>
                        Wartung &{" "}
                        <span className={style.block}>
                            Reparaturen{" "}
                            <FaInfoCircle
                                className={infoStyle.infoIcon}
                                onClick={toggleRepairInfoActive}
                            />
                            <InfoTextField
                                text="Wartungskosten unter Berücksichtigung der Hersteller-spezifischen Vorgaben (inkl. Kosten für Reifenwechsel). Reparaturkosten auf Basis von Erfahrungswerten."
                                active={costRepairActive}
                                toggleActive={toggleRepairInfoActive}
                                width={320}
                            />
                        </span>
                    </th>
                    {repairAndMaintenance}
                </tr>
                <tr
                    key="GesamtkostenOhneWertverlust"
                    className={style.highlightRow}
                >
                    <th className={style.highlightRow}>
                        Gesamtkosten{" "}
                        <span style={{ textDecoration: "underline" }}>
                            ohne
                        </span>{" "}
                        Wertverlust
                    </th>
                    {totalExDeterioration}
                </tr>
                <tr key="Wertverlust">
                    <th>
                        Wertverlust{" "}
                        <FaInfoCircle
                            className={infoStyle.infoIcon}
                            onClick={toggleDepreciationInfoActive}
                        />
                        <InfoTextField
                            text="Wertverlust auf Basis von Gebrauchtwagen-Restwerten (Quelle: DAT) sowie Berücksichtigung von wertmindernden Modellwechsel. Zzgl. zum Basispreis wird ein Aufschlag für Ausstattung angenommen."
                            active={costDepreciationActive}
                            toggleActive={toggleDepreciationInfoActive}
                            width={320}
                        />
                    </th>
                    {deterioration}
                </tr>
                <tr
                    key="GesamtkostenMitWertverlust"
                    className={style.highlightRow}
                >
                    <th className={style.highlightRow}>
                        Gesamtkosten{" "}
                        <span style={{ textDecoration: "underline" }}>mit</span>{" "}
                        Wertverlust
                    </th>
                    {total}
                </tr>
            </tbody>
        </table>
    )
}

export default TypeList
