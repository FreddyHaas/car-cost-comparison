import React, { useState } from "react"
import style from "@/styles/Search.module.css"
import useSearch from "@/hooks/useSearch"
import { FaInfoCircle } from "react-icons/fa"
import InfoTextField from "@/components/Overarching/InfoTextField"
import infoStyle from "@/styles/InfoTextField.module.css"

interface Props {
    setMonths: React.Dispatch<React.SetStateAction<number>>
}

function YearsField({ setMonths }: Props) {
    const { months } = useSearch()

    // Open and close info field
    const [infoActive, setInfoActive] = useState(false)
    const toggleInfoActive = () => {
        setInfoActive(!infoActive)
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonths(parseInt(event.target.value, 10))
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
            <label className={style.label} htmlFor="yearsSelector">
                <span className={style.block}>
                    Haltedauer{" "}
                    <FaInfoCircle
                        className={infoStyle.infoIcon}
                        onClick={handleInfoClick}
                    />
                    <InfoTextField
                        text="Wie lange möchten Sie das Auto fahren?"
                        active={infoActive}
                        toggleActive={handleInfoClick}
                    />
                </span>
            </label>
            <select
                id="yearsSelector"
                name="yearsSelector"
                defaultValue={months}
                onChange={handleChange}
            >
                <option key={24} value={24}>
                    2 Jahre
                </option>
                <option key={36} value={36}>
                    3 Jahre
                </option>
                <option key={48} value={48}>
                    4 Jahre
                </option>
                <option key={60} value={60}>
                    5 Jahre
                </option>
            </select>
        </div>
    )
}

export default YearsField
