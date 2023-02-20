import React from "react"
import style from "@/styles/Search.module.css"

interface Props {
    optionsList: string[] | undefined
    optionSetter: React.Dispatch<React.SetStateAction<string | undefined>>
    fieldName: string
    disabled: boolean
    dynamic: boolean
    defaultValue: string | undefined
}

function SearchField({
    optionsList,
    optionSetter,
    fieldName,
    disabled,
    dynamic,
    defaultValue,
}: Props) {
    if (
        dynamic === true &&
        (optionsList === undefined || optionsList.length === 1)
    ) {
        optionSetter(optionsList !== undefined ? optionsList[0] : undefined)
        return null
    }

    const options: JSX.Element[] = []

    optionsList?.forEach((option) => {
        options.push(
            <option key={option} value={option}>
                {option}
            </option>
        )
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "Beliebig") {
            optionSetter(undefined)
        } else {
            optionSetter(event.target.value)
        }
    }

    return (
        <div className={style.formField}>
            <label htmlFor={`${fieldName}Selector`}>{fieldName}</label>
            <select
                id={`${fieldName}Selector`}
                name={`${fieldName}Selector`}
                onChange={handleChange}
                defaultValue={defaultValue || "Beliebig"}
                disabled={disabled}
            >
                <option value="Beliebig">Beliebig</option>
                {options}
            </select>
        </div>
    )
}

export default SearchField
