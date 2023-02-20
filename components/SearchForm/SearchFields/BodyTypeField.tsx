/* eslint-disable global-require */
/* eslint-disable @next/next/no-img-element */
import React from "react"
import useSearch from "@/hooks/useSearch"
import style from "@/styles/Search.module.css"

function BodyTypeField() {
    const { bodyType, setBodyType } = useSearch()

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const { value } = target

        setBodyType(value)
    }

    const label = [
        "Cabrio",
        "Coupé",
        "Kombi",
        "Limousine",
        "Schrägheck",
        "SUV",
        "Van",
    ]
    const value = [
        "Cabrio",
        "Coupe",
        "Kombi",
        "Stufenheck",
        "Schrägheck",
        "SUV",
        "Van",
    ]

    const options: JSX.Element[] = []

    const noOfBodyTypes = label.length

    for (let i = 0; i < noOfBodyTypes; i += 1) {
        options.push(
            <label
                key={`${label[i]}`}
                className={style.label}
                htmlFor={`${value[i]}`}
            >
                <input
                    onChange={handleSubmit}
                    className={style.styledInput}
                    type="radio"
                    value={`${value[i]}`}
                    checked={bodyType === value[i]}
                    id={`${value[i]}`}
                />
                <div className={style.checkboxContainer}>
                    <img
                        src={`/${label[i]}.jpg`}
                        className={style.bodyTypeImg}
                        alt={`${label[i]}`}
                    />
                    {label[i]}
                </div>
            </label>
        )
    }

    return (
        <div className={style.formFieldCheapSearch}>
            <h3 className={style.header}>Fahrzeugtyp</h3>
            <fieldset className={style.optionsBodyType}>
                <label
                    key="AlleBodyType"
                    className={style.label}
                    htmlFor="AlleBodyType"
                >
                    <input
                        onChange={handleSubmit}
                        className={style.styledInput}
                        type="radio"
                        value="AlleBodyType"
                        checked={bodyType === "AlleBodyType"}
                        id="AlleBodyType"
                    />
                    <div className={style.checkboxContainer}>Alle</div>
                </label>
                {options}
            </fieldset>
        </div>
    )
}

export default BodyTypeField
