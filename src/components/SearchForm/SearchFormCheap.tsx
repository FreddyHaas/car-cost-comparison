import React, { FormEvent } from "react"
import { useRouter } from "next/router"
import useSearch from "@/src/hooks/useSearch"
import style from "@/src/styles/Search.module.css"
import MultiOptionSearchField from "./SearchFields/MultiOptionSearchField"
import BodyTypeField from "./SearchFields/BodyTypeField"

interface Props {
    smallView: boolean
}

function SearchFormCheap({ smallView }: Props) {
    // Initialize router
    const router = useRouter()

    const { searchByModel } = useSearch()
    const { vehicleClass, setVehicleClass } = useSearch()
    const { motorType, setMotorType } = useSearch()

    if (searchByModel) {
        return null
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push({
            pathname: "/guenstigeAutos",
        })
    }

    return (
        <form
            className={`${
                smallView ? style.searchFormCheapSmall : style.searchFormCheap
            }`}
            onSubmit={handleSubmit}
        >
            <BodyTypeField />
            <MultiOptionSearchField
                optionList={[
                    "Alle",
                    "Microwagen (z.B. Smart)",
                    "Kleinstwagen  (z.B. Twingo)",
                    "Kleinwagen (z.B. Polo)",
                    "Untere Mittelklasse (z.B. Golf)",
                    "Mittelklasse (z.B. 3er-Reihe)",
                    "Obere Mittelklasse (z.B. E-Klasse)",
                    "Oberklasse (z.B. S-Klasse)",
                ]}
                valueList={[
                    "AlleVehicleClass",
                    "Microwagen (z.B. Smart)",
                    "Kleinstwagen  (z.B. Twingo)",
                    "Kleinwagen (z.B. Polo)",
                    "Untere Mittelklasse (z.B. Golf)",
                    "Mittelklasse (z.B. 3er-Reihe)",
                    "Obere Mittelklasse (z.B. E-Klasse)",
                    "Oberklasse (z.B. S-Klasse)",
                ]}
                label="Fahrzeugklasse"
                selector={setVehicleClass}
                selectedOption={vehicleClass}
                smallView={smallView}
            />
            <MultiOptionSearchField
                optionList={[
                    "Alle",
                    "Diesel",
                    "Diesel (Mild-Hybrid)",
                    "Benzin",
                    "Benzin (Mild-Hybrid)",
                    "Elektro",
                    "PlugIn-Hybrid",
                    "Voll-Hybrid",
                    "Wasserstoff (E-Motor)",
                    "Gas",
                ]}
                valueList={[
                    "AlleMotorType",
                    "Diesel",
                    "Diesel (Mild-Hybrid)",
                    "Otto",
                    "Otto (Mild-Hybrid)",
                    "Elektro",
                    "PlugIn-Hybrid",
                    "Voll-Hybrid",
                    "Wasserstoff (E-Motor)",
                    "Gas",
                ]}
                label="Motor"
                selector={setMotorType}
                selectedOption={motorType}
                smallView={smallView}
            />
            <button type="submit">Suche</button>
        </form>
    )
}

export default SearchFormCheap
