import React, { useEffect, useState } from "react"
import style from "@/styles/Results.module.css"
import SearchFormContainer from "@/components/SearchForm/SearchFormContainer"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import useSearch from "@/hooks/useSearch"
import Link from "next/link"
import { firestore } from "@/FirebaseConnection/firebase"
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
} from "firebase/firestore"

function CheapCars() {
    const { bodyType, vehicleClass, motorType } = useSearch()
    const { searchByModel, setSearchByModel } = useSearch()
    const [carDataTable, setCarDataTable] = useState<JSX.Element[] | undefined>(
        undefined
    )

    useEffect(() => {
        if (searchByModel === true) {
            setSearchByModel(false)
        }
    }, [])

    useEffect(() => {
        let carList: Array<{ [key: string]: any }> = []

        // load car data
        const loadCarData = async () => {
            let q = query(
                collection(firestore, "models"),
                orderBy(`minCosts.60.15000.cost`)
            )

            if (motorType !== "AlleMotorType") {
                q = query(
                    q,
                    where("modelInformation.motorType", "==", motorType)
                )
            }

            if (bodyType !== "AlleBodyType") {
                q = query(q, where("modelInformation.bodyType", "==", bodyType))
            }

            if (vehicleClass !== "AlleVehicleClass") {
                q = query(
                    q,
                    where("modelInformation.vehicleClass", "==", vehicleClass)
                )
            }

            q = query(q, limit(15))

            const querySnapShot = await getDocs(q)

            const listOfCars: Array<{ [key: string]: any }> = []

            querySnapShot.forEach((doc) => {
                listOfCars.push(doc.data())
            })

            return listOfCars
        }

        // display car data
        const displayCarData = async () => {
            carList = await loadCarData()

            const carDataTemp: JSX.Element[] = []

            carList?.forEach((car) => {
                const rangeSlug = car.modelInformation.range.replaceAll(
                    "/",
                    "_"
                ) // Avoids errors in URL due to slashes

                carDataTemp.push(
                    <tr
                        key={
                            car.modelInformation.brand +
                            car.modelInformation.modelName
                        }
                    >
                        <td className={style.modelName}>
                            <Link
                                href={`/${car.modelInformation.brand}/${rangeSlug}/${car.modelInformation.variant}/${car.modelInformation.modelNameShort}`}
                            >
                                {car.modelInformation.brand}{" "}
                                {car.modelInformation.modelName.replace(
                                    "&amp;",
                                    "&"
                                )}
                            </Link>
                        </td>
                        <td className={style.bodyTypeCheap}>
                            <Link
                                href={`/${car.modelInformation.brand}/${rangeSlug}/${car.modelInformation.variant}/${car.modelInformation.modelNameShort}`}
                            >
                                {car.modelInformation.bodyType}
                            </Link>
                        </td>
                        <td className={style.motorTypeCheap}>
                            <Link
                                href={`/${car.modelInformation.brand}/${rangeSlug}/${car.modelInformation.variant}/${car.modelInformation.modelNameShort}`}
                            >
                                {car.modelInformation.motorType}
                            </Link>
                        </td>
                        <td className={style.priceContainer}>
                            <Link
                                href={`/${car.modelInformation.brand}/${rangeSlug}/${car.modelInformation.variant}/${car.modelInformation.modelNameShort}`}
                            >
                                <div className={style.prices}>
                                    ab{" "}
                                    <span className={style.block}>
                                        {car.minCosts["60"][
                                            "15000"
                                        ].cost.toLocaleString("de-DE")}{" "}
                                        €
                                    </span>
                                </div>
                            </Link>
                        </td>
                        <td className={style.detailsButtonContainer}>
                            <Link
                                href={`/${car.modelInformation.brand}/${rangeSlug}/${car.modelInformation.variant}/${car.modelInformation.modelNameShort}`}
                                className={style.detailsButton}
                            >
                                <span>Details </span>
                                <MdOutlineArrowForwardIos
                                    className={style.arrowIconRight}
                                />{" "}
                            </Link>
                        </td>
                    </tr>
                )
            })
            setCarDataTable(carDataTemp)
        }

        displayCarData()
    }, [bodyType, vehicleClass, motorType])

    // Show error message if search did not have any valid results
    if (carDataTable !== undefined && carDataTable.length === 0) {
        return (
            <section className={style.pageContainer}>
                <SearchFormContainer smallView />
                <div className={style.resultsDisplay}>
                    <h1 className={style.header}>Die günstigsten Autos</h1>
                    <h2 className={style.subHeader}>Suchergebnisse</h2>
                    <p className={style.resultsErrorMessage}>
                        Ihre Suche ergab leider keine Treffer
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className={style.pageContainerCheap}>
            <SearchFormContainer smallView />
            <div className={style.resultsDisplayCheap}>
                <h1 className={style.header}>Die günstigsten Autos</h1>
                <h2 className={style.subHeader}>Suchergebnisse</h2>
                <table className={style.tableCheapCars}>
                    <thead>
                        <tr className={style.tableRow}>
                            <th>Fahrzeug</th>
                            <th className={style.bodyTypeCheap}>
                                Fahrzeugform
                            </th>
                            <th className={style.motorTypeCheap}>Motor</th>
                            <th>Monatliche Kosten*</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>{carDataTable}</tbody>
                </table>
                <p className={style.tableInfo}>
                    *Kostenvergleich bei 5 Jahren Haltedauer und 15.000 km
                    Fahrleistung pro Jahr
                </p>
            </div>
        </section>
    )
}
export default CheapCars
