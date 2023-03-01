import React, { useState } from "react"
import useSearch from "@/src/hooks/useSearch"
import infoStyle from "@/src/styles/InfoTextField.module.css"
import { FaInfoCircle } from "react-icons/fa"
import InfoTextField from "@/src/components/Overarching/InfoTextField"
import style from "@/src/styles/Search.module.css"

interface Props {
    setKilometers: React.Dispatch<React.SetStateAction<number>>
}

function KilometersField({ setKilometers }: Props) {
    const { kilometers } = useSearch()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setKilometers(parseInt(event.target.value, 10))
    }

    // Open and close info field
    const [infoActive, setInfoActive] = useState(false)
    const toggleInfoActive = () => {
        setInfoActive(!infoActive)
    }

    const handleInfoClick = (
        event:
            | React.MouseEvent<SVGElement, MouseEvent>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        toggleInfoActive()
    }

    return (
        <div className={style.formFieldDriving}>
            <label className={style.label} htmlFor="kilometeresSelector">
                Kilometer pro{" "}
                <span className={style.block}>
                    Jahr{" "}
                    <FaInfoCircle
                        className={infoStyle.infoIcon}
                        onClick={handleInfoClick}
                    />
                    <InfoTextField
                        text="Wie viele Kilometer fahren Sie im Jahr?"
                        active={infoActive}
                        toggleActive={handleInfoClick}
                    />
                </span>
            </label>
            <select
                id="kilometeresSelector"
                name="kilometersSelector"
                defaultValue={kilometers}
                onChange={handleChange}
            >
                <option key={5000} value={5000}>
                    5.000 km
                </option>
                <option key={10000} value={10000}>
                    10.000 km
                </option>
                <option key={15000} value={15000}>
                    15.000 km
                </option>
                <option key={20000} value={20000}>
                    20.000 km
                </option>
                <option key={25000} value={25000}>
                    25.000 km
                </option>
                <option key={30000} value={30000}>
                    30.000 km
                </option>
                <option key={35000} value={35000}>
                    35.000 km
                </option>
                <option key={40000} value={40000}>
                    40.000 km
                </option>
                <option key={45000} value={45000}>
                    45.000 km
                </option>
                <option key={50000} value={50000}>
                    50.000 km
                </option>
                <option key={55000} value={55000}>
                    55.000 km
                </option>
                <option key={60000} value={60000}>
                    60.000 km
                </option>
            </select>
        </div>
    )
}

export default KilometersField
